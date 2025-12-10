import { describe, expect, test } from "vitest";
import { readableString } from "../../common/fs";
import {
  executeProblem,
  Problem,
  readProblems1,
  readProblems2,
  sumAllProblems,
} from "./maths";

const input = [
  `123 328  51 64 `,
  ` 45 64  387 23 `,
  `  6 98  215 314`,
  `*   +   *   +  `,
].join("\n");

const problems1: Problem[] = [
  { numbers: [123, 45, 6], operator: "*" },
  { numbers: [328, 64, 98], operator: "+" },
  { numbers: [51, 387, 215], operator: "*" },
  { numbers: [64, 23, 314], operator: "+" },
];

describe("maths", () => {
  test("readProblems1", async () => {
    const stream = await readableString(input);
    const res = await readProblems1(stream);
    expect(res).toStrictEqual(problems1);
  });

  test("executeProblem", () => {
    expect(executeProblem({ numbers: [123, 45, 6], operator: "*" })).toBe(
      33210
    );
    expect(executeProblem({ numbers: [328, 64, 98], operator: "+" })).toBe(490);
    expect(executeProblem({ numbers: [51, 387, 215], operator: "*" })).toBe(
      4243455
    );
    expect(executeProblem({ numbers: [64, 23, 314], operator: "+" })).toBe(401);
  });

  test("sumAllProblems", () => {
    expect(sumAllProblems(problems1)).toBe(4277556);
  });

  test("readProblems2", async () => {
    // structured as follows to avoid truncating space characters at the end of lines!

    const stream = await readableString(input);
    const problems2 = await readProblems2(stream);
    expect(problems2).toStrictEqual([
      {
        numbers: [1, 24, 356],
        operator: "*",
      },
      {
        numbers: [369, 248, 8],
        operator: "+",
      },
      {
        numbers: [32, 581, 175],
        operator: "*",
      },
      {
        numbers: [623, 431, 4],
        operator: "+",
      },
    ]);

    expect(executeProblem({ numbers: [1, 24, 356], operator: "*" })).toBe(8544);
    expect(executeProblem({ numbers: [369, 248, 8], operator: "+" })).toBe(625);
    expect(executeProblem({ numbers: [32, 581, 175], operator: "*" })).toBe(
      3253600
    );
    expect(executeProblem({ numbers: [623, 431, 4], operator: "+" })).toBe(
      1058
    );

    expect(sumAllProblems(problems2)).toBe(3263827);
  });
});
