import type { KnipConfig } from "knip";

export default {
  entry: ["tests/**/*.test.ts"],
  project: ["src/**/*.ts", "scripts/**/*.ts", "tests/**/*.ts"],
  // `cloudflare:workers` is provided by the Workers runtime, not an npm package.
  ignoreDependencies: ["cloudflare"],
} satisfies KnipConfig;
