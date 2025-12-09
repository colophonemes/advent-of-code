type Loc = { x: number; y: number };

const kernel = [-1, 0, 1] as const;

export function neighbours(
  { x, y }: Loc,
  input: string[][]
): { loc: Loc; val: string }[] {
  const neighbours: { loc: Loc; val: string }[] = [];
  for (const r of kernel) {
    for (const c of kernel) {
      if (r === 0 && c === 0) continue;
      const x_ = x + c;
      const y_ = y + r;
      const val = input[y_]?.[x_];
      if (val !== undefined) {
        neighbours.push({ loc: { y: y_, x: x_ }, val });
      }
    }
  }

  return neighbours;
}

export function countNeightbourRolls(loc: Loc, input: string[][]): number {
  return neighbours(loc, input).reduce((acc, curr) => {
    if (curr.val === "@" || curr.val === "x") {
      return acc + 1;
    }
    return acc;
  }, 0);
}

export function markRolls(input: string[][]): string[][] {
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      const count = countNeightbourRolls({ x, y }, input);
      const val = input[y][x];
      if (count < 4 && val === "@") {
        input[y][x] = "x";
      }
    }
  }
  return input;
}

export function removeRolls(input: string[][]): number {
  let count = 0;
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] === "x") {
        count++;
        input[y][x] = ".";
      }
    }
  }
  return count;
}

export function removeAllRolls(input: string[][]): number {
  let last = Infinity;
  let count = 0;
  while (last > 0) {
    last = removeRolls(markRolls(input));
    count += last;
  }
  return count;
}
