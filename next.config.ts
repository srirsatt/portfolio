import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: 'export',
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
