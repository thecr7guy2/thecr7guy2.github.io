import type { NextConfig } from "next";

const isGitHubActions = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: isGitHubActions ? "export" : undefined,
  images: {
    unoptimized: isGitHubActions,
  },
  trailingSlash: isGitHubActions,
};

export default nextConfig;
