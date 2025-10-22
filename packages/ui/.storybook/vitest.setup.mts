import * as a11yAddonAnnotations from "@storybook/addon-a11y/preview";
import { setProjectAnnotations } from "@storybook/react-vite";
import { configure } from "storybook/test";

import * as projectAnnotations from "./preview";

// ローカルで waitFor が 1s のタイムアウトで落ちるようになったため デフォルトタイムアウト値を 3s に変更
configure({ asyncUtilTimeout: 3000 });

// This is an important step to apply the right configuration when testing your stories.
// More info at: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
const annotations = setProjectAnnotations([a11yAddonAnnotations, projectAnnotations]);

beforeAll(() => {
  annotations.beforeAll();
});
