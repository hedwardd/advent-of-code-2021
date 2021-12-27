import input from './day8input';
// import input from './day8SampleInput';

function parseRawInputToSignalPatternsAndOutputValues(input: string): string[][] {
  return input.split('\n').map(line => line.split(' | '));
}

function getOutputValues(rawInputSignalPatternsAndOutputValues: string[][]): string[][] {
  return rawInputSignalPatternsAndOutputValues.map(curr => curr[1].split(' '));
}


function getCountOfUniqueNumberSegments(outputValues: string[][]) {
  return outputValues.reduce((acc, curr) => acc + getCountOfUniqueNumberSegmentsFromOutputValue(curr), 0);
}

function getCountOfUniqueNumberSegmentsFromOutputValue(outputValue: string[]) {
  return outputValue.reduce((acc, curr) =>  isNumberSegmentUnique(curr) ? acc + 1 : acc, 0);
}

function isNumberSegmentUnique(numberSegment: string): boolean {
  return numberSegment.length === 2
  || numberSegment.length === 3
  || numberSegment.length === 4
  || numberSegment.length === 7;
}

const rawInputSignalPatternsAndOutputValues = parseRawInputToSignalPatternsAndOutputValues(input);

const outputValues = getOutputValues(rawInputSignalPatternsAndOutputValues);

// Count the number of items in the output values with length 2, 4, 3, or 7
const countOfUniqueNumberSegments = getCountOfUniqueNumberSegments(outputValues);

console.log(countOfUniqueNumberSegments);