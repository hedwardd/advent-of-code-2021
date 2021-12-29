import input from './day13input';
// import input from './day13SampleInput';

type Dot = { x: number; y: number; };

type Dimension = 'x' | 'y';

type FoldInstruction = { dimension: Dimension; value: number; };

function parseRawInputToDotsAndFoldInstructions(input: string): string[] {
  return input.split('\n\n');
}

function parseRawInputByLine(input: string): string[] {
  return input.split('\n');
}

function parseRawDots(rawDots: string[]) {
  return rawDots.map(rawDot => {
    const [x, y] = rawDot.split(',');
    return { x: parseInt(x), y: parseInt(y) };
  });
}

function parseRawFoldInstructions(rawFoldInstructions: string[]): FoldInstruction[] {
  return rawFoldInstructions.map(rawFoldInstruction => {
    const [dimension, value] = rawFoldInstruction.split('fold along ')[1].split('=');
    return {
      dimension: dimension as Dimension,
      value: parseInt(value)
    };
  });
}

function getDotsAfterFolds(dots: Dot[], foldInstructions: FoldInstruction[]): Dot[] {
  const dotsAfterFolds = foldInstructions.reduce((dotsAfterFolds, foldInstruction) => {
    return getDotsAfterFold(dotsAfterFolds, foldInstruction);
  }, dots);
  // Remove any duplicates
  return dotsAfterFolds.filter((dot, index, self) =>
    index === self.findIndex(d => d.x === dot.x && d.y === dot.y)
  );
}

function getDotsAfterFold(dots: Dot[], foldInstruction: FoldInstruction): Dot[] {
  const dimension = foldInstruction.dimension;
  const value = foldInstruction.value;
  const dotsAfterFold = dots.map(dot => {
    if (dot[dimension] > value) {
      const diff = dot[dimension] - value;
      return {
        x: dimension === 'x' ? value - diff : dot.x,
        y: dimension === 'y' ? value - diff : dot.y,
      }
    } else {
      return dot;
    }
  });
  return dotsAfterFold;
}

function getMaxX(dotsAfterFolds: Dot[]) {
  return dotsAfterFolds.reduce((maxX, dot) => Math.max(maxX, dot.x), 0);
}

function getMaxY(dotsAfterFolds: Dot[]) {
  return dotsAfterFolds.reduce((maxY, dot) => Math.max(maxY, dot.y), 0);
}

function getGridWithDots(dotsAfterFolds: Dot[], EMPTY_GRID: string[][]) {
  const gridWithDots = dotsAfterFolds.reduce((gridWithDots, dot) => {
    gridWithDots[dot.y][dot.x] = '#';
    return gridWithDots;
  }, EMPTY_GRID);
  return gridWithDots;
}

const [rawDotInput, rawFoldInstructionInput] = parseRawInputToDotsAndFoldInstructions(input);

const rawDots = parseRawInputByLine(rawDotInput);
const rawFoldInstructions = parseRawInputByLine(rawFoldInstructionInput);
// console.log(rawDots);
// console.log(rawFoldInstructions);

const dots: Dot[] = parseRawDots(rawDots);
const foldInstructions: FoldInstruction[] = parseRawFoldInstructions(rawFoldInstructions);
// console.log(dots);
// console.log(foldInstructions);

const dotsAfterFolds = getDotsAfterFolds(dots, foldInstructions);
// console.log(dotsAfterFirstFold);

const maxX = getMaxX(dotsAfterFolds);
const maxY = getMaxY(dotsAfterFolds);
// console.log(maxX, maxY);

const EMPTY_GRID: string[][] = Array(maxY + 1).fill('').map(() => Array(maxX + 1).fill('.'));

const gridWithDots = getGridWithDots(dotsAfterFolds, EMPTY_GRID);

console.table(gridWithDots);

