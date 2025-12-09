import { describe, test, expect } from "vitest";

import {
  countNeightbourRolls,
  markRolls,
  neighbours,
  removeAllRolls,
  removeRolls,
} from "./paper";

function getFloorMap(): string[][] {
  return [
    "..@@.@@@@.",
    "@@@.@.@.@@",
    "@@@@@.@.@@",
    "@.@@@@..@.",
    "@@.@@@@.@@",
    ".@@@@@@@.@",
    ".@.@.@.@@@",
    "@.@@@.@@@@",
    ".@@@@@@@@.",
    "@.@.@@@.@.",
  ].map((row) => row.split(""));
}

describe("paper", () => {
  test("neighbours", () => {
    expect(neighbours({ x: 0, y: 0 }, getFloorMap())).toStrictEqual([
      { loc: { x: 1, y: 0 }, val: "." },
      { loc: { x: 0, y: 1 }, val: "@" },
      { loc: { x: 1, y: 1 }, val: "@" },
    ]);

    expect(neighbours({ x: 5, y: 5 }, getFloorMap())).toStrictEqual([
      { loc: { x: 4, y: 4 }, val: "@" },
      { loc: { x: 5, y: 4 }, val: "@" },
      { loc: { x: 6, y: 4 }, val: "@" },
      { loc: { x: 4, y: 5 }, val: "@" },
      { loc: { x: 6, y: 5 }, val: "@" },
      { loc: { x: 4, y: 6 }, val: "." },
      { loc: { x: 5, y: 6 }, val: "@" },
      { loc: { x: 6, y: 6 }, val: "." },
    ]);
  });

  test("countNeightbourRolls", () => {
    expect(countNeightbourRolls({ x: 0, y: 0 }, getFloorMap())).toBe(2);
    expect(countNeightbourRolls({ x: 5, y: 5 }, getFloorMap())).toBe(6);
  });

  test("markRolls", () => {
    const expected = [
      "..xx.xx@x.",
      "x@@.@.@.@@",
      "@@@@@.x.@@",
      "@.@@@@..@.",
      "x@.@@@@.@x",
      ".@@@@@@@.@",
      ".@.@.@.@@@",
      "x.@@@.@@@@",
      ".@@@@@@@@.",
      "x.x.@@@.x.",
    ].join("\n");
    expect(
      markRolls(getFloorMap())
        .map((r) => r.join(""))
        .join("\n")
    ).toStrictEqual(expected);
  });

  test("removeRolls (one-shot)", () => {
    const floorMap = markRolls(getFloorMap());
    expect(removeRolls(floorMap)).toBe(13);
  });

  test("removeRolls (iterated)", () => {
    const floorMap = getFloorMap();
    markRolls(floorMap);
    expect(floorMap).toStrictEqual(
      [
        "..xx.xx@x.",
        "x@@.@.@.@@",
        "@@@@@.x.@@",
        "@.@@@@..@.",
        "x@.@@@@.@x",
        ".@@@@@@@.@",
        ".@.@.@.@@@",
        "x.@@@.@@@@",
        ".@@@@@@@@.",
        "x.x.@@@.x.",
      ].map((c) => c.split(""))
    );
    expect(removeRolls(floorMap)).toBe(13);

    markRolls(floorMap);
    expect(floorMap).toStrictEqual(
      [
        ".......x..",
        ".@@.x.x.@x",
        "x@@@@...@@",
        "x.@@@@..x.",
        ".@.@@@@.x.",
        ".x@@@@@@.x",
        ".x.@.@.@@@",
        "..@@@.@@@@",
        ".x@@@@@@@.",
        "....@@@...",
      ].map((c) => c.split(""))
    );
    expect(removeRolls(floorMap)).toBe(12);
    expect(removeRolls(markRolls(floorMap))).toBe(7);
    expect(removeRolls(markRolls(floorMap))).toBe(5);
    expect(removeRolls(markRolls(floorMap))).toBe(2);
    expect(removeRolls(markRolls(floorMap))).toBe(1);
    expect(removeRolls(markRolls(floorMap))).toBe(1);
    expect(removeRolls(markRolls(floorMap))).toBe(1);
    expect(removeRolls(markRolls(floorMap))).toBe(1);
    expect(removeRolls(markRolls(floorMap))).toBe(0);

    const floorMap2 = getFloorMap();
    expect(removeAllRolls(floorMap2)).toBe(43);
  });
});
