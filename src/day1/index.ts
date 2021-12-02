import { test, readInput } from '../utils/index';

const prepareInput = (rawInput: string) => {
  return rawInput
    .split('\n')
    .filter((element) => {
      return element !== '';
    })
    .map(Number);
};

const input = prepareInput(readInput());

const goA = (input: number[]) => {
  let count = 0;

  for (let i = 1; i < input.length; i++) {
    if (input[i] > input[i - 1]) {
      count += 1;
    }
  }

  return count;
};

const goB = (input: number[]) => {
  let count = 0;

  for (let i = 3; i < input.length; i++) {
    let prevSome = input
      .slice(i - 3, i)
      .reduce((sum, current) => sum + current, 0);
    let currSome = input
      .slice(i - 2, i + 1)
      .reduce((sum, current) => sum + current, 0);

    if (currSome > prevSome) {
      count += 1;
    }
  }

  return count;
};

/* Tests */

// test()

/* Results */

console.time('Time');
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd('Time');

console.log('Solution to part 1:', resultA);
console.log('Solution to part 2:', resultB);
