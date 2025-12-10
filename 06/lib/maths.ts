import { ReadStream } from "node:fs";
import { reduceStream } from "../../common/fs";

const Operators = ["+", "*"] as const;
type Operator = (typeof Operators)[number];
function isOperator(str: string): str is Operator {
  return Operators.includes(str as Operator);
}

export type Problem = { numbers: number[]; operator: Operator | undefined };

export async function readProblems1(stream: ReadStream): Promise<Problem[]> {
  return reduceStream(
    stream,
    "\n",
    (acc, curr) => {
      const items = curr.split(/\s+/);
      if (items[0] === "") items.shift();
      if (items[items.length - 1] === "") items.pop();
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        acc[i] = acc[i] || { numbers: [] };
        if (isOperator(item)) {
          acc[i].operator = item;
        } else {
          acc[i].numbers.push(parseInt(item, 10));
        }
      }
      return acc;
    },
    [] as Problem[]
  );
}

export async function readProblems2(stream: ReadStream): Promise<Problem[]> {
  const pivoted = await reduceStream(
    stream,
    "\n",
    (acc, curr, rowNo) => {
      const items = curr.split("");
      for (let colNo = 0; colNo < items.length; colNo++) {
        acc[colNo] = acc[colNo] ?? [];
        acc[colNo][rowNo] = items[colNo] ?? " ";
      }
      return acc;
    },
    [] as string[][]
  );

  let groupNo = 0;
  let grouped: Problem[] = [];
  for (let i = 0; i < pivoted.length; i++) {
    const last = pivoted[i].pop();
    const digits = pivoted[i].join("").trim();
    if (digits === "") {
      groupNo++;
      continue;
    }
    grouped[groupNo] = grouped[groupNo] ?? { numbers: [] };
    grouped[groupNo].numbers.push(parseInt(digits, 10));
    if (typeof last === "string" && isOperator(last)) {
      grouped[groupNo].operator = last;
    }
  }
  return grouped;
}

function sum(numbers: number[]): number {
  return numbers.reduce((acc, curr) => acc + curr);
}

function product(numbers: number[]): number {
  return numbers.reduce((acc, curr) => acc * curr);
}

export function executeProblem(problem: Problem): number {
  switch (problem.operator) {
    case "+":
      return sum(problem.numbers);
    case "*":
      return product(problem.numbers);
    default:
      throw new Error(`Invalid operator: ${problem.operator}`);
  }
}

export function sumAllProblems(problems: Problem[]) {
  return problems.reduce((acc, curr) => acc + executeProblem(curr), 0);
}
