import { ReadStream } from "node:fs";
import { distinctFactors } from "./numbers";
import { reduceStream } from "../../common/fs";
import { chunkStr } from "../../common/string";

export type Range = {
  from: number;
  to: number;
};

export function parseRange(input: string): Range {
  const [from, to] = input.split("-").map((n) => parseInt(n, 10));
  return { from, to };
}

export function* members({ from, to }: Range): Generator<number> {
  let n = from;
  while (n <= to) {
    yield n;
    n += 1;
  }
}

export function invalidIds(range: Range): number[] {
  const invalid: number[] = [];
  for (const n of members(range)) {
    const digits = n.toString();
    if (digits.length % 2 !== 0) {
      continue;
    }
    const midpoint = digits.length / 2;
    const a = digits.slice(0, midpoint);
    const b = digits.slice(midpoint);
    if (a === b) {
      invalid.push(n);
    }
  }

  return invalid;
}

export async function sumInvalidIds(stream: ReadStream): Promise<number> {
  return reduceStream(
    stream,
    ",",
    (acc, range) => {
      const invalid = invalidIds(parseRange(range));
      if (invalid.length) {
        return invalid.reduce((a, c) => a + c, acc);
      }
      return acc;
    },
    0
  );
}

export function invalidIds2(range: Range): Set<number> {
  const invalid = new Set<number>();
  const cache = new Map<number, Set<number>>();
  for (const n of members(range)) {
    const digits = n.toString();
    let factors = cache.get(digits.length);
    if (factors === undefined) {
      factors = distinctFactors(digits.length);
      cache.set(digits.length, factors);
    }
    for (const factor of factors) {
      const [head, ...rest] = chunkStr(digits, factor);
      if (rest.every((r) => r === head)) {
        invalid.add(n);
        continue;
      }
    }
  }
  return invalid;
}

export async function sumInvalidIds2(stream: ReadStream): Promise<number> {
  return reduceStream(
    stream,
    ",",
    (acc, range) => {
      const invalid = invalidIds2(parseRange(range));
      if (invalid.size) {
        return [...invalid.values()].reduce((a, c) => a + c, acc);
      }
      return acc;
    },
    0
  );
}
