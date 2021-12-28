import input from './day9input';
// import input from './day9SampleInput';

type Node = [
  r: number,
  c: number,
];

function parseRawInputTo2DArray(input: string): number[][] {
  return input.split('\n').map(line => line.split('').map(Number))
}

function getAdjacentNumbers(inputMatrix: number[][], r: number, c: number): number[] {
  const adjacentNumbers: number[] = [];
  if (r > 0) {
    adjacentNumbers.push(inputMatrix[r - 1][c]);
  }
  if (r < inputMatrix.length - 1) {
    adjacentNumbers.push(inputMatrix[r + 1][c]);
  }
  if (c > 0) {
    adjacentNumbers.push(inputMatrix[r][c - 1]);
  }
  if (c < inputMatrix[0].length - 1) {
    adjacentNumbers.push(inputMatrix[r][c + 1]);
  }
  return adjacentNumbers;
}

function getAdjacentNodes(inputMatrix: number[][], r: number, c: number): Node[] {
  const adjacentNodes: Node[] = [];
  if (r > 0) {
    adjacentNodes.push([r - 1, c]);
  }
  if (r < inputMatrix.length - 1) {
    adjacentNodes.push([r + 1, c]);
  }
  if (c > 0) {
    adjacentNodes.push([r, c - 1]);
  }
  if (c < inputMatrix[0].length - 1) {
    adjacentNodes.push([r, c + 1]);
  }
  return adjacentNodes;
}

// Approach: Get low points, recursively move through all adjacent numbers until getting to an edge or 9.
const inputMatrix = parseRawInputTo2DArray(input);

let lowPoints: Node[] = [];

// Check every number
for (let r = 0; r < inputMatrix.length; r++) {
  for (let c = 0; c < inputMatrix[0].length; c++) {
    const currentNumber = inputMatrix[r][c];
    // See if all adjacent numbers are greater than it
    const adjacentNumbers = getAdjacentNumbers(inputMatrix, r, c);
    // If all numbers are greater, add its height + 1 to the total
    if (adjacentNumbers.every(num => num > currentNumber)) {
      // console.log(`Adjacent numbers: ${adjacentNumbers}`);
      // console.log(`${currentNumber} is less than all adjacent numbers`);
      // console.log(`Adding ${currentNumber + 1} to the total`);
      lowPoints.push([r, c]);
    }
  }
}

// console.log(lowPoints);

const visited = new Set<string>();

const basinSizes: number[] = [];
const basins: Node[][] = [];

lowPoints.forEach(lowPoint => {
  let basinSize = 0;
  let currentBasin: Node[] = [];
  const queue: Node[] = [lowPoint];
  while (queue.length > 0) {
    const currentNode: Node = queue.shift()!;
    const [currR, currC] = currentNode;
    if (visited.has(`${currR}-${currC}`)) {
      continue;
    }
    visited.add(`${currR}-${currC}`);
    currentBasin.push(currentNode);
    basinSize++;
    const adjacentNodes: Node[] = getAdjacentNodes(inputMatrix, currR, currC);
    adjacentNodes.forEach((adjacentNode: Node) => {
      const [adjR, adjC] = adjacentNode;
      const adjacentNumber = inputMatrix[adjR][adjC];
      if (adjacentNumber < 9 && !visited.has(`${adjR}-${adjC}`)) {
        queue.push(adjacentNode);
      }
    });
  }
  basinSizes.push(basinSize);
  basins.push(currentBasin);
});

// console.log(basinSizes);
// console.log(basins);

const sortedSizesDescending = basinSizes.sort((a, b) => b - a);

// console.log(sortedSizesDescending);

const threeLargestBasins = sortedSizesDescending.slice(0, 3);

const productOfThreeLargestBasins = threeLargestBasins.reduce((acc, curr) => acc * curr, 1);

console.log(productOfThreeLargestBasins);
