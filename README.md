# resvg-deno

[![JSR Version](https://jsr.io/badges/@hugojosefson/resvg-deno)](https://jsr.io/@hugojosefson/resvg-deno)
[![JSR Score](https://jsr.io/badges/@hugojosefson/resvg-deno/score)](https://jsr.io/@hugojosefson/resvg-deno)
[![CI](https://github.com/hugojosefson/resvg-deno/actions/workflows/release.yaml/badge.svg)](https://github.com/hugojosefson/resvg-deno/actions/workflows/release.yaml)

## Requirements

Requires [Deno](https://deno.com/) v2.5.2 or later.

## API

Please see docs on
[jsr.io/@hugojosefson/resvg-deno](https://jsr.io/@hugojosefson/resvg-deno).

## Installation

```sh
# add as dependency to your project
deno add jsr:@hugojosefson/resvg-deno
```

## Example usage

```typescript
import type { ResvgRenderOptions } from "@hugojosefson/resvg-deno/src/re-exported-types.ts";
import { svg2png } from "@hugojosefson/resvg-deno/src/svg2png.ts";
/** A simple SVG of a smiley face. */
const svgSmile = `
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
  <circle cx="50" cy="50" r="40" fill="yellow" stroke="black" stroke-width="3" />
  <circle cx="35" cy="40" r="5" fill="black" />
  <circle cx="65" cy="40" r="5" fill="black" />
  <path d="M35 60 Q50 75 65 60" fill="none" stroke="black" stroke-width="3" />
</svg>
`.trim();

/** What we want to do with the SVG. */
const opts = {
  fitTo: {
    mode: "width",
    value: 1200,
  },
} satisfies ResvgRenderOptions;

/** Render the PNG */
const pngBytes = await svg2png(svgSmile, opts);
await Deno.writeFile("smiley.png", pngBytes);

console.log("smiley.png created!");
```

You may run the above example with:

```sh
deno run --reload --allow-write=smiley.png jsr:@hugojosefson/resvg-deno/example-usage
```

For further usage examples, see the tests:

- [test/resvg.ts](test/resvg.test.ts)
