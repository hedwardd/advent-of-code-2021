import input from './day3input';

type BitCount = [
  zeroCount: number,
  oneCount: number,
];

type BitCounts = BitCount[];

type Bit = 0 | 1;
type Bits = Bit[];

const inputStringsFromInput = (input: string): string[] => input.split('\n');

const bitsFromString = (string: string): Bits => string.split('').map(char => parseInt(char) as Bit);

const listsOfBitsFromInputStrings = (strings: string[]) => strings.map(bitsFromString);

const getNewBitCounts = (bitCounts: BitCounts, bits: Bits): BitCounts => {
  return bitCounts.map((bitCount, i) => getNewBitCount(bitCount, bits[i]));
}

const getNewBitCount = (bitCount: BitCount, bit: Bit): BitCount => {
  return bit === 0
    ? [bitCount[0] + 1, bitCount[1]]
    : [bitCount[0], bitCount[1] + 1];
}

const getTotalCounts = (listsOfBits: Bits[]): BitCounts => {
  let startCounts: BitCounts = [];
  for (let _ of listsOfBits[0]) {
    startCounts.push([0, 0] as BitCount);
  }
  return listsOfBits.reduce(getNewBitCounts, startCounts);
}

const moreCommonBit = (bitCount: BitCount) => bitCount[0] >= bitCount[1] ? 0 : 1;

const mostCommonBitsFromTotalCounts = (totalCounts: BitCounts) : Bits => totalCounts.map(moreCommonBit);

const gammaRateFromMostCommonBits = (mostCommonBits: Bits): number => parseInt(mostCommonBits.join(''), 2);

const epsilonRateFromLeastCommonBits = (leastCommonBits: Bits): number => parseInt(leastCommonBits.join(''), 2);

const reverseBits = (bits: Bits) => bits.map(bit => bit === 0 ? 1 : 0);

const powerConsumption = (gammaRate: number, epsilonRate: number) => gammaRate * epsilonRate;

const inputStrings = inputStringsFromInput(input);
// console.log('inputStrings: ' + inputStrings);
const listsOfBits = listsOfBitsFromInputStrings(inputStrings);
// console.log('listsOfBits: ' + listsOfBits);
const totalCounts = getTotalCounts(listsOfBits);
// console.log('totalCounts: ' + totalCounts);
const mostCommonBits = mostCommonBitsFromTotalCounts(totalCounts);
// console.log('mostCommonBits: ' + mostCommonBits);
const gammaRate = gammaRateFromMostCommonBits(mostCommonBits);
// console.log('gammaRate: ' + gammaRate);
const leastCommonBits = reverseBits(mostCommonBits);
// console.log('leastCommonBits: ' + leastCommonBits);
const epsilonRate = epsilonRateFromLeastCommonBits(leastCommonBits);
// console.log('epsilonRate: ' + epsilonRate);
const output = powerConsumption(gammaRate, epsilonRate);
console.log(output);
