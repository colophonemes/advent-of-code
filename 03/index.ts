import { createReadStream } from "node:fs";
import path from "node:path";
import { sumJoltagesStream } from "./lib.ts/joltage";

async function main() {
  const stream = createReadStream(path.join(__dirname, "input.txt"));
  const res = await sumJoltagesStream(stream, 2);
  console.log(`Total joltage (len=2):  ${res}`);
  const stream2 = createReadStream(path.join(__dirname, "input.txt"));
  const res2 = await sumJoltagesStream(stream2, 12);
  console.log(`Total joltage (len=12): ${res2}`);
}

main();
