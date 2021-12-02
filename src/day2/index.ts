import { test, readInput, readExample } from '../utils/index';

interface Movement {
  move: string;
  value: number;
}

const prepareInput = (rawInput: string) => {
  const parsed = rawInput
    .split('\n')
    .filter((e) => e)
    .map((e) => e.split(' '))
    .map((e) => {
      return {
        move: e[0],
        value: Number(e[1]),
      };
    });

  return parsed;
};

const input = prepareInput(readInput());
const example = prepareInput(readExample());

const goA = (input: Movement[]) => {
  let horizontalPos = 0;
  let depth = 0;

  input.forEach((e) => {
    switch (e.move) {
      case 'forward':
        horizontalPos += e.value;
        break;
      case 'down':
        depth += e.value;
        break;
      case 'up':
        depth -= e.value;
    }
  });

  return horizontalPos * depth;
};

const goB = (input) => {
  let horizontalPos = 0;
  let depth = 0;
  let aim = 0;

  input.forEach((e) => {
    switch (e.move) {
      case 'forward':
        horizontalPos += e.value;
        depth += e.value * aim;
        break;
      case 'down':
        aim += e.value;
        break;
      case 'up':
        aim -= e.value;
    }
  });

  return horizontalPos * depth;
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
