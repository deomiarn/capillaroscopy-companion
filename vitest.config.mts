import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    // increase if screenshots/large DOM
    testTimeout: 20000,
    passWithNoTests: true,
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      exclude: ["**/node_modules/**", "**/.next/**", "**/coverage/**", "**/vitest.setup.*"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "~": path.resolve(__dirname),
    },
  },
});
