import input from './day12input';
// import input from './day12SampleInput';
// import input from './day12SampleInput2';
// import input from './day12SampleInput3';

type SmallCaveVisits = Map<string, number>;

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

function dfs(
  caveSystem: AdjacencyList,
  currentCave = 'start',
  smallCaveVisits: SmallCaveVisits = new Map<string, number>(),
  ): void {

  // console.log(smallCaveVisits);

  if (currentCave === 'end') {
    paths++;
    return;
  }

  if (isSmallCave(currentCave)) {
    smallCaveVisits.get(currentCave) ? smallCaveVisits.set(currentCave, smallCaveVisits.get(currentCave)! + 1) : smallCaveVisits.set(currentCave, 1);
  }
  const connectedCaves = caveSystem.getConnectingCaves(currentCave);
  for (const connectedCave of connectedCaves) {
    if (canVisitCave(connectedCave, smallCaveVisits)) {
      dfs(caveSystem, connectedCave, smallCaveVisits);
    }
  }
  // Backtrack
  if (isSmallCave(currentCave)) {
    const visits = smallCaveVisits.get(currentCave)!;
    if (visits === 2)
      smallCaveVisits.set(currentCave, 1);
    else
      smallCaveVisits.set(currentCave, 0);
  }
}

function isSmallCave(cave: string): boolean {
  return cave === cave.toLowerCase();
}

function canVisitCave(cave: string, smallCaveVisits: SmallCaveVisits): boolean {
  // Check to see if the cave has been visited before
  // If it has been visited before, check to see if any small cave has already been visited more than once
  if (cave === 'start')
    return false;
  if (cave === 'end')
    return true;
  if (!isSmallCave(cave))
    return true;
  if (!smallCaveVisits.has(cave))
    return true;
  if (smallCaveVisits.get(cave)! < 1)
    return true;
  if (Array.from(smallCaveVisits.values()).includes(2))
    return false;
  return true;
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
