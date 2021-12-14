import { rawListeners } from 'process';
import { test, readInput, readExample } from '../utils/index';

type Insertions = Record<string, string>;
type Occurences = Record<string, number>;

interface Input {
  occurences: Occurences;
  insertions: Insertions;
}

const prepareInput = (rawInput: string): Input => {
  const splitInput = rawInput.trim().split('\n');
  const polymerString = splitInput[0];

  let occurences: Occurences = {};

  for (let i = 0; i < polymerString.length - 1; i++) {
    if (!occurences[polymerString.slice(i, i + 2)]) {
      occurences[polymerString.slice(i, i + 2)] = 1;
      continue;
    }

    occurences[polymerString.slice(i, i + 2)] += 1;
  }

  let insertions: Insertions = {};
  splitInput.slice(2).forEach((line) => {
    const splitEntry = line.split(' -> ');
    insertions[splitEntry[0]] = splitEntry[1];
  });

  return { occurences, insertions };
};

const input = prepareInput(readInput());
const example = prepareInput(readExample());

const goA = (input: Input) => {
  const STEPS = 10;
  let occurences = input.occurences;
  for (let i = 0; i < STEPS; i++) {
    let newOccurences: Occurences = {};
    for (let key of Object.keys(occurences)) {
      let newChar = input.insertions[key];

      newOccurences[key[0] + newChar] = newOccurences[key[0] + newChar]
        ? newOccurences[key[0] + newChar] + occurences[key]
        : occurences[key];
      newOccurences[newChar + key[1]] = newOccurences[newChar + key[1]]
        ? newOccurences[newChar + key[1]] + occurences[key]
        : occurences[key];
    }

    occurences = newOccurences;
  }

  let letterOccurences: Occurences = {};
  for (let key of Object.keys(occurences)) {
    letterOccurences[key[0]] = letterOccurences[key[0]]
      ? letterOccurences[key[0]] + occurences[key]
      : occurences[key];

    letterOccurences[key[1]] = letterOccurences[key[1]]
      ? letterOccurences[key[1]] + occurences[key]
      : occurences[key];
  }

  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;
  for (let letter of Object.keys(letterOccurences)) {
    // Round up because first and last letter are not counted twice for first and last pair
    letterOccurences[letter] = Math.round(letterOccurences[letter] / 2);

    min = Math.min(min, letterOccurences[letter]);
    max = Math.max(max, letterOccurences[letter]);
  }
  return max - min;
};

const goB = (input) => {
  const STEPS = 40;
  let occurences = input.occurences;
  for (let i = 0; i < STEPS; i++) {
    let newOccurences: Occurences = {};
    for (let key of Object.keys(occurences)) {
      let newChar = input.insertions[key];

      newOccurences[key[0] + newChar] = newOccurences[key[0] + newChar]
        ? newOccurences[key[0] + newChar] + occurences[key]
        : occurences[key];
      newOccurences[newChar + key[1]] = newOccurences[newChar + key[1]]
        ? newOccurences[newChar + key[1]] + occurences[key]
        : occurences[key];
    }

    occurences = newOccurences;
  }

  let letterOccurences: Occurences = {};
  for (let key of Object.keys(occurences)) {
    letterOccurences[key[0]] = letterOccurences[key[0]]
      ? letterOccurences[key[0]] + occurences[key]
      : occurences[key];

    letterOccurences[key[1]] = letterOccurences[key[1]]
      ? letterOccurences[key[1]] + occurences[key]
      : occurences[key];
  }

  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;
  for (let letter of Object.keys(letterOccurences)) {
    // Round up because first and last letter are not counted twice for first and last pair
    letterOccurences[letter] = Math.round(letterOccurences[letter] / 2);

    min = Math.min(min, letterOccurences[letter]);
    max = Math.max(max, letterOccurences[letter]);
  }
  return max - min;
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
