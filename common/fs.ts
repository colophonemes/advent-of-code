import path from "node:path";
import { tmpdir } from "node:os";
import { mkdtemp, writeFile } from "node:fs/promises";
import { createReadStream, ReadStream } from "node:fs";

export async function readableString(
  str: string,
  opts?: Parameters<typeof createReadStream>[1]
): Promise<ReadStream> {
  const tempdir = await mkdtemp(path.join(tmpdir(), "readable-"));
  const tempfile = path.join(tempdir, "data");
  await writeFile(tempfile, str);
  return createReadStream(tempfile, opts);
}

export async function reduceStream<T>(
  stream: ReadStream,
  delimiter: string,
  cb: (acc: T, curr: string, idx: number) => T,
  init: T
): Promise<T> {
  let acc = init;
  let tokens: string[] = [];
  let idx = 0;
  for await (const chunk of stream.iterator()) {
    let chars = (chunk as Buffer).toString().split("");
    while (chars.length > 0) {
      const char = chars.shift()!;
      if (char === delimiter) {
        acc = cb(acc, tokens.join(""), idx);
        idx++;
        tokens = [];
        if (chars.length === 0) {
          tokens.push("");
        }
      } else {
        tokens.push(char);
      }
    }
  }
  if (tokens.length) {
    acc = cb(acc, tokens.join(""), idx);
  }
  return acc;
}
