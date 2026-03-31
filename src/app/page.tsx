import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaGoogleScholar } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";


export default function Home() {
  return (
    <div className="h-screen pt-[35vh] pl-[35vw]">
      <div className="text-left max-w-md">
        <h1 className="font-[var(--font-space-mono)] font-bold text-lg">Sriram Sattiraju</h1>
        <div className="flex space-x-5 my-4">
          <a href="https://github.com/srirsatt" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-700 transition-colors">
            <FaGithub size={18} />
          </a>
          <a href="https://www.linkedin.com/in/sriram-sattiraju-4a4514150/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-700 transition-colors">
            <FaLinkedin size={18} />
          </a>
          <a href="https://scholar.google.com/citations?user=AZf9PRMAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-700 transition-colors">
            <FaGoogleScholar size={18} />
          </a>
          <a href="mailto:sriramsattiraju07@gmail.com" className="text-gray-400 hover:text-gray-700 transition-colors">
            <MdEmail size={18} />
          </a>
        </div>
        <p className="font-[var(--font-space-mono)] text-sm tracking-tight leading-relaxed" style={{ wordSpacing: '-3px' }}>currently building with LLMs, ML, GPUs, and end-to-end systems.</p>
      </div>
    </div>
  );
}
