import fs from "fs";
import { BuildOptions } from "esbuild";
import stylePlugin from "esbuild-style-plugin";

import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

const pages = ["index", "content", "background", "options"];
const files = ["index.tsx", "index.ts"];

export function loadBuildOptions(debug = false): BuildOptions[] {
  return pages.map((page) => {
    let entryPoints = [];
    for (const file of files) {
      const entryPoint = `src/pages/${page}/${file}`;

      if (fs.existsSync(entryPoint)) {
        entryPoints.push(entryPoint);
      }
    }

    return {
      entryPoints: entryPoints,
      bundle: true,
      minify: !debug,
      sourcemap: debug,
      outfile: `public/dist/${page}.js`,
      plugins: [
        stylePlugin({
          postcss: {
            plugins: [
              require("postcss-import"),
              require("tailwindcss"),
              require("autoprefixer"),
              require("@thedutchcoder/postcss-rem-to-px"),
            ],
          },
        }),
      ],
    };
  });
}
