import input from './day9input';
// import input from './day9SampleInput';

function parseRawInputTo2DArray(input: string): number[][] {
  return input.split('\n').map(line => line.split('').map(Number))
}

const inputMatrix = parseRawInputTo2DArray(input);

// console.table(inputMatrix);

/* Approaches:
  1. Brute force, check every number to see if all adjacent numbers are greater than it.
  2. Use graph traversal to recursively check all adjacent numbers.
*/

let sum = 0;

// Check every number
for (let r = 0; r < inputMatrix.length; r++) {
  for (let c = 0; c < inputMatrix[0].length; c++) {
    const currentNumber = inputMatrix[r][c];
    // See if all adjacent numbers are greater than it
    const adjacentNumbers = getAdjacentNumbers(inputMatrix, r, c);
    // If all numbers are greater, add its height + 1 to the total
    if (adjacentNumbers.every(num => num > currentNumber)) {
      console.log(`Adjacent numbers: ${adjacentNumbers}`);
      console.log(`${currentNumber} is less than all adjacent numbers`);
      console.log(`Adding ${currentNumber + 1} to the total`);
      sum += currentNumber + 1;
    }
  }
}

console.log(sum);


function getAdjacentNumbers(inputMatrix: number[][], r: number, c: number) {
  const adjacentNumbers = [];
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
