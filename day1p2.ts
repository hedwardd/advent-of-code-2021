import input from './day1input';

function processInput(input: string): string[] {
  return input.split('\n');
}

function mapStringsToInts(input: string[]): number[] {
  return input.map(s => parseInt(s));
}

function numberOfDepthTimesIncreased(depths: number[]): number {
  let prevSum = 0;

  return depths.reduce((count, currDepth, i) => {
    if (i < 3) {
      prevSum = prevSum + currDepth;
      return count;
    };

    const currSum = prevSum - depths[i - 3] + currDepth;
    const isGreater = currSum > prevSum;
    prevSum = currSum;

    return (isGreater) ? count + 1 : count;
  }, 0)
}

const inputAsStrings = processInput(input);
const depths = mapStringsToInts(inputAsStrings);
const output = numberOfDepthTimesIncreased(depths);
console.log(output);