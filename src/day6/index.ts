import { test, readInput, readExample } from '../utils/index';

interface ParsedInput {
  0: number;
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  6: number;
}

const prepareInput = (rawInput: string) => {
  let parsedInput: ParsedInput = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  };

  rawInput
    .trim()
    .split(',')
    .forEach((entry) => {
      if (Number(entry) < 0 || Number(entry) > 6) {
        return;
      }
      parsedInput[entry] += 1;
    });

  return parsedInput;
};

const input = prepareInput(readInput());
const example = prepareInput(readExample());

const goA = (input: ParsedInput) => {
  let fishes: ParsedInput = { ...input };
  const maxDays = 80;
  let hatched = 0;
  let prevHatched = 0;
  let prevPrevHatched = 0;
  for (let day = 0; day < maxDays; day++) {
    Object.keys(fishes).forEach((key) => {
      if ((Number(key) - day) % 7 === 0) {
        hatched = fishes[key];
        fishes[key] += prevPrevHatched;
        prevPrevHatched = prevHatched;
        prevHatched = hatched;
      }
    });
  }

  let totalFishes = Object.keys(fishes).reduce((prev, key) => {
    return prev + fishes[key];
  }, prevHatched + prevPrevHatched);

  return totalFishes;
};

const goB = (input: ParsedInput) => {
  let fishes: ParsedInput = { ...input };
  const maxDays = 256;
  let hatched = 0;
  let prevHatched = 0;
  let prevPrevHatched = 0;
  for (let day = 0; day < maxDays; day++) {
    Object.keys(fishes).forEach((key) => {
      if ((Number(key) - day) % 7 === 0) {
        hatched = fishes[key];
        fishes[key] += prevPrevHatched;
        prevPrevHatched = prevHatched;
        prevHatched = hatched;
      }
    });
  }

  let totalFishes = Object.keys(fishes).reduce((prev, key) => {
    return prev + fishes[key];
  }, prevHatched + prevPrevHatched);

  return totalFishes;
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
