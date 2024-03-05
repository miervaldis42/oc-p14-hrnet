// Imports
import { defineConfig, configDefaults } from "vitest/config";
import react from "@vitejs/plugin-react";

// Vite Config
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "tests/setup.ts", // file which will be triggered before each test file
    exclude: [...configDefaults.exclude, "**/e2e/**"],
  },
});
