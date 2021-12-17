import input from './day3input';
// import input from './day3sampleInput';

type BitCount = [
  zeroCount: number,
  oneCount: number,
];

type BitCounts = BitCount[];

type Bit = '0' | '1';
type Bits = Bit[];

const inputStringsFromInput = (input: string): string[] => input.split('\n');

const bitsFromString = (string: string): Bits => string.split('') as Bits;

const listsOfBitsFromInputStrings = (strings: string[]) => strings.map(bitsFromString);

const getNewBitCounts = (bitCounts: BitCounts, bits: Bits): BitCounts => {
  return bitCounts.map((bitCount, i) => getNewBitCount(bitCount, bits[i]));
}

const getNewBitCount = (bitCount: BitCount, bit: Bit): BitCount => {
  return bit === '0'
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

const mostCommonBit = (bitCount: BitCount) => bitCount[0] > bitCount[1] ? '0' : '1';

const mostCommonBitsFromTotalCounts = (totalCounts: BitCounts) : Bits => totalCounts.map(mostCommonBit);

const reverseBits = (bits: Bits) => bits.map(bit => bit === '0' ? '1' : '0');

function getFilteredStringFromListsOfBits(listsOfBits: Bits[], isReversed: boolean): string {
  let filteredStrings = [...listsOfBits];
  let filterIndex = 0;
  while (filteredStrings.length > 1) {
    const totalCounts = getTotalCounts(filteredStrings);
    const mostCommonBits = mostCommonBitsFromTotalCounts(totalCounts);
    const commonBits = isReversed ? reverseBits(mostCommonBits) : mostCommonBits;

    filteredStrings = filteredStrings.filter((string) => {
      return string[filterIndex] === commonBits[filterIndex];
    });
    filterIndex++;
  }
  return filteredStrings[0].join('');
}

function getOxygenGeneratorRating(listsOfBits: Bits[]) {
  const filteredString = getFilteredStringFromListsOfBits(listsOfBits, false);
  console.log('oxygen filtered string: ' + filteredString);
  return parseInt(filteredString, 2);
}

function getCO2ScrubberRating(listsOfBits: Bits[]) {
  const filteredString = getFilteredStringFromListsOfBits(listsOfBits, true);
  console.log('co2 filtered string: ' + filteredString);
  return parseInt(filteredString, 2);
}

const getLifeSupportRating = (oxygenGeneratorRating: number, co2ScrubberRatering: number) => oxygenGeneratorRating * co2ScrubberRatering;

const inputStrings = inputStringsFromInput(input);
// console.log('inputStrings: ' + inputStrings);

const listsOfBits = listsOfBitsFromInputStrings(inputStrings);
// console.log('listsOfBits: ' + listsOfBits);

const oxygenGeneratorRating = getOxygenGeneratorRating(listsOfBits);

console.log(oxygenGeneratorRating);

const CO2ScrubberRating = getCO2ScrubberRating(listsOfBits);

console.log(CO2ScrubberRating);

const lifeSupportRating = getLifeSupportRating(oxygenGeneratorRating, CO2ScrubberRating);

console.log(lifeSupportRating);
