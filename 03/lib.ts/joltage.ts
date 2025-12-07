import { ReadStream } from "fs";
import { reduceStream } from "../../common/fs";

export function maxJoltage(digits: string, strLen = 2): number {
  const result: number[] = [];
  for (let i = 0; i < digits.length; i++) {
    const digit = parseInt(digits[i], 10);
    const remaining = digits.length - i - 1;

    while (
      result.length > 0 &&
      result[result.length - 1] < digit &&
      result.length + remaining >= strLen
    ) {
      result.pop();
    }

    if (result.length < strLen) {
      result.push(digit);
    }
  }
  return parseInt(result.join(""), 10);
}

export function sumJoltages(input: string[], strLen = 2) {
  return input.reduce((acc, curr) => {
    return acc + maxJoltage(curr, strLen);
  }, 0);
}

export function sumJoltagesStream(stream: ReadStream, strLen = 2) {
  return reduceStream(
    stream,
    "\n",
    (acc, curr) => {
      return acc + maxJoltage(curr, strLen);
    },
    0
  );
}
