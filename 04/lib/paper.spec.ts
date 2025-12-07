import { describe, test, expect } from "vitest";

import { markRolls } from "./paper";

describe("paper", () => {
  test("markRolls", () => {
    const input = [
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
    ].map((row) => row.split(""));
    expect(markRolls(input)).toStrictEqual(expected);
  });
});
