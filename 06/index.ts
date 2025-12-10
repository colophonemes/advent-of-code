import { createReadStream } from "node:fs";
import path from "node:path";
import { readProblems1, readProblems2, sumAllProblems } from "./lib/maths";

async function main() {
  const stream1 = createReadStream(path.join(__dirname, "input.txt"));
  const problems1 = await readProblems1(stream1);
  const res1 = sumAllProblems(problems1);
  console.log("Grand total of all problems (digit groups): ", res1);

  const stream2 = createReadStream(path.join(__dirname, "input.txt"));
  const problems2 = await readProblems2(stream2);
  const res2 = sumAllProblems(problems2);
  console.log("Grand total of all problems (single digits):", res2);
}

main();
