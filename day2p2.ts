import input from './day2input';

type Direction =
| 'forward'
| 'down'
| 'up'
;

type Amount = number;
type HorizontalPosition = number;
type Depth = number;
type Aim = number;

type Command = [
  Direction,
  Amount,
]

type Position = [
  HorizontalPosition,
  Depth,
  Aim,
]

function processInput(input: string): string[] {
  return input.split('\n');
}

function inputStringToCommand(inputString: string): Command {
  const splitInput = inputString.split(' ');
  return [splitInput[0] as Direction, parseInt(splitInput[1])];
}

function inputStringsToCommands(inputStrings: string[]): Command[] {
  return inputStrings.map(inputStringToCommand);
}

function newPositionAfterCommand(currentPosition: Position, command: Command): Position {
  const [direction, amount] = command;
  const [horizontalPos, depth, aim] = currentPosition;
  switch (direction) {
    case 'up':
      return [horizontalPos, depth, aim - amount];
      case 'down':
      return [horizontalPos, depth, aim + amount];
    case 'forward':
      return [horizontalPos + amount, depth + aim * amount, aim];
    default:
      throw new Error('Unhandled direction.');
  }
}

function commandsToFinalPosition(commands: Command[]): Position {
  const startingPosition: Position = [0, 0, 0];
  return commands.reduce(newPositionAfterCommand, startingPosition);
}

function finalPositionToOutput(finalPosition: Position): number {
  const [horizontalPos, depth] = finalPosition;
  return horizontalPos * depth;
}

const inputStrings = processInput(input);
const commands = inputStringsToCommands(inputStrings);
const finalPosition: Position = commandsToFinalPosition(commands);
const output = finalPositionToOutput(finalPosition);
console.log(output);

