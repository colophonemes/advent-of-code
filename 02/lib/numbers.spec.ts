import { describe, expect, test } from "vitest";
import { distinctFactors, factorize } from "./numbers";

describe("numbers", () => {
  test("factorize", () => {
    expect(factorize(1)).toStrictEqual(new Set([1]));
    expect(factorize(2)).toStrictEqual(new Set([1, 2]));
    expect(factorize(3)).toStrictEqual(new Set([1, 3]));
    expect(factorize(4)).toStrictEqual(new Set([1, 2, 4]));
    expect(factorize(5)).toStrictEqual(new Set([1, 5]));
    expect(factorize(6)).toStrictEqual(new Set([1, 2, 3, 6]));
    expect(factorize(12)).toStrictEqual(new Set([1, 2, 3, 4, 6, 12]));
  });

  test("distinctFactors", () => {
    expect(distinctFactors(2)).toStrictEqual(new Set([1]));
    expect(distinctFactors(3)).toStrictEqual(new Set([1]));
    expect(distinctFactors(4)).toStrictEqual(new Set([2]));
    expect(distinctFactors(5)).toStrictEqual(new Set([1]));
    expect(distinctFactors(6)).toStrictEqual(new Set([2, 3]));
    expect(distinctFactors(12)).toStrictEqual(new Set([4, 6]));
  });
});
