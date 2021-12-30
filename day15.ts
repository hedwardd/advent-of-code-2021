import input from './day15input';
// import input from './day15SampleInput';

type Grid = number[][];

type Row = number;
type Column = number;

type LocationMinimums = Map<string, number>;

const DIRECTIONS: number[][] = [
  [1, 0],
  [0, 1],
  [0, -1],
  [-1, 0],
]

function parseRawInputToGrid(input: string): Grid {
  const lines = input.split('\n');
  const grid = lines.map(line => line.split('').map(Number));
  return grid;
}

function getStringFromCoordinates(row: Row, column: Column): string {
  return `${row},${column}`;
}

function getMinTotalRisk(grid: Grid): number {
  let minTotalRisk = Number.MAX_VALUE;
  const endRow = grid.length - 1;
  const endColumn = grid[0].length - 1;
  const locationMinimums: LocationMinimums = new Map<string, number>();
  locationMinimums.set(getStringFromCoordinates(0, 0), 0);

  function dfs(row: Row, column: Column, risk: number): void {
    if (risk > minTotalRisk) {
      return;
    }
    if (row === endRow && column === endColumn) {
      if (risk < minTotalRisk) {
        minTotalRisk = risk;
      }
      return;
    }
    const locationString = getStringFromCoordinates(row, column);
    locationMinimums.set(locationString, risk);
    // console.log(`Visiting ${locationString} with risk ${risk}`);
    for (const direction of DIRECTIONS) {
      const [dr, dc] = direction;
      const newR = row + dr;
      const newC = column + dc;
      if (newR < 0 || newC < 0 || newR > endRow || newC > endColumn) {
        continue;
      }
      const newCoordinatesString = getStringFromCoordinates(newR, newC);
      const newRisk = risk + grid[newR][newC];
      if ((locationMinimums.has(newCoordinatesString) ? locationMinimums.get(newCoordinatesString)! : Number.MAX_VALUE) > newRisk) {
        dfs(newR, newC, risk + grid[newR][newC]);
      }
    }
  }
  dfs(0, 0, 0);
  return minTotalRisk;
}
const grid = parseRawInputToGrid(input);

const minTotalRisk = getMinTotalRisk(grid);

console.log(minTotalRisk);

