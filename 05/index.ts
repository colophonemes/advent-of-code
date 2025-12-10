import { createReadStream } from "node:fs";
import path from "node:path";
import { countFresh, countInRange, parseDb } from "./lib/ingredients";

async function main() {
  const stream = createReadStream(path.join(__dirname, "input.txt"));
  const { ranges, productIds } = await parseDb(stream);
  const res = countFresh(ranges, productIds);
  console.log("Number of fresh products:     ", res);

  const stream2 = createReadStream(path.join(__dirname, "input.txt"));
  const { ranges: ranges2 } = await parseDb(stream2, true);
  const res2 = countInRange(ranges2);
  console.log("Total fresh products in range:", res2);
}

main();
