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

function getDotsAfterFirstFold(dots: Dot[], foldInstructions: FoldInstruction[]): Dot[] {
  const firstFoldInstruction = foldInstructions[0];
  const dimension = firstFoldInstruction.dimension;
  const value = firstFoldInstruction.value;
  const dotsAfterFirstFold = dots.map(dot => {
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
  // Remove any duplicates
  return dotsAfterFirstFold.filter((dot, index, self) =>
    index === self.findIndex(d => d.x === dot.x && d.y === dot.y)
  );
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

const dotsAfterFirstFold = getDotsAfterFirstFold(dots, foldInstructions);
// console.log(dotsAfterFirstFold);

const answer = dotsAfterFirstFold.length;
console.log(answer);
