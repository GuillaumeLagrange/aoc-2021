import { test, readInput, readExample } from '../utils/index';

const prepareInput = (rawInput: string) => {
  const parsed = rawInput
    .trim()
    .split('\n')
    .map((line) => {
      return [
        Number.POSITIVE_INFINITY,
        ...line.split('').map(Number),
        Number.POSITIVE_INFINITY,
      ];
    });

  return [
    Array(parsed[0].length).fill(Number.POSITIVE_INFINITY),
    ...parsed,
    Array(parsed[0].length).fill(Number.POSITIVE_INFINITY),
  ];
};

const input = prepareInput(readInput());
const example = prepareInput(readExample());

const goA = (input: number[][]) => {
  let riskLevel = 0;

  for (let i = 1; i < input.length - 1; i++) {
    for (let j = 1; j < input[i].length - 1; j++) {
      const curHeight = input[i][j];
      if (
        curHeight <
        Math.min(
          input[i - 1][j],
          input[i + 1][j],
          input[i][j - 1],
          input[i][j + 1],
        )
      ) {
        riskLevel += curHeight + 1;
      }
    }
  }

  return riskLevel;
};

const goB = (input: number[][]) => {
  let basinSizes = [];

  for (let i = 1; i < input.length - 1; i++) {
    for (let j = 1; j < input[i].length - 1; j++) {
      const curHeight = input[i][j];
      if (
        curHeight <
        Math.min(
          input[i - 1][j],
          input[i + 1][j],
          input[i][j - 1],
          input[i][j + 1],
        )
      ) {
        let basin: { i: number; j: number }[] = [{ i, j }];
        let basinHistory: { i: number; j: number }[] = [{ i, j }];
        let basinSize = 0;

        while (basin.length > 0) {
          basinSize += 1;
          let pos = basin.pop();
          const neighbours = [
            { i: pos.i - 1, j: pos.j },
            { i: pos.i + 1, j: pos.j },
            { i: pos.i, j: pos.j - 1 },
            { i: pos.i, j: pos.j + 1 },
          ];

          for (let neighbour of neighbours) {
            if (
              input[neighbour.i][neighbour.j] < 9 &&
              input[neighbour.i][neighbour.j] > input[pos.i][pos.j]
            ) {
              const shouldAdd = basinHistory.reduce((prev, entry) => {
                return (
                  prev && (entry.i !== neighbour.i || entry.j !== neighbour.j)
                );
              }, true);
              if (shouldAdd) {
                basinHistory.push(neighbour);
                basin.push(neighbour);
              }
            }
          }
        }

        basinSizes.push(basinSize);
      }
    }
  }

  basinSizes.sort((a, b) => b - a);
  console.log(basinSizes);
  return basinSizes[0] * basinSizes[1] * basinSizes[2];
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
