import * as esbuild from "esbuild";

import { loadBuildOptions } from "./buildOptions.js";

const buildOptions = loadBuildOptions();

for (const options of buildOptions) {
  await esbuild.build(options);
}
