import input from './day5input';
// import input from './day5SampleInput';
// const sampleOutput = 5;

// Parse the input
const splitInput = splitInputByLines(input);

function splitInputByLines(input: string): string[] {
  return input.split('\n');
}

// console.log(splitInput);

/* Approaches:
 1. Create a 2D empty array of size 1000x1000 and iterate through the input updating values and then iterate through the array to count the entries greater than 1
 */

 // Create an empty 2D array
// const grid = new Array(10).fill(0).map(() => new Array(10).fill(0));
const grid = new Array(1000).fill(0).map(() => new Array(1000).fill(0));

 // Iterate through the input
splitInput.forEach(line => {
  const [start, end] = line.split(' -> ');
  let [startX, startY] = start.split(',').map(Number);
  const [endX, endY] = end.split(',').map(Number);

  // Update values in the array
  grid[startX][startY] += 1;

  while (startX !== endX || startY !== endY) {
    if (startX !== endX) {
      startX += startX < endX ? 1 : -1;
    }
    if (startY !== endY) {
      startY += startY < endY ? 1 : -1;
    }
    grid[startX][startY]+= 1;
  }
});

// console.table(grid);

 // Iterate through the array to count the entries greater than 1
let count = 0;
grid.forEach(row => {
  row.forEach(cell => {
    if (cell > 1) {
      count++;
    }
  });
});

console.log(count);