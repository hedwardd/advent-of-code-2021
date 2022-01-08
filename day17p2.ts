import input from './day17input';
// import input from './day17SampleInput';

type Position = [number, number];
type Velocity = [number, number];
type State = [Position, Velocity];
type Minimum = number;
type Maximum = number;
type Range = [Minimum, Maximum];
type TargetArea = [xRange: Range, yRange: Range];

const STARTING_POINT = [0, 0];

// example input: "target area: x=20..30, y=-10..-5"
function parseRawInputToTargetArea(input: string): TargetArea {
  const ranges = input.split(': ');
  const [xRangeString, yRangeString] = ranges[1].split(', ');
  const xRange = parseRange(xRangeString);
  const yRange = parseRange(yRangeString);

  return [xRange, yRange];
}

function parseRange(rangeString: string): Range {
  return rangeString.slice(2).split('..').map(Number) as Range;
}

function getNextState([[xPosition, yPosition], [xVelocity, yVelocity]]: State): State {
  const nextXPosition = xPosition + xVelocity;
  const nextYPosition = yPosition + yVelocity;
  // xVelocity approaches 0, yVelocity constantly decreases
  const nextXVelocity =
    xVelocity > 0
      ? xVelocity - 1
      : xVelocity < 0
        ? xVelocity + 1
        : xVelocity;
  const nextYVelocity = yVelocity - 1;
  return [[nextXPosition, nextYPosition], [nextXVelocity, nextYVelocity]];
}

function doesStartingVelocityEnterTargetArea(startingVelocity: Velocity, targetArea: TargetArea): boolean {
  const [xRange, yRange] = targetArea;
  const [minX, maxX] = xRange;
  const [minY, maxY] = yRange;
  let currentPosition: Position = [0, 0];
  let [currentXPosition, currentYPosition] = currentPosition;
  let currentState: State = [currentPosition, startingVelocity];
  while (currentXPosition <= maxX && currentYPosition >= minY) {
    currentState = getNextState(currentState);
    currentPosition = currentState[0];
    [currentXPosition, currentYPosition] = currentPosition;
    if (currentXPosition >= minX && currentXPosition <= maxX && currentYPosition <= maxY && currentYPosition >= minY) {
      return true;
    }
  }
  return false;
}

/* Approaches:
  1. Get an initial estimate, try different trajectories, try to maximize for altitude
  2. Work backwards to create functions that will go through, find the one with max alt
  3. Brute force: find one that works, try every possible value +/- 1000
  4. Try different trajectories, updating x or y based on whether overshooting/undershooting
*/

const targetArea = parseRawInputToTargetArea(input);
// console.log(targetArea);

let uniqueCount = 0;

// Bruce force
for (let xVelocity = 0; xVelocity <= targetArea[0][1]; xVelocity++) {
  for (let yVelocity = targetArea[1][0]; yVelocity <= 1000; yVelocity++) {
    const startingVelocityEntersTargetArea = doesStartingVelocityEnterTargetArea([xVelocity, yVelocity], targetArea);
    if (startingVelocityEntersTargetArea) {
      uniqueCount++;
    }
  }
}

console.log(uniqueCount)