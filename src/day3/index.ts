import { test, readInput, readExample } from '../utils/index';

const prepareInput = (rawInput: string) => {
  const parsed = rawInput.split('\n').filter(Boolean);

  return parsed;
};

const input = prepareInput(readInput());
const example = prepareInput(readExample());

const goA = (input: string[]) => {
  let occurrences = Array(input[0].length).fill(0);

  input.forEach((binaryString) => {
    [...binaryString].forEach((char, charIndex) => {
      if (char === '1') {
        occurrences[charIndex] += 1;
      }
    });
  });

  const gammaArray = occurrences.map((occurrence) => {
    return occurrence > input.length / 2 ? 1 : 0;
  });

  const epsilonArray = occurrences.map((occurrence) => {
    return occurrence < input.length / 2 ? 1 : 0;
  });

  const gamma = parseInt(gammaArray.join(''), 2);
  const epsilon = parseInt(epsilonArray.join(''), 2);

  return gamma * epsilon;
};

const goB = (input: string[]) => {
  let oxArray = [...input];
  let coArray = [...input];

  for (let i = 0; i < input.length; i++) {
    if (oxArray.length > 1) {
      // Find most common bit
      let occurrence = oxArray.reduce((value, entry) => {
        return entry[i] === '1' ? value + 1 : value;
      }, 0);

      const filterChar = occurrence < oxArray.length / 2 ? '0' : '1';

      oxArray = oxArray.filter((value) => {
        return value[i] === filterChar;
      });
    }

    if (coArray.length > 1) {
      // Find most common bit
      let occurrence = coArray.reduce((value, entry) => {
        return entry[i] === '1' ? value + 1 : value;
      }, 0);

      const filterChar = occurrence < coArray.length / 2 ? '1' : '0';

      coArray = coArray.filter((value) => {
        return value[i] === filterChar;
      });
    }
  }

  const co = parseInt(coArray[0], 2);
  const ox = parseInt(oxArray[0], 2);

  return co * ox;
};

/* Tests */

const exampleA = goA(example);
const exampleB = goB(example);

console.log('Example part 1:', exampleA);
console.log('Example part 2:', exampleB);

/* Results */

console.time('Time');
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd('Time');

console.log('Solution to part 1:', resultA);
console.log('Solution to part 2:', resultB);
