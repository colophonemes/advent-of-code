import { ReadStream } from "fs";
import { reduceStream } from "../../common/fs";

/**  Range with inclusive lower and upper bounds */
export type Range = [number, number];

export function isFresh(ranges: Range[], productId: number): boolean {
  for (const [lower, upper] of ranges) {
    if (productId >= lower && productId <= upper) {
      return true;
    }
  }
  return false;
}

export function countFresh(ranges: Range[], productIds: number[]): number {
  let count = 0;
  for (const productId of productIds) {
    if (isFresh(ranges, productId)) count++;
  }
  return count;
}

type Db = { ranges: Range[]; productIds: number[] };

export async function parseDb(
  stream: ReadStream,
  rangesOnly: boolean = false
): Promise<Db> {
  let parsingRange = true;
  return reduceStream(
    stream,
    "\n",
    (acc, curr) => {
      if (curr.trim() === "") {
        parsingRange = false;
      } else if (parsingRange) {
        const [lower, upper] = curr.split("-").map((n) => parseInt(n, 10));
        acc.ranges.push([lower, upper]);
      } else if (!rangesOnly) {
        acc.productIds.push(parseInt(curr));
      }
      return acc;
    },
    { ranges: [], productIds: [] } as Db
  );
}

export function sortRanges([a_l, a_u]: Range, [b_l, b_u]: Range): number {
  const lowers = a_l - b_l;
  return lowers === 0 ? a_u - b_u : lowers;
}

/** Check if two `Range`s overlap */
export function overlaps([a_l, a_u]: Range, [b_l, b_u]: Range): boolean {
  // either a contains b_l or b contains a_l
  return (a_l <= b_l && a_u >= b_l) || (b_l <= a_l && b_u >= a_l);
}

/**
 * Compute the union of two ranges. Doesn't check for overlap/adjacency, so
 * non-adjacent/overlapping ranges will contain intermediate values.
 */
export function union([a_l, a_u]: Range, [b_l, b_u]: Range): Range {
  return [Math.min(a_l, b_l), Math.max(a_u, b_u)];
}

export function mergeRanges(ranges: Range[]): Range[] {
  const sorted = [...ranges].sort(sortRanges);
  const merged: Range[] = [];
  while (sorted.length > 0) {
    const a = merged.pop();
    const b = sorted.shift()!;
    // initial condition
    if (a === undefined) {
      merged.push(b);
      continue;
    } else if (overlaps(a, b)) {
      merged.push(union(a, b));
    } else {
      merged.push(a, b);
    }
  }
  return merged;
}

export function countInRange(ranges: Range[]): number {
  let count = 0;
  for (const [l, u] of mergeRanges(ranges)) {
    count += u - l + 1;
  }
  return count;
}

export function numsInRange(ranges: Range[]): number[] {
  let nums = [];
  for (const [l, u] of mergeRanges(ranges)) {
    let s = l;
    while (s <= u) {
      nums.push(s);
      s++;
    }
  }
  return nums;
}
