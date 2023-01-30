import pako from 'pako'

export const compressArrayBuffer = (arrayBuffer: ArrayBuffer) => {
  const compressed = pako.deflate(new Uint8Array(arrayBuffer), { level: 9 })
  console.log('Compressed: ' + arrayBuffer.byteLength + ' -> ' + compressed.length)
  return compressed.buffer
}

export const decompressArrayBuffer = (arrayBuffer: ArrayBuffer) => {
    const decompressed = pako.inflate(new Uint8Array(arrayBuffer))
    console.log('Decompressed: ' + arrayBuffer.byteLength + ' -> ' + decompressed.length)
    return decompressed.buffer
}

