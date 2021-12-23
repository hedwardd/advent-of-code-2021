// import input from './day4input';
import input from './day4SampleInput';
const sampleOutput = 5;

// Parse the input
const splitInput = splitInputByBlankLines(input);

function splitInputByBlankLines(input: string): string[] {
  return input.split('\n\n');
}
