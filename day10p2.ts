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
  [key in OpeningBracket]: number;
} = {
  '(': 1,
  '[': 2,
  '{': 3,
  '<': 4,
}

function parseRawInputToBracketArrays(input: string): Bracket[][] {
  return input.split('\n').map(line => line.split('')) as Bracket[][];
}

function isBracketArrayIncomplete(bracketArray: Bracket[]): boolean {
  const stack: BracketStack = [];
  // console.log(`bracketArray: ${JSON.stringify(bracketArray)}`);
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
          return false;
        }
        break;
    }
  }
  return true;
}

function incompleteBracketToScore(bracketArray: Bracket[]): number {
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
        break;
    }
  }
  const score = getScoreFromStack(stack as OpeningBracket[]);
  return score;
}

// Start with a total score of 0. Then, for each character, multiply the total score by 5 and then increase the total score by the point value given for the character in the following table:
function getScoreFromStack(stack: OpeningBracket[]): number {
  return stack.reduceRight((total, curr: OpeningBracket) => total * 5 + (CORRESPONDING_SCORES[curr]), 0);
}

const bracketArrays: Bracket[][] = parseRawInputToBracketArrays(input);

// Filter out corrupt arrays
const incompleteBracketArrays = bracketArrays.filter(isBracketArrayIncomplete);

// Map rest to scores
const incompleteScores = incompleteBracketArrays.map(incompleteBracketToScore);

// Sort scores
const sortedScores = incompleteScores.sort((a, b) => a - b);

// Return miiddle score
const middleIndex = Math.floor(sortedScores.length / 2);
const middleScore = sortedScores[middleIndex];

console.log(middleScore);
