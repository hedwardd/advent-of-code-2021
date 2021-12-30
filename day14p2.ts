import input from './day14input';
// import input from './day14SampleInput';

interface InsertionRules {
  [key: string]: string;
}

interface PairCounts {
  [key: string]: number;
}

interface ElementCounts {
  [key: string]: number;
}

function parseRawInputToPairCountsInsertionRulesAndFirstAndLastElems(input: string): [PairCounts, InsertionRules, string, string] {
  const [rawTemplate, rawRules] = input.split('\n\n');

  const pairCounts = rawTemplate.split('').reduce((acc, elem, i, self) => {
    if (i < self.length - 1) {
      const pair = `${elem}${self[i + 1]}`;
      acc[pair] = (acc[pair] || 0) + 1;
    }
    return acc;
  }, {} as PairCounts);

  const rules = rawRules.split('\n').reduce((acc, rule) => {
    const [pattern, result] = rule.split(' -> ');
    acc[pattern] = result;
    return acc;
  }, {} as InsertionRules);

  const firstElem = rawTemplate.split('')[0];
  const lastElem = rawTemplate.split('').reverse()[0];

  return [pairCounts, rules, firstElem, lastElem];
}

function getPairCountsAfterSteps(pairCounts: PairCounts, rules: InsertionRules, steps: number): PairCounts {
  let newPairCounts = { ...pairCounts };
  for (let i = 0; i < steps; i++) {
    newPairCounts = Object.entries(newPairCounts).reduce((acc, pairCount) => {
      const [pair, count] = pairCount;
      const newElem = rules[pair]!;
      const pairElems = pair.split('');
      const [firstElem, secondElem] = pairElems;
      const newPair1 = `${firstElem}${newElem}`;
      const newPair2 = `${newElem}${secondElem}`;
      acc[newPair1] = (acc[newPair1] || 0) + count;
      acc[newPair2] = (acc[newPair2] || 0) + count;

      return acc;

    }, {} as PairCounts);
  }
  return newPairCounts;
}

function getElemCountsFromPairCounts(pairCounts: PairCounts, firstElem: string, lastElem: string): ElementCounts {
  const originalElemCounts = Object.entries(pairCounts).reduce((acc, pairCount) => {
    const [pair, count] = pairCount;
    const pairElems = pair.split('');
    const [firstElem, secondElem] = pairElems;
    acc[firstElem] = (acc[firstElem] || 0) + count;
    acc[secondElem] = (acc[secondElem] || 0) + count;
    return acc;
  }, {} as ElementCounts);

  const actualElemCounts = Object.entries(originalElemCounts).reduce((acc, elemCount) => {
    const [elem, count] = elemCount;
    acc[elem] =
      (elem === firstElem || elem === lastElem)
        ? (count - 1) / 2 + 1
        : count / 2;
    return acc;
  }, {} as ElementCounts);

  return actualElemCounts;
}

function getMostCommonElemQuantity(elemCounts: ElementCounts) {
  const elemQuantities = Object.values(elemCounts);
  const mostCommonElemQuantity = Math.max(...elemQuantities);
  return mostCommonElemQuantity;
}

function getLeastCommonElemQuantity(elemCounts: ElementCounts) {
  const elemQuantities = Object.values(elemCounts);
  const leastCommonElemQuantity = Math.min(...elemQuantities);
  return leastCommonElemQuantity;
}

// Approach: Create a hash of existing pair counts, figure out which pairs are created by the rules, and add them to the hash.

const [pairCounts, rules, firstElem, lastElem] = parseRawInputToPairCountsInsertionRulesAndFirstAndLastElems(input);
// console.log(pairCounts);
// console.log(rules);
// console.log(firstElem);
// console.log(lastElem);

const pairCountsAfterFortySteps = getPairCountsAfterSteps(pairCounts, rules, 40);
// console.log(pairCountsAfterFortySteps);

const elemCounts = getElemCountsFromPairCounts(pairCountsAfterFortySteps, firstElem, lastElem);
const mostCommonElemQuantity = getMostCommonElemQuantity(elemCounts);
const leastCommonElemQuantity = getLeastCommonElemQuantity(elemCounts);
// console.log(mostCommonElemQuantity);
// console.log(leastCommonElemQuantity);

const diffOfMostAndLeastCommonElems = mostCommonElemQuantity - leastCommonElemQuantity;
console.log(diffOfMostAndLeastCommonElems);
