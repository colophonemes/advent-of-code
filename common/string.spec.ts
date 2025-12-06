import { describe, expect, test } from "vitest";
import { chunkStr } from "./string";

describe("string", () => {
  test("chunkStr", () => {
    const input = "abcdefghijkl";
    expect(chunkStr(input, 2)).toStrictEqual([
      "ab",
      "cd",
      "ef",
      "gh",
      "ij",
      "kl",
    ]);
    expect(chunkStr(input, 3)).toStrictEqual(["abc", "def", "ghi", "jkl"]);
    expect(chunkStr(input, 4)).toStrictEqual(["abcd", "efgh", "ijkl"]);
    expect(chunkStr(input, 6)).toStrictEqual(["abcdef", "ghijkl"]);
  });
});
