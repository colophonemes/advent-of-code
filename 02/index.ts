import { createReadStream } from "node:fs";
import path from "node:path";
import { sumInvalidIds, sumInvalidIds2 } from "./lib/ids";

async function main() {
  const stream = createReadStream(path.join(__dirname, "input.txt"));
  const res1 = await sumInvalidIds(stream);
  console.log(`Sum of invalid IDs (chunk size = half):`, res1);
  const stream2 = createReadStream(path.join(__dirname, "input.txt"));
  const res2 = await sumInvalidIds2(stream2);
  console.log(`Sum of invalid IDs (any chunk size):  `, res2);
}

main();
