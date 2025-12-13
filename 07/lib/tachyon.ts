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
export class Vertex {
  public left: Vertex | null;
  public right: Vertex | null;
  public value: string;

  constructor(value: string, left?: Vertex, right?: Vertex) {
    this.value = value;
    this.left = left ?? null;
    this.right = right ?? null;
  }
}

export function showGraph(root: Vertex): (string | null)[] {
  const r: (string | null)[] = [];
  const dfs = (vtx: Vertex | null) => {
    if (vtx === null) {
      r.push(null);
      return;
    }
    r.push(vtx.value);
    dfs(vtx.left);
    dfs(vtx.right);
  };
  dfs(root);
  return r;
}

export function buildGraph(manifold: Manifold): Vertex {
  const beamlines: number[][] = [];
  const map = new Map<string, Vertex>();
  const parents = new Map<number, number>();
  const start = manifold[0].indexOf("S");
  if (start < 0) {
    throw new Error(
      `Cannot find start position in manifold\n${showManifold(manifold)}`
    );
  }
  beamlines[0] = [start];
  const root = new Vertex(`0,${start}`);
  map.set(`0,${start}`, root);
  parents.set(start, 0);
  for (let i = 1; i < manifold.length; i++) {
    const beams = beamlines[i - 1];
    for (let b = 0; b < beams.length; b++) {
      const beam = beams[b];
      const char = manifold[i][beam];
      beamlines[i] = beamlines[i] ?? [];
      beamlines[i].sort((a, b) => a - b);
      switch (char) {
        case ".": {
          beamlines[i].push(beam);
          break;
        }
        case "^": {
          const l = beam - 1;
          const r = beam + 1;

          if (!beamlines[i].includes(l)) {
            beamlines[i].push(l);
          }
          if (!beamlines[i].includes(r)) {
            beamlines[i].push(r);
          }
          const parent = map.get(`${parents.get(beam)},${beam}`);
          if (parent === undefined) throw new Error(`Parent not found!`);

          if (parent.left === null) {
            const lV = map.get(`${i},${l}`) ?? new Vertex(`${i},${l}`);
            map.set(`${i},${l}`, lV);
            parent.left = lV;
            parents.set(l, i);
          }

          if (parent.right === null) {
            const rV = map.get(`${i},${r}`) ?? new Vertex(`${i},${r}`);
            map.set(`${i},${r}`, rV);
            parent.right = rV;
            parents.set(r, i);
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
  return root;
}

export function countSplits(root: Vertex): number {
  let visited = new Set<string>();
  const dfs = (vtx: Vertex) => {
    if (vtx.left && vtx.right) {
      visited.add(vtx.value);
      dfs(vtx.left);
      dfs(vtx.right);
    }
  };
  dfs(root);
  return visited.size;
}

export function countPaths(root: Vertex): number {
  const paths = new Set<string>();
  let path: string[] = [];
  const dfs = (vtx: Vertex | null) => {
    if (vtx === null) {
      paths.add(path.join(` -> `));
    } else {
      path.unshift(vtx.value);
      dfs(vtx.left);
      dfs(vtx.right);
      path.shift();
    }
  };
  dfs(root);
  return paths.size;
}
