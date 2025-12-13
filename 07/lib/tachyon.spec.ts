import { describe, expect, test } from "vitest";
import {
  buildGraph,
  countPaths,
  countSplits,
  Manifold,
  showGraph,
  showManifold,
  traverse,
  Vertex,
} from "./tachyon";

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
      ".......S.......", // 0
      ".......|.......", // 1
      "......|^|......", // 2
      "......|.|......", // 3
      ".....|^|^|.....", // 4
      ".....|.|.|.....", // 5
      "....|^|^|^|....", // 6
      "....|.|.|.|....", // 7
      "...|^|^|||^|...", // 8
      "...|.|.|||.|...", // 9
      "..|^|^|||^|^|..", // 10
      "..|.|.|||.|.|..", // 11
      ".|^|||^||.||^|.", // 12
      ".|.|||.||.||.|.", // 13
      "|^|^|^|^|^|||^|", // 14
      "|.|.|.|.|.|||.|", // 15
    ].map((r) => r.split(""));
    expect(showManifold(manifold)).toBe(showManifold(expected));
    expect(splits).toBe(21);
  });

  test("buildGraph", () => {
    const graph = new Map<string, Vertex>();

    graph.set("14,0", new Vertex("14,0"));
    graph.set("14,2", new Vertex("14,2"));
    graph.set("14,4", new Vertex("14,4"));
    graph.set("14,6", new Vertex("14,6"));
    graph.set("14,8", new Vertex("14,8"));
    graph.set("14,10", new Vertex("14,10"));
    graph.set("14,12", new Vertex("14,12"));
    graph.set("14,14", new Vertex("14,14"));

    graph.set("12,1", new Vertex("12,1", graph.get("14,0"), graph.get("14,2")));
    graph.set("12,3", new Vertex("12,3", graph.get("14,2"), graph.get("14,4")));
    graph.set("12,5", new Vertex("12,5", graph.get("14,4"), graph.get("14,6")));
    graph.set("12,7", new Vertex("12,7", graph.get("14,6"), graph.get("14,8")));
    graph.set("12,11", new Vertex("12,11"));
    graph.set(
      "12,13",
      new Vertex("12,13", graph.get("14,12"), graph.get("14,14"))
    );

    graph.set("10,2", new Vertex("10,2", graph.get("12,1"), graph.get("12,3")));
    graph.set("10,4", new Vertex("10,4"));
    graph.set("10,6", new Vertex("10,6", graph.get("12,5"), graph.get("12,7")));
    graph.set("10,8", new Vertex("10,8"));
    graph.set("10,10", new Vertex("10,10"));
    graph.set(
      "10,12",
      new Vertex("10,12", graph.get("12,11"), graph.get("12,13"))
    );

    graph.set("8,3", new Vertex("8,3", graph.get("10,2"), graph.get("10,4")));
    graph.set("8,5", new Vertex("8,5", graph.get("10,4"), graph.get("10,6")));
    graph.set("8,7", new Vertex("8,7"));
    graph.set("8,9", new Vertex("8,9", graph.get("10,8"), graph.get("10,10")));
    graph.set(
      "8,11",
      new Vertex("8,11", graph.get("10,10"), graph.get("10,12"))
    );
    graph.set("6,4", new Vertex("6,4", graph.get("8,3"), graph.get("8,5")));
    graph.set("6,6", new Vertex("6,6", graph.get("8,5"), graph.get("8,7")));
    graph.set("6,8", new Vertex("6,8"));
    graph.set("6,10", new Vertex("6,10", graph.get("8,9"), graph.get("8,11")));
    graph.set("4,5", new Vertex("4,5", graph.get("6,4"), graph.get("6,6")));
    graph.set("4,7", new Vertex("4,7", graph.get("6,6"), graph.get("6,8")));
    graph.set("4,9", new Vertex("4,9", graph.get("6,8"), graph.get("6,10")));
    graph.set("2,6", new Vertex("2,6", graph.get("4,5"), graph.get("4,7")));
    graph.set("2,8", new Vertex("2,8", graph.get("4,7"), graph.get("4,9")));
    graph.set("0,7", new Vertex("0,7", graph.get("2,6"), graph.get("2,8")));

    const built = buildGraph(initManifold());
    expect(built).toStrictEqual(graph.get("0,7"));
  });

  test("countSplits", () => {
    const graph = buildGraph(initManifold());
    expect(countSplits(graph)).toBe(21);
  });

  test("countPaths", () => {
    const graph = buildGraph(initManifold());
    expect(countPaths(graph)).toBe(40);
  });
});
