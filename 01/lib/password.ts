export function parseRotations(rotations: string[]): number[] {
  return rotations.map((r, i) => {
    if (r === "") return 0;
    const matches = r.match(/^(L|R)(\d+)$/);
    if (matches === null) throw new Error(`Invalid rotation spec: ${r} (${i})`);
    const [, direction, steps] = matches;
    const stepsInt = parseInt(steps, 10);
    if (direction === "L") {
      return stepsInt * -1;
    } else if (direction === "R") {
      return stepsInt;
    } else {
      throw new Error(`Invalid direction ${direction} in spec ${r}  (${i})`);
    }
  });
}

// Safe modulo
const mod = (n: number, modulus: number) => ((n % modulus) + modulus) % modulus;

export function password(start: number, rotations: string[]): number {
  let p = start;
  let zeroes = 0;
  for (const steps of parseRotations(rotations)) {
    p = mod(p + steps, 100);
    if (p === 0) {
      zeroes++;
    }
  }
  return zeroes;
}

export function zeroesPassed(start: number, steps: number): number {
  const sum = start + steps;
  if (sum >= 100) {
    return Math.trunc(sum / 100);
  } else if (sum < 0) {
    return Math.abs(Math.trunc(sum / 100)) + (start !== 0 ? 1 : 0);
  } else if (sum === 0 && start !== 0) {
    return 1;
  }
  return 0;
}

export function password2(start: number, rotations: string[]): number {
  let p = start;
  let zeroes = 0;
  for (const steps of parseRotations(rotations)) {
    zeroes += zeroesPassed(p, steps);
    p = mod(p + steps, 100);
  }
  return zeroes;
}
