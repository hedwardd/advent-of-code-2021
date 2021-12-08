import input from './day1input';

function processInput(input: string): string[] {
  return input.split('\n');
}

function mapStringsToInts(input: string[]): number[] {
  return input.map(s => parseInt(s));
}

function numberOfDepthTimesIncreased(depths: number[]): number {
  return depths.reduce((count, curr, i) => {
    if (i === 0) return 0;
    return (curr > depths[i - 1]) ? count + 1 : count;
  }, 0)
}

const inputAsStrings = processInput(input);
const depths = mapStringsToInts(inputAsStrings);
const output = numberOfDepthTimesIncreased(depths);
console.log(output);