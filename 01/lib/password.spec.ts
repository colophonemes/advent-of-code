import { describe, expect, test } from "vitest";
import { parseRotations, password, password2, zeroesPassed } from "./password";

const rotations = [
  "L68",
  "L30",
  "R48",
  "L5",
  "R60",
  "L55",
  "L1",
  "L99",
  "R14",
  "L82",
];

describe("passwords", () => {
  test("parseRotations", () => {
    expect(parseRotations(rotations)).toStrictEqual([
      -68, -30, 48, -5, 60, -55, -1, -99, 14, -82,
    ]);
  });

  test("password", () => {
    const start = 50;
    expect(password(start, rotations)).toBe(3);
  });

  test("zeroesPassed", () => {
    expect(zeroesPassed(0, 0)).toBe(0);
    expect(zeroesPassed(50, -68)).toBe(1);
    expect(zeroesPassed(0, 100)).toBe(1);
    expect(zeroesPassed(50, -100)).toBe(1);
    expect(zeroesPassed(0, -100)).toBe(1);
    expect(zeroesPassed(0, 200)).toBe(2);
    expect(zeroesPassed(50, 200)).toBe(2);
    expect(zeroesPassed(50, 10)).toBe(0);
    expect(zeroesPassed(50, -10)).toBe(0);
    expect(zeroesPassed(50, 1000)).toBe(10);
    expect(zeroesPassed(50, -1000)).toBe(10);
    expect(zeroesPassed(0, -1000)).toBe(10);
  });

  test("password2", () => {
    const start = 50;
    expect(password2(start, rotations)).toBe(6);
  });
});
