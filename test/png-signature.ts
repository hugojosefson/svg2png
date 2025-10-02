/** PNG files start with this 8-byte signature */
export const pngSignature: Uint8Array<ArrayBuffer> = new Uint8Array([
  0x89,
  0x50,
  0x4E,
  0x47,
  0x0D,
  0x0A,
  0x1A,
  0x0A,
]);
