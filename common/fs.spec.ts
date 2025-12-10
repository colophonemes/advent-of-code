import { describe, expect, test } from "vitest";
import { readableString, reduceStream } from "./fs";

describe("fs", () => {
  test("reduceStream", async () => {
    const ids = "123,456,789,101112,";
    const expected1 = [123, 456, 789, 101112, null];

    const stream1 = await readableString(ids, { highWaterMark: 8 });
    const parsed1 = await reduceStream(
      stream1,
      ",",
      (acc, n) => {
        if (n === "") {
          acc.push(null);
        } else {
          acc.push(parseInt(n, 10));
        }
        return acc;
      },
      [] as (number | null)[]
    );
    expect(parsed1).toStrictEqual(expected1);

    const lines = ["123", "456", "", "789", "", "101112"].join("\n");
    const expected2 = [123, 456, null, 789, null, 101112];
    const stream2 = await readableString(lines, { highWaterMark: 8 });
    const parsed2 = await reduceStream(
      stream2,
      "\n",
      (acc, n) => {
        if (n === "") {
          acc.push(null);
        } else {
          acc.push(parseInt(n, 10));
        }
        return acc;
      },
      [] as (number | null)[]
    );
    expect(parsed2).toStrictEqual(expected2);
  });
});
