import { test, readInput, readExample } from '../utils/index';

interface Parsed {
  crabs: number[];
  positions: Set<number>;
}

const prepareInput = (rawInput: string) => {
  const crabs = rawInput.trim().split(',').map(Number);
  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;

  let positions = new Set<number>();
  crabs.forEach((crab) => {
    min = Math.min(min, crab);
    max = Math.max(max, crab);
  });

  for (let i = min; i <= max; i++) {
    positions.add(i);
  }

  return {
    crabs: crabs,
    positions: positions,
  };
};

const input = prepareInput(readInput());
const example = prepareInput(readExample());

const goA = (input: Parsed) => {
  let fuel: Record<string, number> = {};

  input.positions.forEach((position) => {
    input.crabs.forEach((crab) => {
      const curVal = fuel[position.toString()] ?? 0;
      fuel[position.toString()] = curVal + Math.abs(crab - position);
    });
  });

  let min = Number.POSITIVE_INFINITY;
  Object.keys(fuel).forEach((position) => {
    if (fuel[position] < min) {
      min = fuel[position];
    }
  });

  return min;
};

const goB = (input: Parsed) => {
  let fuel: Record<string, number> = {};

  input.positions.forEach((position) => {
    input.crabs.forEach((crab) => {
      const curVal = fuel[position.toString()] ?? 0;
      const distance = Math.abs(crab - position);
      fuel[position.toString()] = curVal + (distance * (distance + 1)) / 2;
    });
  });

  let min = Number.POSITIVE_INFINITY;
  Object.keys(fuel).forEach((position) => {
    if (fuel[position] < min) {
      min = fuel[position];
    }
  });

  return min;
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
