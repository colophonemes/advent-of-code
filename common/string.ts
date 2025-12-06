export function chunkStr(str: string, size: number) {
  if (size % 1 !== 0) {
    throw new Error(`Expected integer size, got ${size}`);
  }
  const chunks: string[] = [];
  const arr = str.split("");
  while (arr.length > 0) {
    const chunk = arr.splice(0, size).join("");
    chunks.push(chunk);
  }
  return chunks;
}
