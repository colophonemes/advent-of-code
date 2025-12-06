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
  cb: (acc: T, curr: string) => T,
  init: T
): Promise<T> {
  let remainder = "";
  let acc = init;
  const queue: string[] = [];
  for await (const chunk of stream.iterator()) {
    const items = chunk.toString().split(delimiter);
    if (items.length === 0) continue;
    // there was a remainder last time, last split was not at a delimiter
    // boundary
    if (remainder !== "") {
      remainder = remainder + items.shift();
    }
    // there are more IDs in the chunk, this means the current remainder is a
    // complete id
    if (items.length > 0) {
      queue.push(remainder);
      // store the final item as the new remainder
      remainder = items.pop();
    }
    // at this point any the remaining IDs should be valid, so add them to the
    // queue
    queue.push(...items);

    while (queue.length > 0) {
      const next = queue.shift() ?? "";
      if (next === "") continue;
      acc = cb(acc, next);
    }
  }
  if (remainder) {
    acc = cb(acc, remainder);
  }
  return acc;
}
