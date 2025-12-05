import path from "node:path";
import { readFile } from "node:fs/promises";
import { sleep } from "../common/sleep";
import { password, password2 } from "./lib/password";

async function main() {
  const input = path.join(__dirname, "input.txt");
  const rotations = await readFile(input).then((d) => d.toString().split("\n"));
  const start = 50;
  console.log(`Password (original):            ${password(start, rotations)}`);
  console.log(`Password (method 0x434C49434B): ${password2(start, rotations)}`);
}

main();
