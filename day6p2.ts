import input from './day6input';
// import input from './day6SampleInput';


function parseInput(input: string): number[] {
  return input.split(',').map(Number);
}

function getInitialStateFromInput(input: string): number[] {
  // Parse the input
  let parsedInput = parseInput(input);

  const emptyFishCountsByDay: number[] = new Array(9).fill(0);
  return parsedInput.reduce((counts, current) => {
    counts[current]++;
    return counts;
  }, emptyFishCountsByDay);
}

function getNextDaysCounts(currentCounts: number[]) {
  let newFish: number;
  return currentCounts.map((count, i) => {
    if (i === 0) {
      newFish = count;
    }
    if (i === 6) {
      return currentCounts[7] + newFish;
    }
    if (i === 8) {
      return newFish;
    }
    return currentCounts[i + 1];
  })
}

function getTotalFishFromCounts(counts: number[]): number {
  return counts.reduce((sum, curr) => sum + curr, 0);
}

// Initialize counts
let counts = getInitialStateFromInput(input);

console.log(counts);

// Set day at 0
let day = 0;

// Simulate X days
// while (day < 80) {
while (day < 256) {
  counts = getNextDaysCounts(counts);
  
  // Increment day
  day++;
  console.log('After ' + day + ' days: ' + counts);
}

const totalFish = getTotalFishFromCounts(counts);

// Print the total number of fish
console.log(totalFish);

