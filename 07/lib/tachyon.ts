export type Manifold = string[][];

export function showManifold(manifold: Manifold): string {
  const padding = Math.log10(manifold.length) + 1;
  return manifold
    .map((r, i) => `${`${i + 1}`.padStart(padding, "0")} ${r.join("")}`)
    .join("\n");
}

/**
 * Modifies a manifold in-place, checking the next step
 */
export function traverse(manifold: Manifold): number {
  const beamlines: number[][] = [];
  const start = manifold[0].indexOf("S");
  if (start < 0) {
    throw new Error(
      `Cannot find start position in manifold\n${showManifold(manifold)}`
    );
  }
  beamlines[0] = [start];
  let splits = 0;
  for (let i = 1; i < manifold.length; i++) {
    const beams = beamlines[i - 1];
    for (let b = 0; b < beams.length; b++) {
      const beam = beams[b];
      const char = manifold[i][beam];
      beamlines[i] = beamlines[i] ?? [];
      beamlines[i].sort((a, b) => a - b);
      switch (char) {
        case ".":
        case "|": {
          manifold[i][beam] = "|";
          beamlines[i].push(beam);
          break;
        }
        case "^": {
          const l = beam - 1;
          const r = beam + 1;
          let split = false;
          manifold[i][l] = "|";
          manifold[i][r] = "|";

          if (!beamlines[i].includes(l)) {
            beamlines[i].push(l);
            split = true;
          }
          if (!beamlines[i].includes(r)) {
            beamlines[i].push(r);
            split = true;
          }
          if (split) {
            splits++;
          }
          break;
        }
        default:
          console.log(showManifold(manifold.slice(0, i)));
          console.log(beamlines);
          throw new Error(
            `Invalid manifold member at line ${i + 1}:${b} "${char}"`
          );
      }
    }
  }
  return splits;
}
