import * as esbuild from "esbuild";
import fs from "fs";

import { loadBuildOptions } from "./buildOptions.js";
import { getManifest } from "./manifest.js";

const browserTargets = ["chrome", "firefox"];

const argc = process.argv.length;
// node[0] script[1] | target[2] --watch[3]
const buildTarget = (argc > 2 && process.argv[2]) || "firefox";
const watch = argc > 3 && process.argv[3] == "--watch";

if (!browserTargets.includes(buildTarget)) {
  console.error("must set build target to chrome or firefox");
  process.exit(1);
}

const manifest = getManifest(buildTarget as any);

fs.writeFileSync("public/manifest.json", JSON.stringify(manifest));

const buildOptions = loadBuildOptions(watch);

for (const options of buildOptions) {
  if (watch) {
    const ctx = await esbuild.context(options);
    await ctx.watch();
  } else {
    await esbuild.build(options);
  }
}
