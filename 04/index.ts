import { readFile } from "node:fs/promises";
import { markRolls, removeAllRolls, removeRolls } from "./lib/paper";
import path from "node:path";

async function readFloorMap(): Promise<string[][]> {
  const data = await readFile(path.join(__dirname, "input.txt"));
  return data
    .toString()
    .split("\n")
    .map((r) => r.split(""));
}

async function main() {
  const input1 = await readFloorMap();
  const res1 = removeRolls(markRolls(input1));
  console.log("Removable rolls (one-shot):", res1);

  const input2 = await readFloorMap();
  const res2 = removeAllRolls(input2);
  console.log("Removable rolls (iterated):", res2);
}

main();
