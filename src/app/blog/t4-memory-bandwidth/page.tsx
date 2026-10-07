import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Day 1: How fast can a T4 actually move memory? | Sriram Sattiraju",
  description: "Measuring real memory bandwidth on a Tesla T4 with CUDA copy kernels: scalar, float4, grid-stride, and cudaMemcpy benchmarks.",
};

export default function T4MemoryBandwidth() {
  return (
    <main className="builds-page blog-post">
      <article className="mx-auto w-full max-w-2xl">
        <Link href="/blog" className="builds-back">← back</Link>
        <header className="mb-8">
          <h1 className="text-lg font-bold leading-relaxed">Day 1: How fast can a T4 actually move memory?</h1>
          <time dateTime="2026-10-06" className="mt-2 block text-sm text-[var(--subtle)]">
            Oct 6, 2026
          </time>
        </header>

        <div className="space-y-6 text-sm leading-relaxed text-[var(--muted)] [&_code]:break-words [&_code]:text-[var(--foreground)] [&_h2]:font-bold [&_h2]:text-[var(--foreground)] [&_strong]:text-[var(--foreground)]">
          <p>
            I&apos;m spending the next 8 weeks learning LLM inference from the GPU up: CUDA kernels, fusion, attention, and eventually a small inference engine running on my own kernels. I don&apos;t own an NVIDIA GPU, so everything runs on a Tesla T4 rented by the second on Modal.
          </p>
          <p>
            Day 1 had one job: <strong>figure out what this GPU can actually do</strong>, so every kernel I write afterward has something to be measured against.
          </p>

          <h2>Why start with memory bandwidth?</h2>
          <p>
            Generating tokens one at a time (decode) is memory-bound. Every step reads all the model weights and the KV cache from memory, and the math is tiny by comparison. Roughly, tokens per second ≈ memory bandwidth ÷ bytes read per token. So before optimizing anything, I need the real bandwidth number, not the one on the box.
          </p>

          <h2>Step 1: Ask the GPU about itself</h2>
          <p>I wrote a small <code>devquery</code> program using <code>cudaGetDeviceProperties</code>:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>40 SMs, compute capability 7.5 (Turing)</li>
            <li>1024 threads per SM, 64K registers per SM (so 64 registers per thread at full occupancy)</li>
            <li>64 KB shared memory per SM, 4 MB L2</li>
            <li>256-bit memory bus at 5,001 MHz</li>
          </ul>
          <p>
            Theoretical bandwidth = memory clock × 2 (double data rate) × bus width in bytes = <strong>320 GB/s</strong>, matching NVIDIA&apos;s spec sheet.
          </p>

          <h2>Step 2: The simplest memory-bound kernel there is</h2>
          <p>
            A copy kernel does zero math; it only moves bytes. That makes it the cleanest way to measure real bandwidth. I copied 1 GB four different ways, timing the median of 100 runs and verifying every output:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs sm:text-sm">
              <caption className="sr-only">T4 memory copy bandwidth benchmarks</caption>
              <thead className="text-[var(--foreground)]">
                <tr className="border-b border-[var(--subtle)]">
                  <th scope="col" className="py-3 pr-4 text-left font-medium">Version</th>
                  <th scope="col" className="py-3 pr-4 text-right font-medium">GB/s</th>
                  <th scope="col" className="py-3 text-right font-medium">% of theoretical</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--subtle)]/25">
                  <th scope="row" className="py-3 pr-4 text-left font-normal"><code>cudaMemcpy</code> (device to device)</th>
                  <td className="py-3 pr-4 text-right tabular-nums">231</td>
                  <td className="py-3 text-right tabular-nums">72%</td>
                </tr>
                <tr className="border-b border-[var(--subtle)]/25">
                  <th scope="row" className="py-3 pr-4 text-left font-normal">Scalar: one float per thread</th>
                  <td className="py-3 pr-4 text-right tabular-nums"><strong>245</strong></td>
                  <td className="py-3 text-right tabular-nums"><strong>77%</strong></td>
                </tr>
                <tr className="border-b border-[var(--subtle)]/25">
                  <th scope="row" className="py-3 pr-4 text-left font-normal"><code>float4</code>: 16 bytes per thread</th>
                  <td className="py-3 pr-4 text-right tabular-nums">234</td>
                  <td className="py-3 text-right tabular-nums">73%</td>
                </tr>
                <tr className="border-b border-[var(--subtle)]/25">
                  <th scope="row" className="py-3 pr-4 text-left font-normal">Grid-stride <code>float4</code> (best of sweep)</th>
                  <td className="py-3 pr-4 text-right tabular-nums">236</td>
                  <td className="py-3 text-right tabular-nums">74%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>What surprised me</h2>
          <p>
            <strong>1. Paper bandwidth isn&apos;t real bandwidth.</strong> The best I could get was 77% of the spec. GDDR6 never hits its theoretical number, and the T4&apos;s 70 W power cap holds it back further. So my real ceiling for this GPU is about 245 GB/s, not 320.
          </p>
          <p>
            <strong>2. My naive kernel beat NVIDIA&apos;s <code>cudaMemcpy</code>.</strong> One thread per element, about a million blocks, 6% faster than the library call. <code>cudaMemcpy</code> has to handle any size and alignment; a dumb kernel with lots of parallelism doesn&apos;t.
          </p>
          <p>
            <strong>3. Vectorizing made it slower.</strong> The standard advice is &quot;use <code>float4</code> loads&quot;: fewer instructions for the same bytes. Here it was consistently about 5% slower than scalar. I swapped the run order to rule out clock throttling, and the gap held. I don&apos;t know why yet. That&apos;s tomorrow&apos;s job in Nsight Compute.
          </p>
          <p>
            <strong>4. You need fewer threads than I thought.</strong> I swept the grid-stride version from 1 to 32 blocks per SM, expecting low block counts to starve memory. Instead, 1 block per SM (about 10K threads) already hit 236 GB/s. The math (Little&apos;s law): to sustain about 240 GB/s with about 600 ns of memory latency, you need about 150 KB of loads in flight. 10,240 threads × 16 bytes ≈ 164 KB. Already enough. On an H100, with about 10× the bandwidth, that won&apos;t be true, and I want to rerun this sweep there later.
          </p>

          <h2>The bug of the day</h2>
          <p>
            My first grid-stride kernel hung forever. I&apos;d written the stride as <code>blockIdx.x * blockDim.x</code> instead of <code>gridDim.x * blockDim.x</code>. For block 0, that&apos;s a stride of zero, so <code>i += 0</code> and those threads never finish. A one-word bug, an infinite loop.
          </p>

          <h2>Next</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Measure peak FP32 compute with an FMA microbenchmark (and see how badly one accumulator does vs eight)</li>
            <li>Profile scalar vs <code>float4</code> to explain the slowdown</li>
            <li>Build the full roofline sheet for the T4</li>
          </ul>
          <p className="text-[var(--foreground)]">
            Code: <a href="https://github.com/srirsatt/CUDAinference" className="underline underline-offset-4 hover:opacity-60">CUDAinference</a>
          </p>
        </div>
      </article>
    </main>
  );
}
