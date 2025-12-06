import { describe, test, expect } from "vitest";
import {
  invalidIds,
  members,
  parseRange,
  sumInvalidIds,
  sumInvalidIds2,
  invalidIds2,
} from "./ids";
import { readableString } from "../../common/fs";

const ids =
  "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124";

describe("ids", () => {
  test("parseRange", () => {
    expect(parseRange("11-22")).toStrictEqual({ from: 11, to: 22 });
    expect(parseRange("95-115")).toStrictEqual({ from: 95, to: 115 });
    expect(parseRange("998-1012")).toStrictEqual({ from: 998, to: 1012 });
    expect(parseRange("1188511880-1188511890")).toStrictEqual({
      from: 1188511880,
      to: 1188511890,
    });
    expect(parseRange("222220-222224")).toStrictEqual({
      from: 222220,
      to: 222224,
    });
    expect(parseRange("1698522-1698528")).toStrictEqual({
      from: 1698522,
      to: 1698528,
    });
    expect(parseRange("446443-446449")).toStrictEqual({
      from: 446443,
      to: 446449,
    });
    expect(parseRange("38593856-38593862")).toStrictEqual({
      from: 38593856,
      to: 38593862,
    });
    expect(parseRange("565653-565659")).toStrictEqual({
      from: 565653,
      to: 565659,
    });
    expect(parseRange("824824821-824824827")).toStrictEqual({
      from: 824824821,
      to: 824824827,
    });
    expect(parseRange("2121212118-2121212124")).toStrictEqual({
      from: 2121212118,
      to: 2121212124,
    });
  });

  test("members", () => {
    const res = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
    const ns: number[] = [];
    for (const n of members(parseRange("11-22"))) {
      ns.push(n);
    }
    expect(ns).toStrictEqual(res);
  });

  test("invalidIds", () => {
    expect(invalidIds(parseRange("11-22"))).toStrictEqual([11, 22]);
    expect(invalidIds(parseRange("95-115"))).toStrictEqual([99]);
    expect(invalidIds(parseRange("998-1012"))).toStrictEqual([1010]);
    expect(invalidIds(parseRange("1188511880-1188511890"))).toStrictEqual([
      1188511885,
    ]);
    expect(invalidIds(parseRange("222220-222224"))).toStrictEqual([222222]);
    expect(invalidIds(parseRange("1698522-1698528"))).toStrictEqual([]);
    expect(invalidIds(parseRange("446443-446449"))).toStrictEqual([446446]);
    expect(invalidIds(parseRange("38593856-38593862"))).toStrictEqual([
      38593859,
    ]);
    expect(invalidIds(parseRange("565653-565659"))).toStrictEqual([]);
    expect(invalidIds(parseRange("824824821-824824827"))).toStrictEqual([]);
    expect(invalidIds(parseRange("2121212118-2121212124"))).toStrictEqual([]);
  });

  test("sumInvalidIds", async () => {
    const stream = await readableString(ids);
    const res = await sumInvalidIds(stream);
    expect(res).toBe(1227775554);
  });

  test("invalidIds2", () => {
    expect(invalidIds2(parseRange("11-22"))).toStrictEqual(new Set([11, 22]));
    expect(invalidIds2(parseRange("95-115"))).toStrictEqual(new Set([99, 111]));
    expect(invalidIds2(parseRange("998-1012"))).toStrictEqual(
      new Set([999, 1010])
    );
    expect(invalidIds2(parseRange("1188511880-1188511890"))).toStrictEqual(
      new Set([1188511885])
    );
    expect(invalidIds2(parseRange("222220-222224"))).toStrictEqual(
      new Set([222222])
    );
    expect(invalidIds2(parseRange("1698522-1698528"))).toStrictEqual(new Set());
    expect(invalidIds2(parseRange("446443-446449"))).toStrictEqual(
      new Set([446446])
    );
    expect(invalidIds2(parseRange("38593856-38593862"))).toStrictEqual(
      new Set([38593859])
    );
    expect(invalidIds2(parseRange("565653-565659"))).toStrictEqual(
      new Set([565656])
    );
    expect(invalidIds2(parseRange("824824821-824824827"))).toStrictEqual(
      new Set([824824824])
    );
    expect(invalidIds2(parseRange("2121212118-2121212124"))).toStrictEqual(
      new Set([2121212121])
    );
  });

  test("sumInvalidIds2", async () => {
    const stream = await readableString(ids);
    const res = await sumInvalidIds2(stream);
    expect(res).toBe(4174379265);
  });
});
