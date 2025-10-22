/// <reference types="vitest/config" />
import path from "node:path";
import { fileURLToPath } from "node:url";

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const dirname = typeof __dirname === "undefined" ? path.dirname(fileURLToPath(import.meta.url)) : __dirname;

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: [
      //
      "@storybook/addon-a11y/preview",
      "@storybook/react-vite",
      "@mdx-js/react",
      "markdown-to-jsx",
    ],
  },
  plugins: [react()],
  test: {
    globals: true,
    pool: "threads",
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
            // This should match your package.json script to run Storybook
            // The --ci flag will skip prompts and not open a browser
            storybookScript: "pnpm dev:storybook",
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: "playwright",
            instances: [
              {
                browser: "chromium",
              },
            ],
          },
          setupFiles: [".storybook/vitest.setup.mts"],
        },
      },
    ],
  },
});
