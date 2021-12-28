import input from './day12input';
// import input from './day12SampleInput';
// import input from './day12SampleInput2';
// import input from './day12SampleInput3';

type Path = [string, string];

class AdjacencyList {
  private adjacencyList: Map<string, string[]>;

  constructor() {
    this.adjacencyList = new Map();
  }

  addCave(cave: string): void {
    if (!this.adjacencyList.has(cave))
    this.adjacencyList.set(cave, []);
  }

  addPath(cave1: string, cave2: string): void {
    this.adjacencyList.get(cave1)!.push(cave2);
    this.adjacencyList.get(cave2)!.push(cave1);
  }

  getConnectingCaves(cave: string): string[] {
    return this.adjacencyList.get(cave)!;
  }
}

function parseRawInputToPathList(input: string): string[][] {
  return input.split('\n').map(line => line.split('-'));
}

function dfs(caveSystem: AdjacencyList, currentCave = 'start', visitedSmallCaves = new Set('start')): void {
  if (currentCave === 'end') {
    paths++;
    return;
  }
  if (isSmallCave(currentCave)) {
    visitedSmallCaves.add(currentCave);
  }
  const connectedCaves = caveSystem.getConnectingCaves(currentCave);
  for (const connectedCave of connectedCaves) {
    if (!visitedSmallCaves.has(connectedCave)) {
      dfs(caveSystem, connectedCave, visitedSmallCaves);
    }
  }
  // Backtrack
  visitedSmallCaves.delete(currentCave);
}

function isBigCave(cave: string): boolean {
  return cave === cave.toUpperCase();
}

function isSmallCave(cave: string): boolean {
  return cave === cave.toLowerCase();
}

const caveSystem = new AdjacencyList();

const pathList = parseRawInputToPathList(input);

pathList.forEach(([cave1, cave2]) => {
  caveSystem.addCave(cave1);
  caveSystem.addCave(cave2);
  caveSystem.addPath(cave1, cave2);
});

// console.log(caveSystem);
let paths = 0;

// Depth first search
dfs(caveSystem);

console.log(paths);
