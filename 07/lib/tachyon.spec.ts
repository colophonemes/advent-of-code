import { describe, expect, test } from "vitest";
import { Manifold, showManifold, traverse } from "./tachyon";

function initManifold(): Manifold {
  return [
    ".......S.......",
    "...............",
    ".......^.......",
    "...............",
    "......^.^......",
    "...............",
    ".....^.^.^.....",
    "...............",
    "....^.^...^....",
    "...............",
    "...^.^...^.^...",
    "...............",
    "..^...^.....^..",
    "...............",
    ".^.^.^.^.^...^.",
    "...............",
  ].map((r) => r.split(""));
}

describe("tachyon", () => {
  test("showManifold", () => {
    expect(showManifold(initManifold())).toBe(
      initManifold()
        .map((r, i) => `${`${i + 1}`.padStart(2, "0")} ${r.join("")}`)
        .join("\n")
    );
  });
  test("step", () => {
    const manifold = initManifold();
    const splits = traverse(manifold);
    const expected: Manifold = [
      ".......S.......",
      ".......|.......",
      "......|^|......",
      "......|.|......",
      ".....|^|^|.....",
      ".....|.|.|.....",
      "....|^|^|^|....",
      "....|.|.|.|....",
      "...|^|^|||^|...",
      "...|.|.|||.|...",
      "..|^|^|||^|^|..",
      "..|.|.|||.|.|..",
      ".|^|||^||.||^|.",
      ".|.|||.||.||.|.",
      "|^|^|^|^|^|||^|",
      "|.|.|.|.|.|||.|",
    ].map((r) => r.split(""));
    expect(showManifold(manifold)).toBe(showManifold(expected));
    expect(splits).toBe(21);
  });
});
