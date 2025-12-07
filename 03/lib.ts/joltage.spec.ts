import { describe, expect, test } from "vitest";

import { maxJoltage, sumJoltages, sumJoltagesStream } from "./joltage";
import { readableString } from "../../common/fs";

describe("joltage", () => {
  test("maxJoltage", () => {
    expect(maxJoltage("987654321111111")).toBe(98);
    expect(maxJoltage("811111111111119")).toBe(89);
    expect(maxJoltage("234234234234278")).toBe(78);
    expect(maxJoltage("818181911112111")).toBe(92);
    expect(maxJoltage("987654321111111", 12)).toBe(987654321111);
    expect(maxJoltage("811111111111119", 12)).toBe(811111111119);
    expect(maxJoltage("234234234234278", 12)).toBe(434234234278);
    expect(maxJoltage("818181911112111", 12)).toBe(888911112111);
    expect(maxJoltage("818181911112111", 3)).toBe(921);
    expect(maxJoltage("818181911112111", 4)).toBe(9211);
    expect(maxJoltage("818181911112111", 5)).toBe(92111);
    expect(maxJoltage("818181911112111", 6)).toBe(912111);
    expect(maxJoltage("818181911112111", 7)).toBe(9112111);
    expect(maxJoltage("818181911112111", 8)).toBe(91112111);
    expect(maxJoltage("818181911112111", 9)).toBe(911112111);
    expect(maxJoltage("818181911112111", 10)).toBe(8911112111);
    expect(maxJoltage("818181911112111", 11)).toBe(88911112111);
  });

  test("sumJoltages", () => {
    const input = [
      "987654321111111",
      "811111111111119",
      "234234234234278",
      "818181911112111",
    ];
    expect(sumJoltages(input)).toBe(357);
  });

  test("sumJoltagesStream", async () => {
    const input = [
      "987654321111111",
      "811111111111119",
      "234234234234278",
      "818181911112111",
    ];
    const stream = await readableString(input.join("\n"));
    expect(await sumJoltagesStream(stream, 2)).toBe(357);
    const stream2 = await readableString(input.join("\n"));
    expect(await sumJoltagesStream(stream2, 12)).toBe(3121910778619);
  });
});
