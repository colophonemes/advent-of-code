import { describe, expect, test } from "vitest";
import { readableString, reduceStream } from "./fs";

describe("fs", () => {
  const ids = "123,456,789,101112";
  test("reduceStream", async () => {
    const res = [123, 456, 789, 101112];

    const stream = await readableString(ids, { highWaterMark: 8 });
    const parsed = await reduceStream(
      stream,
      ",",
      (acc, n) => {
        acc.push(parseInt(n, 10));
        return acc;
      },
      [] as number[]
    );
    expect(parsed).toStrictEqual(res);
  });
});
