import Link from "next/link";

export default function Projects() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 sm:p-12">
      <div className="relative w-full max-w-md text-left">
        <Link
          href="/"
          className="absolute -top-12 left-0 font-[var(--font-space-mono)] text-sm text-gray-400 hover:text-black transition-colors"
        >
          ← back
        </Link>
        <h1 className="font-[var(--font-space-mono)] font-bold text-lg mb-4">projects</h1>
        <div className="space-y-4 font-[var(--font-space-mono)] text-sm">
          {/* 
            To add a new project, copy one of the <div> blocks below 
            and paste it inside this container. Update the href and description.
          */}
          <div className="flex items-start">
            <a
              href="https://github.com/srirsatt/Source"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[45%] shrink-0 pr-4 text-gray-800 hover:text-gray-400 transition-colors underline"
            >
              Source
            </a>
            <span className="text-gray-500 flex-1">
              a vs code extension to bridge the gap between agents and documentation.
            </span>
          </div>

          <div className="flex items-start">
            <a
              href="https://github.com/srirsatt/BevoFit"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[45%] shrink-0 pr-4 text-gray-800 hover:text-gray-400 transition-colors underline"
            >
              BevoFit
            </a>
            <span className="text-gray-500 flex-1">
              a mobile app for students to explore everything RecSports at UT Austin.
            </span>
          </div>
        </div>

        <h2 className="font-[var(--font-space-mono)] text-sm text-gray-400 mt-4 mb-4">research</h2>
        <div className="space-y-4 font-[var(--font-space-mono)] text-sm">
          {/* 
            To add a new publication, copy the <div> block below 
            and paste it inside this container. Update the href and description.
          */}
          <div className="flex items-start">
            <a
              href="https://arxiv.org/abs/2604.01653"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[45%] shrink-0 pr-4 text-gray-800 hover:text-gray-400 transition-colors underline"
            >
              Cognitive Modeling with EEG & WGAN-GP
            </a>
            <span className="text-gray-500 flex-1">
              validation for the use of WGAN-GP and EEG for use in cognitive modeling for neuroadaptive HCI systems.
            </span>
          </div>
          <div className="flex items-start">
            <a
              href="https://ieeexplore.ieee.org/document/10937564"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[45%] shrink-0 pr-4 text-gray-800 hover:text-gray-400 transition-colors underline"
            >
              ANN vs. KAN for EEG-Alzheimer's Inference
            </a>
            <span className="text-gray-500 flex-1">
              a comprehensive comparison of ANNs and KANs for classification of Alzheimer's from EEG data.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
