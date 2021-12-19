import input from './day4input';
// import input from './day4SampleInput';

/* Approaches

  1. Store the values of each row and column in arrays or objects
  2. Create 2D arrays and store a) the values and b) whether they have been "called"
  3. Store the values of each row and column in tuple of original values and objects of values not called (to easily check when it's "completed")
  4. Store the values called so far, check each row and column to see if all values have been stored so far
*/

type Board = number[][];

// Parse the input
const splitInput = splitInputByBlankLines(input);

// Separate the numbers to be called and the boards
const callNumbers = splitInput[0].split(',').map(number => parseInt(number, 10));
const boardStrings = splitInput.slice(1);

// Convert the board strings to 2D arrays
const boards: Board[] = boardStrings.map(boardString => {
  return boardString.split('\n').map(row => row.trim().split(/\s+/).map(number => parseInt(number)));
});

// Create an set to store numbers called so far
const numbersCalled = new Set<number>();

function splitInputByBlankLines(input: string): string[] {
  return input.split('\n\n');
}

function checkBoardForWinningBoard(board: Board, numbersCalled: Set<number>): Board | null {
  // Check rows
  // If every number in a row has been called, return the board
  // console.log('Checking board: ');
  // console.table(board);
  for (let row of board) {
    const allNumbersCalled = row.every(number => numbersCalled.has(number));
    if (allNumbersCalled) {
      console.log(`All numbers in row ${row} have been called`);
      return board;
    }
  }
  // Check columns
  // If every number in a column has been called, return the board
  for (let c = 0; c < board[0].length; c++) {
    for (let r = 0; r < board.length; r++) {
      const number = board[r][c];
      // console.log(`Checking column ${c}, row ${r} for number ${number}`);
      const numberCalled = numbersCalled.has(number);
      if (!numberCalled) {
        break;
      }
      if (r === board[0].length - 1) {
        console.log(`All numbers in column ${c} have been called`);
        return board;
      }
    }
  }
  return null;
}

function getSumOfNumbersNotCalled(winningBoard: Board, numbersCalled: Set<number>): number {
  let sumOfNumbersNotCalled = 0;
  for (let row of winningBoard) {
    for (let number of row) {
      if (!numbersCalled.has(number)) {
        sumOfNumbersNotCalled += number;
      }
    }
  }
  return sumOfNumbersNotCalled;
}

function calculateWinningScore(sumOfNumbersNotCalled: number, currentNumberCalled: number) {
  // Multiply sum by last number called
  return sumOfNumbersNotCalled * currentNumberCalled;
}

function printWinningScoreOfLastBoard(): void {
  // Go through the numbers to be called and process each board
  // console.log('Processing boards...');
  // console.log(`There are ${boards.length} boards`);
  // console.log(`There are ${callNumbers.length} numbers to be called`);
  // console.log(`The boards are:`);
  // console.log(boards);
  let remainingBoards = boards;
  let lastWinningBoard: Board | null = null;
  for (let i = 0; i < callNumbers.length; i++) {
    const currentNumberCalled = callNumbers[i];
    // console.log(`Processing number ${currentNumberCalled}`);
    numbersCalled.add(currentNumberCalled);
    // console.log(`Numbers called so far: ${[...numbersCalled].join(', ')}`);
    // Filter out boards that win until there's only one left
    if (remainingBoards.length > 1) {
      remainingBoards = remainingBoards.filter(board => checkBoardForWinningBoard(board, numbersCalled) === null);
    } else {
      // Go until last board wins
      const lastWinningBoard = checkBoardForWinningBoard(remainingBoards[0], numbersCalled);
      // Once last winning board is found, get sum of numbers that weren't called
      if (lastWinningBoard !== null) {
        console.log(`The winning board is: `);
        console.table(lastWinningBoard);
        const sumOfNumbersNotCalled = getSumOfNumbersNotCalled(lastWinningBoard, numbersCalled);
        console.log(`The sum of numbers not called is ${sumOfNumbersNotCalled}`);
        const winningScore = calculateWinningScore(sumOfNumbersNotCalled, currentNumberCalled);
        console.log(`The winning score of the last board to win is ${winningScore}`);
        break;
      }
    }
  }
}

printWinningScoreOfLastBoard();