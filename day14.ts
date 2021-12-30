import input from './day14input';
// import input from './day14SampleInput';

interface InsertionRules {
  [key: string]: string;
}

interface ElementCounts {
  [key: string]: number;
}

function parseRawInputToTemplateAndInsertionRules(input: string): [string[], InsertionRules] {
  const [rawTemplate, rawRules] = input.split('\n\n');

  const template = rawTemplate.split('');
  const rules = rawRules.split('\n').reduce((acc, rule) => {
    const [pattern, result] = rule.split(' -> ');
    acc[pattern] = result;
    return acc;
  }, {} as InsertionRules);

  return [template, rules];
}

function getResultAfterSteps(template: string[], rules: InsertionRules, steps: number): string[] {
  for (let i = 0; i < steps; i++) {
    template = template.reduce((acc, elem, index) => {
      const nextElem = template[index + 1];
      if (nextElem) {
        const newElem = rules[`${elem}${nextElem}`]!;
        acc.push(elem, newElem);
        return acc;
      }
      acc.push(elem);
      return acc;

    }, [] as string[]);
  }
  return template;
}

function getElemCounts(resultAfterTenSteps: string[]) {
  return resultAfterTenSteps.reduce((acc, elem) => {
    acc[elem] = (acc[elem] || 0) + 1;
    return acc;
  }, {} as ElementCounts);
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

const [template, rules] = parseRawInputToTemplateAndInsertionRules(input);
// console.log(template);
// console.log(rules);

const resultAfterTenSteps = getResultAfterSteps(template, rules, 10);
// console.log(resultAfterTenSteps.length);

const elemCounts = getElemCounts(resultAfterTenSteps);
const mostCommonElemQuantity = getMostCommonElemQuantity(elemCounts);
const leastCommonElemQuantity = getLeastCommonElemQuantity(elemCounts);
// console.log(mostCommonElemQuantity);
// console.log(leastCommonElemQuantity);

const diffOfMostAndLeastCommonElems = mostCommonElemQuantity - leastCommonElemQuantity;
console.log(diffOfMostAndLeastCommonElems);


