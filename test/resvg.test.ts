import { assertEquals } from "@std/assert";
import { svg2png } from "../src/svg2png.ts";
import { pngSignature } from "./png-signature.ts";
import smileySvg from "./smiley.svg" with { type: "text" };
import { decodePNG } from "@img/png/decode";

Deno.test("svg2png", async (t) => {
  await t.step("should not throw", async function () {
    await Promise.resolve(svg2png(smileySvg));
  });

  await t.step("should return bytes", async () => {
    assertEquals((await svg2png(smileySvg)).constructor.name, "Uint8Array");
  });

  await t.step("should return PNG signature bytes", async () => {
    const pngBytes = await svg2png(smileySvg);
    assertEquals(pngBytes.slice(0, 8), pngSignature);
  });

  await t.step("should return valid PNG", async (t) => {
    await t.step("should decode without error", async () => {
      const pngBytes = await svg2png(smileySvg);
      await decodePNG(pngBytes);
    });

    await t.step("should have width and height", async () => {
      const pngBytes = await svg2png(smileySvg);
      const png = await decodePNG(pngBytes);
      assertEquals(png.header.width, 100);
      assertEquals(png.header.height, 100);
    });
  });
});
