import input from './day3input';

const inputStringsFromInput = (input: string): string[] => input.split('\n');

/* Approaches

  1. Store the values of each row and column in arrays or objects
  2. Create 2D arrays and store a) the values and b) whether they have been "called"
  3. Store the values of each row and column in tuple of original values and objects of values not called (to easily check when it's "completed")
  4. Store the values called so far, check each row and column to see if all values have been stored so far
*/

// Parse the input
// Separate the numbers to be called and the boards
// Create an object to store numbers called so far
// Go through the numbers to be called and process each board
// Check each row and column to see if every value is in called numbers map
// Once winning board is found, get sum of numbers that weren't called
// Multiply sum by last number called

