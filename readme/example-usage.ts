#!/usr/bin/env -S deno run --allow-write=smiley.png
import { type ResvgRenderOptions, svg2png } from "../src/svg2png.ts";

// An example SVG of a smiley face
const svgSmile = `
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
  <circle cx="50" cy="50" r="40" fill="yellow" stroke="black" stroke-width="3" />
  <circle cx="35" cy="40" r="5" fill="black" />
  <circle cx="65" cy="40" r="5" fill="black" />
  <path d="M35 60 Q50 75 65 60" fill="none" stroke="black" stroke-width="3" />
</svg>
`.trim();

// What we want to do with the SVG
const opts = {
  fitTo: {
    mode: "width",
    value: 1200,
  },
} satisfies ResvgRenderOptions;

// Render the PNG
const pngBytes: Uint8Array = await svg2png(svgSmile, opts);

// Write the PNG to a file
await Deno.writeFile("smiley.png", pngBytes);
console.log("smiley.png created!");
