import input from './day10input';
// import input from './day10SampleInput';

type OpeningBracket = '{' | '(' | '[' | '<';

type ClosingBracket = '}' | ')' | ']' | '>';

type Bracket = OpeningBracket | ClosingBracket;

type BracketStack = Bracket[];

const CORRESPONDING_BRACKETS: {
  [key in ClosingBracket]: OpeningBracket;
} = {
  '}': '{',
  ')': '(',
  ']': '[',
  '>': '<',
}

const CORRESPONDING_SCORES: {
  [key in ClosingBracket]: number;
} = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
}

function parseRawInputToBracketArrays(input: string): Bracket[][] {
  return input.split('\n').map(line => line.split('')) as Bracket[][];
}

function bracketArrayToErrorScore(bracketArray: Bracket[]): number {
  const stack: BracketStack = [];
  // console.log(`bracketArray: ${JSON.stringify(bracketArray)}`);
  // console.log(`bracketCount: ${JSON.stringify(bracketCount)}`);
  for (let i = 0; i < bracketArray.length; i++) {
    const char = bracketArray[i];
    // console.log(`stack: ${JSON.stringify(stack)}`);
    // console.log(`char: ${char}`);
    switch (char) {
      case '{':
      case '(':
      case '[':
      case '<':
        stack.push(char);
        break;
      case '}':
      case ')':
      case ']':
      case '>':
        const lastBracket = stack.pop();
        if (lastBracket === undefined || lastBracket !== CORRESPONDING_BRACKETS[char]) {
          return CORRESPONDING_SCORES[char];
        }
        break;
    }
  }
  return 0;
}

const bracketArrays: Bracket[][] = parseRawInputToBracketArrays(input);

const errorScores = bracketArrays.map(bracketArrayToErrorScore);

// console.log(errorScores);

const totalSyntaxErrorScore = errorScores.reduce((sum, score) => score + sum, 0);

console.log(totalSyntaxErrorScore);
