import input from './day7input';
// import input from './day7SampleInput';

function parseInput(input: string): number[] {
  return input.split(',').map(Number);
}

/* Approaches:

  Pattern: More efficient for few individuals to travel further

  1. Calculate average and test values in each direction until reaching optimum
  2. Calculate mode and test values in each direction until reaching optimum
  3. Same as #1 but remove outliers before calculating average
*/

const getAverage = (numbers: number[]): number => {
  return numbers.reduce((a, b) => a + b) / numbers.length;
}

const getMode = (numbers: number[]): number => {
  const counts = numbers.reduce((acc, curr) => {
    acc.set(curr, (acc.get(curr) || 0) + 1);
    return acc;
  }, new Map<number, number>());

  const max = Math.max(...counts.values());
  const keys = Array.from(counts.keys()).filter(key => counts.get(key) === max);

  return Number(keys[0]);
}

function getFuelCostBetweenPoints(startingPoint: number, endingPoint: number) {
  const distance = Math.abs(endingPoint - startingPoint);
  let cost = 0;
  for (let i = 1; i <= distance; i++) {
    cost += i;
  }
  return cost;
}

function getTotalFuelCost(positions: number[], startingPoint: number) {
  return positions.reduce((acc, curr) => acc + getFuelCostBetweenPoints(startingPoint, curr), 0);
}
const positions = parseInput(input);

const average = getAverage(positions)
const mode = getMode(positions)

console.log(`Average: ${average}`);
console.log(`Mode: ${mode}`);


// Test values in each direction until reaching optimum
let startingPoint = Math.round(average);
let nextPointUp = startingPoint + 1;
let nextPointDown = startingPoint - 1;

let totalFuelCost = getTotalFuelCost(positions, startingPoint);
let totalFuelCostFromGreaterPosition = getTotalFuelCost(positions, nextPointUp);
let totalFuelCostFromLesserPosition = getTotalFuelCost(positions, nextPointDown);

while (
  totalFuelCost > totalFuelCostFromGreaterPosition ||
  totalFuelCost > totalFuelCostFromLesserPosition
  ) {
  if (totalFuelCostFromGreaterPosition < totalFuelCostFromLesserPosition)
    startingPoint = nextPointUp;
  else
    startingPoint = nextPointDown;

  nextPointUp = startingPoint + 1;
  nextPointDown = startingPoint - 1;

  totalFuelCost = getTotalFuelCost(positions, startingPoint);
  totalFuelCostFromGreaterPosition = getTotalFuelCost(positions, nextPointUp);
  totalFuelCostFromLesserPosition = getTotalFuelCost(positions, nextPointDown);
}

console.log(`Starting point: ${startingPoint}`);
console.log(`Total fuel cost: ${totalFuelCost}`);