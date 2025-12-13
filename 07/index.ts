import { readFile } from "node:fs/promises";
import path from "node:path";
import {
  buildGraph,
  countPaths,
  countSplits,
  Manifold,
  showManifold,
  traverse,
} from "./lib/tachyon";
import { sleep } from "../common/sleep";
import chalk from "chalk";

async function readManifold(): Promise<Manifold> {
  return readFile(path.join(__dirname, "input.txt")).then((d) =>
    d
      .toString()
      .split("\n")
      .filter((r) => r.trim() !== "")
      .map((r) => r.split(""))
  );
}

async function animate(
  manifold: Manifold,
  hSize = 12,
  lps = 60
): Promise<void> {
  const buffer = showManifold(manifold)
    .split("\n")
    .map((r) =>
      r
        .split("")
        .map((c) => {
          switch (c) {
            case ".":
              return chalk.gray(c);
            case "|":
              return Math.random() > 0.5 ? chalk.red(c) : chalk.redBright(c);
            case "^":
              return chalk.blue(c);
            default:
              return c;
          }
        })
        .join("")
    );

  while (buffer.length > 0) {
    const height = Math.min(hSize, buffer.length);
    for (let i = 0; i < height; i++) {
      process.stdout.write(buffer[i]);
      process.stdout.write("\n");
    }

    await sleep(1000 / lps);
    for (let i = 0; i < height; i++) {
      process.stdout.moveCursor(0, -1);
      process.stdout.clearLine(1);
    }
    process.stdout.cursorTo(0);
    buffer.shift();
  }
}

async function main() {
  const manifold = await readManifold();
  const graph = buildGraph(manifold);
  console.log(`Built graph!`);
  const splits = traverse(manifold);
  await animate(manifold);
  console.log(`# of beam splits:`, splits);
  const splits2 = countSplits(graph);
  console.log(`# of beam splits:`, splits2);
  const paths = countPaths(graph);
  console.log(`# of paths:      `, paths);
}

main();
