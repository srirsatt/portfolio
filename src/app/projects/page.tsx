import Link from "next/link";
import {
  SiCplusplus,
  SiExpo,
  SiFastapi,
  SiJavascript,
  SiJupyter,
  SiModelcontextprotocol,
  SiNextdotjs,
  SiNodedotjs,
  SiNumpy,
  SiNvidia,
  SiOpenai,
  SiPython,
  SiPytorch,
  SiReact,
  SiScikitlearn,
  SiSupabase,
  SiTailwindcss,
  SiTensorflow,
  SiTypescript,
} from "react-icons/si";

const builds = [
  {
    name: "Source",
    href: "https://github.com/srirsatt/Source",
    image: "https://raw.githubusercontent.com/srirsatt/Source/main/media/sourcedemo.gif",
    imageAlt: "Source VS Code extension indexing a documentation website",
    description: "A VS Code extension that crawls and indexes documentation, then exposes grounded search to coding agents through MCP.",
    stack: [
      { icon: SiTypescript, label: "TypeScript", color: "#3178c6" },
      { icon: SiJavascript, label: "JavaScript", color: "#d6b600" },
      { icon: SiNodedotjs, label: "Node.js", color: "#339933" },
      { icon: SiModelcontextprotocol, label: "Model Context Protocol", color: "#111111" },
    ],
  },
  {
    name: "BevoFit",
    href: "https://github.com/srirsatt/BevoFit",
    image: "/images/bevofit-hero.png",
    imageAlt: "BevoFit wordmark and app icon",
    description: "A mobile app for UT Austin students to check live gym hours, explore facilities, and browse intramural sports.",
    stack: [
      { icon: SiReact, label: "React Native", color: "#00a8c6" },
      { icon: SiExpo, label: "Expo", color: "#000020" },
      { icon: SiTypescript, label: "TypeScript", color: "#3178c6" },
      { icon: SiSupabase, label: "Supabase", color: "#3ecf8e" },
      { icon: SiTailwindcss, label: "NativeWind", color: "#06b6d4" },
      { icon: SiPython, label: "Python", color: "#3776ab" },
    ],
  },
  {
    name: "SimpleTensor",
    href: "https://github.com/srirsatt/SimpleTensor",
    image: "/images/simpletensor-autograd.png",
    imageAlt: "SimpleTensor autograd graph: forward pass builds a GradNode at each op, backward() walks it in reverse",
    description: "A tensor library built from scratch in CUDA C++, with a PyTorch-style autograd engine and both naive and tiled shared-memory matmul kernels.",
    stack: [
      { icon: SiCplusplus, label: "C++", color: "#00599c" },
      { icon: SiNvidia, label: "CUDA", color: "#76b900" },
    ],
  },
  {
    name: "Cognitive Energy Modeling",
    href: "https://arxiv.org/abs/2604.01653",
    image: "https://arxiv.org/html/2604.01653v2/system_integration.png",
    imageAlt: "Closed-loop neuroadaptive system using EEG-derived cognitive energy",
    description: "A WGAN-GP and Schrödinger Bridge framework for measuring whether synthetic EEG preserves cognitive-state transition dynamics.",
    stack: [
      { icon: SiPython, label: "Python", color: "#3776ab" },
      { icon: SiPytorch, label: "PyTorch", color: "#ee4c2c" },
      { icon: SiNumpy, label: "NumPy", color: "#4d77cf" },
      { icon: SiScikitlearn, label: "scikit-learn", color: "#f7931e" },
    ],
  },
  {
    name: "ANN vs. KAN for EEG-Alzheimer's Inference",
    href: "https://ieeexplore.ieee.org/document/10937564",
    image: "/images/ann-kan-fig1.jpg",
    imageAlt: "KAN loss surfaces across four learning rates, node counts, and training epochs",
    description: "A comparative study of artificial neural networks and Kolmogorov-Arnold networks for classifying Alzheimer's disease from EEG data.",
    stack: [
      { icon: SiPython, label: "Python", color: "#3776ab" },
      { icon: SiTensorflow, label: "TensorFlow", color: "#ff6f00" },
      { icon: SiJupyter, label: "Jupyter", color: "#f37626" },
      { icon: SiNumpy, label: "NumPy", color: "#4d77cf" },
    ],
  },
  {
    name: "StudySync",
    href: "https://github.com/srirsatt/StudySync",
    image: "/images/studysync-architecture.png",
    imageAlt: "StudySync MCP architecture connecting Canvas, Google Calendar, and Google Drive",
    description: "An MCP server that connects Canvas, Google Calendar, and Google Drive so coding agents can fetch assignments, sync deadlines, and write study guides straight to Drive.",
    stack: [
      { icon: SiNextdotjs, label: "Next.js", color: "#000000" },
      { icon: SiTypescript, label: "TypeScript", color: "#3178c6" },
      { icon: SiPython, label: "Python", color: "#3776ab" },
      { icon: SiFastapi, label: "FastAPI", color: "#009688" },
      { icon: SiOpenai, label: "OpenAI", color: "#10a37f" },
      { icon: SiModelcontextprotocol, label: "Model Context Protocol", color: "#111111" },
    ],
  },
  {
    name: "AutoMatch",
    href: "https://github.com/srirsatt/AutoMatch",
    image: "/images/automatch-matches.jpg",
    imageAlt: "AutoMatch user portal showing matched vehicles with financing terms",
    description: "A two-sided car financing marketplace: buyers upload documents to get matched with vehicles and financing plans, and dealers review profiles and send offers.",
    stack: [
      { icon: SiNextdotjs, label: "Next.js", color: "#000000" },
      { icon: SiReact, label: "React", color: "#61dafb" },
      { icon: SiTypescript, label: "TypeScript", color: "#3178c6" },
      { icon: SiTailwindcss, label: "Tailwind CSS", color: "#06b6d4" },
      { icon: SiSupabase, label: "Supabase", color: "#3ecf8e" },
    ],
  },
];

export default function Builds() {
  return (
    <main className="builds-page">
      <div className="builds-shell">
        <Link href="/" className="builds-back">← back</Link>
        <h1 className="builds-title">BUILDS</h1>

        <div className="builds-list">
          {builds.map((build) => (
            <article className="build-row" key={build.name}>
              <div className="build-name">
                <a href={build.href} target="_blank" rel="noreferrer">{build.name}</a>
              </div>

              <a className="build-media" href={build.href} target="_blank" rel="noreferrer" aria-label={`View ${build.name}`}>
                {/* The project-owned repository assets are intentionally kept animated where available. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={build.image} alt={build.imageAlt} />
              </a>

              <div className="build-details">
                <p>{build.description}</p>
                <div className="build-stack" aria-label={`${build.name} technology stack`}>
                  {build.stack.map((technology) => (
                    <span key={technology.label} title={technology.label} aria-label={technology.label} style={{ color: technology.color }}>
                      <technology.icon aria-hidden="true" />
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
