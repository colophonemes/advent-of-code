import { describe, test, expect } from "vitest";
import {
  countFresh,
  countInRange,
  isFresh,
  mergeRanges,
  numsInRange,
  overlaps,
  parseDb,
  Range,
} from "./ingredients";
import { readableString } from "../../common/fs";

const ranges: Range[] = [
  [3, 5],
  [10, 14],
  [16, 20],
  [12, 18],
];

const productIds = [1, 5, 8, 11, 17, 32];

describe("ingredients", () => {
  test("isFresh", () => {
    expect(isFresh(ranges, 1)).toBe(false);
    expect(isFresh(ranges, 5)).toBe(true);
    expect(isFresh(ranges, 8)).toBe(false);
    expect(isFresh(ranges, 11)).toBe(true);
    expect(isFresh(ranges, 17)).toBe(true);
    expect(isFresh(ranges, 32)).toBe(false);
  });

  test("countFresh", () => {
    expect(countFresh(ranges, productIds)).toBe(3);
  });

  test("parseDb", async () => {
    const dbStr = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`;
    const stream = await readableString(dbStr);
    const res = await parseDb(stream);
    expect(res).toStrictEqual({ ranges, productIds });

    const stream2 = await readableString(dbStr);
    const res2 = await parseDb(stream2, true);
    expect(res2).toStrictEqual({ ranges, productIds: [] });
  });

  test("overlaps", () => {
    expect(overlaps([0, 10], [5, 15])).toBe(true);
    expect(overlaps([5, 15], [0, 10])).toBe(true);
    expect(overlaps([0, 0], [0, 0])).toBe(true);
    expect(overlaps([0, 1], [2, 3])).toBe(false);
    expect(overlaps([2, 3], [0, 1])).toBe(false);
  });

  test("mergeRanges", () => {
    const input: Range[] = [
      [5, 15],
      [0, 10],
      [-50, -40],
      [-20, -1],
      [-100, -50],
    ];
    const expected: Range[] = [
      [-100, -40],
      [-20, -1],
      [0, 15],
    ];
    expect(mergeRanges(input)).toStrictEqual(expected);
  });

  test("countInRange", () => {
    expect(countInRange(ranges)).toBe(14);
  });

  test("numsInRange", () => {
    expect(numsInRange(ranges)).toStrictEqual([
      3, 4, 5, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ]);
  });
});
