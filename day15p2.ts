import input from './day15input';
// import input from './day15SampleInput';
// import sampleSuperGridInput from './day15SampleInput2';

type Grid = number[][];

type Row = number;
type Column = number;

type LocationMinimums = Map<string, number>;

const DIRECTIONS: number[][] = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
]

function parseRawInputToGrid(input: string): Grid {
  const lines = input.split('\n');
  const grid = lines.map(line => line.split('').map(Number));
  return grid;
}

function checkIfGridsAreEqual(superGrid1: Grid, superGrid2: Grid) {
  for (let row = 0; row < superGrid1.length; row++) {
    for (let col = 0; col < superGrid1[0].length; col++) {
      if (superGrid1[row][col] !== superGrid2[row][col]) {
        return false;
      }
    }
  }
  for (let row = 0; row < superGrid2.length; row++) {
    for (let col = 0; col < superGrid2[0].length; col++) {
      if (superGrid1[row][col] !== superGrid2[row][col]) {
        return false;
      }
    }
  }
  return true;
}

function getUpdatedNumber(num: number): number {
  if (num <= 8) {
    return num + 1;
  }
  return 1;
}

function getProcessedRow(row: number[]): number[] {
  return row.map(getUpdatedNumber);
}

function getProcessedGrid(inputGrid: Grid): Grid {
  return inputGrid.map(getProcessedRow);
}

function getGridExpandedDown(grid: Grid): Grid {
  // Get deep copy of grid first?
  let expandedGrid = [...grid];
  let proccesedGrid = getProcessedGrid(grid);

  for (let i = 0; i < 4; i++) {
    expandedGrid = expandedGrid.concat(proccesedGrid);
    proccesedGrid = getProcessedGrid(proccesedGrid);
  }
  return expandedGrid;
}

function getExtendedRow(row: number[]): number[] {
  let extendedRow = [...row];
  let processedRow = getProcessedRow(row);

  for (let i = 0; i < 4; i++) {
    extendedRow = extendedRow.concat(processedRow);
    processedRow = getProcessedRow(processedRow);
  }
  return extendedRow;
}

function getGridExpandedRight(grid: Grid): Grid {
  return grid.map(getExtendedRow);
}

function getStringFromCoordinates(row: Row, column: Column): string {
  return `${row},${column}`;
}

function getRiskOfLeftEdge(grid: Grid): number {
  let risk = 0;
  for (let row = 0; row < grid.length; row++) {
    risk += grid[row][0];
  }
  for (let col = 0; col < grid[0].length; col++) {
    risk += grid[grid.length - 1][col];
  }
  return risk;
}

function getRiskOfRightEdge(grid: Grid): number {
  let risk = 0;
  for (let col = 0; col < grid[0].length; col++) {
    risk += grid[0][col];
  }
  for (let row = 0; row < grid.length; row++) {
    risk += grid[row][grid[0].length - 1];
  }
  return risk;
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
        console.log(`New min total risk: ${minTotalRisk}`);
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

  // Optimize by checking edge path first
  const leftEdgeRisk = getRiskOfLeftEdge(grid);
  // console.log(`Left edge risk: ${leftEdgeRisk}`);
  minTotalRisk = Math.min(minTotalRisk, leftEdgeRisk)
  
  const rightEdgeRisk = getRiskOfRightEdge(grid);
  // console.log(`Right edge risk: ${rightEdgeRisk}`);
  minTotalRisk = Math.min(minTotalRisk, rightEdgeRisk);

  dfs(0, 0, 0);

  return minTotalRisk;
}
const grid = parseRawInputToGrid(input);
// console.table(grid);

const gridExpandedDown = getGridExpandedDown(grid);
// console.table(gridExpandedDown);

const superGrid = getGridExpandedRight(gridExpandedDown);
// console.table(superGrid);

// // Check super grid is correct
// const sampleSuperGrid = parseRawInputToGrid(sampleSuperGridInput);
// console.table(sampleSuperGrid);
// const isCorrect = checkIfGridsAreEqual(superGrid, sampleSuperGrid)
// console.log(isCorrect);

const minTotalRisk = getMinTotalRisk(superGrid);
console.log(minTotalRisk);
