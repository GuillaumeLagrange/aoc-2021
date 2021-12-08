import { test, readInput, readExample } from '../utils/index';

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

interface Mapping {
  a: string;
  b: string;
  c: string;
  d: string;
  e: string;
  f: string;
  g: string;
}

const numberStrings = [
  'abcefg',
  'cf',
  'acdeg',
  'acdfg',
  'bcdf',
  'abdfg',
  'abdefg',
  'acf',
  'abcdefg',
  'abcdfg',
];

interface Entry {
  sortedDigits: string[];
  digits: {
    '2': string;
    '3': string;
    '4': string;
    '5': string[];
    '6': string[];
    '7': string;
  };
  screen: string[];
}

const prepareInput = (rawInput: string) => {
  const parsedInput = rawInput
    .trim()
    .split('\n')
    .map((line) => {
      const splitLine = line.split(' | ');
      const sortedDigits = splitLine[0].split(' ').sort((a, b) => {
        return a.length === b.length ? a.localeCompare(b) : a.length - b.length;
      });
      return {
        sortedDigits: sortedDigits,
        digits: {
          '2': sortedDigits[0],
          '3': sortedDigits[1],
          '4': sortedDigits[2],
          '5': sortedDigits.slice(3, 6),
          '6': sortedDigits.slice(6, 9),
          '7': sortedDigits[9],
        },
        screen: splitLine[1].split(' '),
      };
    });

  return parsedInput;
};

const input = prepareInput(readInput());
const example = prepareInput(readExample());

const goA = (input: Entry[]) => {
  return input.reduce((prevInput, line) => {
    return (
      prevInput +
      line.screen.reduce((prevLine, digit) => {
        return digit.length <= 4 || digit.length === 7
          ? prevLine + 1
          : prevLine;
      }, 0)
    );
  }, 0);
};

const findMappings = (inputLine: Entry) => {
  // Remap sides
  let mapping = {
    a: '',
    b: '',
    c: '',
    d: '',
    e: '',
    f: '',
    g: '',
  };

  // f is the only one missing in just one letter
  for (let i = 0; i < letters.length; i++) {
    let missCount = 0;
    for (let j = 0; j < inputLine.sortedDigits.length; j++) {
      if (inputLine.sortedDigits[j].indexOf(letters[i]) === -1) {
        missCount += 1;
      }
    }
    if (missCount === 1) {
      mapping[letters[i]] = 'f';
      break;
    }
  }

  // c is the other side on the only two sided number (1)
  for (let letter of inputLine.digits[2]) {
    if (mapping[letter] === '') {
      mapping[letter] = 'c';
      break;
    }
  }

  // a is the only unknown number on the three sided number (7)
  for (let letter of inputLine.digits[3]) {
    if (mapping[letter] === '') {
      mapping[letter] = 'a';
      break;
    }
  }

  // g is the only unknown common side in all five and six sided numbers (2, 5, 3, 0, 6, 9)
  for (let i = 0; i < letters.length; i++) {
    if (mapping[letters[i]]) {
      continue;
    }

    let foundCount = 0;
    let searchArray = [...inputLine.digits[5], ...inputLine.digits[6]];
    for (let j = 0; j < searchArray.length; j++) {
      if (searchArray[j].indexOf(letters[i]) !== -1) {
        foundCount += 1;
      }
    }

    if (foundCount === searchArray.length) {
      mapping[letters[i]] = 'g';
    }
  }

  // b is the only common missing in six sided numbers (0, 6, 9)
  for (let i = 0; i < letters.length; i++) {
    if (mapping[letters[i]]) {
      continue;
    }

    let foundCount = 0;
    let searchArray = [...inputLine.digits[6]];
    for (let j = 0; j < searchArray.length; j++) {
      if (searchArray[j].indexOf(letters[i]) !== -1) {
        foundCount += 1;
      }
    }

    if (foundCount === searchArray.length) {
      mapping[letters[i]] = 'b';
    }
  }

  // d is the only unknown number on the four sided number (4)
  for (let letter of inputLine.digits[4]) {
    if (mapping[letter] === '') {
      mapping[letter] = 'd';
      break;
    }
  }

  // e is the remaining unknown side
  for (let letter of letters) {
    if (mapping[letter] === '') {
      mapping[letter] = 'e';
      break;
    }
  }

  return mapping;
};

const decodeNumber = (numberString: string, mapping: Mapping) => {
  return numberString
    .split('')
    .map((letter) => {
      return mapping[letter];
    })
    .sort()
    .join('');
};

const goB = (input: Entry[]) => {
  return input.reduce((prev, line) => {
    let decodedNumbers: number[] = [];
    const mapping = findMappings(line);
    line.screen.forEach((numberString) => {
      const decodedNumber = decodeNumber(numberString, mapping);

      for (let i = 0; i < numberStrings.length; i++) {
        if (numberStrings[i] === decodedNumber) {
          decodedNumbers.push(i);
        }
      }
    });

    return prev + Number(decodedNumbers.join(''));
  }, 0);
};

/* Tests */

const onlyTests = false;

const exampleA = goA(example);
const exampleB = goB(example);

console.log('Example part 1:', exampleA);
console.log('Example part 2:', exampleB);

/* Results */

if (!onlyTests) {
  console.time('Time');
  const resultA = goA(input);
  const resultB = goB(input);
  console.timeEnd('Time');

  console.log('Solution to part 1:', resultA);
  console.log('Solution to part 2:', resultB);
}
