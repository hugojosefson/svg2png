# svg2png

[![JSR Version](https://jsr.io/badges/@hugojosefson/svg2png)](https://jsr.io/@hugojosefson/svg2png)
[![JSR Score](https://jsr.io/badges/@hugojosefson/svg2png/score)](https://jsr.io/@hugojosefson/svg2png)
[![CI](https://github.com/hugojosefson/svg2png/actions/workflows/release.yaml/badge.svg)](https://github.com/hugojosefson/svg2png/actions/workflows/release.yaml)

## Requirements

Requires [Deno](https://deno.com/) v2.5.2 or later.

## CLI

Converts SVG from stdin to PNG on stdout.

```bash
deno run jsr:@hugojosefson/svg2png < input.svg > output.svg
```

Supports confuguration as JSON via the `--config-json` flag. See
`ResvgRenderOptions` at
https://github.com/thx/resvg-js/blob/main/wasm/index.d.ts for details. Example:

```bash
deno run jsr:@hugojosefson/svg2png \
  --config-json='{"fitTo":{"mode":"width","value":1200}}' \
  < input.svg > output_w1200.svg
```

## API

Please see docs on
[jsr.io/@hugojosefson/svg2png](https://jsr.io/@hugojosefson/svg2png).

### Installation

```sh
"@@include(./install.sh)";
```

### Example usage via API

```typescript
"@@include(./example-usage.ts)";
```

You may run the above example with:

```sh
deno run --reload --allow-write=smiley.png jsr:@hugojosefson/svg2png/example-usage
```

For further usage examples, see the tests:

- [test/resvg.ts](test/resvg.test.ts)
