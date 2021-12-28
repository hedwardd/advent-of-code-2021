import input from './day11input';
// import input from './day11SampleInput';

function parseRawInputToStartingEnergyLevels(input: string): number[][] {
  return input.split('\n').map(line => line.split('').map(num => Number(num)));
}

function getNumFlashesAfterSteps(energyLevels: number[][], steps: number): number {
  let flashCount = 0;

  function doFlash(r: number, c: number) {
    // Increment flashCount
    flashCount++;

    // Increment all adjacent numbers
    // If any number goes from 9 to 10, initiate flash on that number

    // Top
    if (r > 0) {
      energyLevels[r-1][c]++;
      if (energyLevels[r-1][c] === 10)
        doFlash(r-1, c);
    }
    // Top-right
    if (r > 0 && c < energyLevels[0].length - 1) {
      energyLevels[r-1][c+1]++;
      if (energyLevels[r-1][c+1] === 10)
        doFlash(r-1, c+1);
    }
    // Right
    if (c < energyLevels[0].length - 1) {
      energyLevels[r][c+1]++;
      if (energyLevels[r][c+1] === 10)
        doFlash(r, c+1);
    }
    // Bottom-right
    if (r < energyLevels.length - 1 && c < energyLevels[0].length - 1) {
      energyLevels[r+1][c+1]++;
      if (energyLevels[r+1][c+1] === 10)
        doFlash(r+1, c+1);
    }
    // Bottom
    if (r < energyLevels.length - 1) {
      energyLevels[r+1][c]++;
      if (energyLevels[r+1][c] === 10)
        doFlash(r+1, c);
    }
    // Bottom-left
    if (r < energyLevels.length - 1 && c > 0) {
      energyLevels[r+1][c-1]++;
      if (energyLevels[r+1][c-1] === 10)
        doFlash(r+1, c-1);
    }
    // Left
    if (c > 0) {
      energyLevels[r][c-1]++;
      if (energyLevels[r][c-1] === 10)
        doFlash(r, c-1);
    }
    // Top-left
    if (r > 0 && c > 0) {
      energyLevels[r-1][c-1]++;
      if (energyLevels[r-1][c-1] === 10)
        doFlash(r-1, c-1);
    }
  }


  // For each step
  for (let step = 0; step < steps; step++) {

    // Increment all numbers by 1
    // If any number goes from 9 to 10, flash
    for (let r = 0; r < energyLevels.length; r++) {
      for (let c = 0; c < energyLevels[0].length; c++) {
        energyLevels[r][c]++;
        if (energyLevels[r][c] === 10)
          doFlash(r, c);
      }
    }

    // Reset all numbers above 9 to 0
    for (let r = 0; r < energyLevels.length; r++) {
      for (let c = 0; c < energyLevels[0].length; c++) {
        if (energyLevels[r][c] > 9)
          energyLevels[r][c] = 0;
      }
    }
  }

  return flashCount;
}

const startingEnergyLevels = parseRawInputToStartingEnergyLevels(input);

const numFlashesAfter100Steps = getNumFlashesAfterSteps(startingEnergyLevels, 100);

console.log(numFlashesAfter100Steps);