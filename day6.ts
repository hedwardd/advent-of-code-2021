// import input from './day6input';
import input from './day6SampleInput';

// Parse the input
let fishState = parseInput(input);

function parseInput(input: string): number[] {
  return input.split(',').map(Number);
}

// Simulate 80 days
// Set day at 0
let day = 0;

while (day < 80) {
  
  // For each day
  let newFishCount = 0;

  // Update the state of each fish
  fishState = fishState.map(fish => {
    if (fish === 0) {
      newFishCount++;
      return 6;
    }
    return fish - 1;
  })

  // For every fish that was at 0, add a new fish at set at 8
  fishState.push(...new Array(newFishCount).fill(8));

  // Restart new fish count
  newFishCount = 0;
  
  // Increment day
  day++;
  // console.log('After ' + day + ' days: ' + fishState);
}

// Return the length at the end
console.log(fishState.length);