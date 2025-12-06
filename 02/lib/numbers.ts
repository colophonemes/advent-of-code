export function factorize(n: number): Set<number> {
  if (!Number.isInteger(n)) {
    throw new Error(`Can only factorize integers, got ${n}`);
  }
  const factors = new Set<number>();
  if (n === 1) {
    factors.add(1);
  } else {
    const mid = Math.floor(n / 2);
    let i = 1;
    while (i <= mid) {
      if (!factors.has(i)) {
        const remainder = n % i;
        if (remainder === 0) {
          const dividend = n / i;
          factors.add(i);
          factors.add(dividend);
        }
      }
      i++;
    }
  }
  return factors;
}

export function distinctFactors(n: number): Set<number> {
  const distinct = new Set<number>();
  const factors = factorize(n);
  factors.delete(n);
  for (const factor of [...factors].sort((a, b) => b - a)) {
    if (distinct.size === 0) {
      distinct.add(factor);
    } else if (distinct.values().every((v) => v % factor !== 0)) {
      distinct.add(factor);
    }
  }
  return distinct;
}
