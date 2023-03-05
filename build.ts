import * as esbuild from "esbuild";
import fs from "fs";

const pages = ["popup", "content", "background"];
const files = ["index.tsx", "index.ts"];

async function buildPage(page: string) {
  let entryPoints = [];
  for (const file of files) {
    const entryPoint = `src/pages/${page}/${file}`;

    if (fs.existsSync(entryPoint)) {
      entryPoints.push(entryPoint);
    }
  }

  esbuild.build({
    entryPoints: entryPoints,
    bundle: true,
    outdir: `public/${page}`,
  });
}

pages.forEach(async (page) => {
  await buildPage(page);
});
