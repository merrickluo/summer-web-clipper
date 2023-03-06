import * as esbuild from "esbuild";

import { loadBuildOptions } from "./buildOptions.js";

const buildOptions = loadBuildOptions(true);

for (const options of buildOptions) {
  const ctx = await esbuild.context(options);
  await ctx.watch();
}
