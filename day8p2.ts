import input from './day8input';
// import input from './day8SampleInput';
// import input from './day8SampleInput2';

type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

type SignalMapping = {
  [key: string]: Digit;
}

type ReverseSignalMapping = {
  [key in Digit]?: string;
};

function parseRawInputToSignalPatternsAndOutputValues(input: string): string[][] {
  return input.split('\n').map(line => line.split(' | '));
}

function getSignalMapping(inputSignalPatterns: string) {
  const signalPatterns = inputSignalPatterns.split(' ');
  const signalMapping: SignalMapping = {};
  const reverseSignalMapping: ReverseSignalMapping = {};

  // Map the signal patterns of easy digits: 1, 4, 7, and 8
  signalPatterns.forEach(signalPattern => {
    if (signalPattern.length === 2) {
      signalMapping[signalPattern] = '1';
      reverseSignalMapping['1'] = signalPattern;
    }
    if (signalPattern.length === 3) {
      signalMapping[signalPattern] = '7';
      reverseSignalMapping['7'] = signalPattern;
    }
    if (signalPattern.length === 4) {
      signalMapping[signalPattern] = '4';
      reverseSignalMapping['4'] = signalPattern;
    }
    if (signalPattern.length === 7) {
      signalMapping[signalPattern] = '8';
      reverseSignalMapping['8'] = signalPattern;
    }
  });

  // Get 6 using the signal pattern of 1 
  // look for the pattern that has a length of 6 and is missing one character from 1
  signalPatterns.forEach(signalPattern => {
    if (signalPattern.length === 6
      && reverseSignalMapping['1']?.split('').some(char => !signalPattern.includes(char))
      && reverseSignalMapping['1']?.split('').some(char => signalPattern.includes(char))) {
      signalMapping[signalPattern] = '6';
      reverseSignalMapping['6'] = signalPattern;
    }
  });

  // Get 3 using the signal pattern of 1
  // look for the pattern that has a length of 5 and contains both characters from 1
  signalPatterns.forEach(signalPattern => {
    if (signalPattern.length === 5
      && reverseSignalMapping['1']?.split('').every(char => signalPattern.includes(char))) {
      signalMapping[signalPattern] = '3';
      reverseSignalMapping['3'] = signalPattern;
    }
  });

  // Get 5
  // Look for the pattern that has a length of 5, is missing one character from 6, and isn't 3
  const charactersInSix = reverseSignalMapping['6']!.split('');
  signalPatterns.forEach(signalPattern => {
    if (signalPattern.length === 5
      && charactersInSix.reduce((acc, curr) => signalPattern.includes(curr) ? acc : acc + 1, 0) === 1
      && signalPattern !== reverseSignalMapping['3']) {
        signalMapping[signalPattern] = '5';
        reverseSignalMapping['5'] = signalPattern;
    }
  });
    
  // Get 2
  // Look for the pattern that has a length of 5 and hasn't been mapped yet
  signalPatterns.forEach(signalPattern => {
    if (signalPattern.length === 5
      && !signalMapping[signalPattern]) {
        signalMapping[signalPattern] = '2';
        reverseSignalMapping['2'] = signalPattern;
    }
  });
    
  // Get 9
  // Look for the pattern that has a length of 6 and contains all characters from 4
  const charactersInFour = reverseSignalMapping['4']!.split('');
  signalPatterns.forEach(signalPattern => {
    if (signalPattern.length === 6
      && charactersInFour.every(char => signalPattern.includes(char))) {
        signalMapping[signalPattern] = '9';
        reverseSignalMapping['9'] = signalPattern;
    }
  });
    
  // Get 0
  // Look for the pattern that hasn't been mapped yet
  signalPatterns.forEach(signalPattern => {
    if (!signalMapping[signalPattern]) {
      signalMapping[signalPattern] = '0';
      reverseSignalMapping['0'] = signalPattern;
    }
  });
  
  return signalMapping;
}

// Use the hash to deduce the corresponding output values
function getCalculatedValueFromSignalMappingsAndOutput(signalMapping: SignalMapping, outputValue: string) {
  function digitFromEncodedDigit(encodedDigit: string) {
    for (const signalPattern in signalMapping) {
      if (encodedDigit.split('').every(char => signalPattern.includes(char))
      && signalPattern.split('').every(char => encodedDigit.includes(char)) ) {
        return signalMapping[signalPattern];
      }
    }
  }
  const splitOutputValue = outputValue.split(' ');
  const digitsFromEncodedDigits = splitOutputValue.map(digitFromEncodedDigit);
  const joinedDigits = digitsFromEncodedDigits.join('');
  const numberFromJoinedDigits = parseInt(joinedDigits, 10);
  return numberFromJoinedDigits;
}


// Approach: Deduce the corresponding signal patterns by process of elimination

// Parse the input in signal patterns and output values
const rawInputSignalPatternsAndOutputValues = parseRawInputToSignalPatternsAndOutputValues(input);

// Create a hash mapping the signal patterns to digits
const calculatedOutputValues = rawInputSignalPatternsAndOutputValues.map(([signalPattern, outputValue]) => {
  const signalMapping = getSignalMapping(signalPattern);
  const calculatedValue = getCalculatedValueFromSignalMappingsAndOutput(signalMapping, outputValue);
  return calculatedValue;
});

// Calculate the sum of the output values
const sumOfCalculatedOutputValues = calculatedOutputValues.reduce((acc, curr) => acc + curr, 0);

console.log(sumOfCalculatedOutputValues);
