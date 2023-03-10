import * as esbuild from "esbuild";
import fs from "fs";

import { loadBuildOptions } from "./buildOptions.js";
import { getManifest } from "./manifest.js";

const buildOptions = loadBuildOptions();

const argc = process.argv.length;
const buildTarget = (argc > 1 && process.argv[1]) || "firefox";
const watch = argc > 2 && process.argv[2] == "--watch";

const manifest = getManifest(buildTarget);

fs.writeFileSync("public/manifest.json", JSON.stringify(manifest));

for (const options of buildOptions) {
  if (watch) {
    const ctx = await esbuild.context(options);
    await ctx.watch();
  } else {
    await esbuild.build(options);
  }
}
