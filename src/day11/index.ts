import { test, readInput, readExample } from '../utils/index';

const prepareInput = (rawInput: string) => {
  return rawInput
    .trim()
    .split('\n')
    .map((line) => line.split('').map(Number));
};

const input = prepareInput(readInput());
const example = prepareInput(readExample());

const goA = (input: number[][]) => {
  let energy = [...input];
  let flashes = 0;
  for (let step = 0; step < 100; step++) {
    // Increase everything by 1
    energy = energy.map((line) => line.map((energyLevel) => energyLevel + 1));

    // Init flash queue
    let flash_queue = [];
    for (let i = 0; i < energy.length; i++) {
      for (let j = 0; j < energy[i].length; j++) {
        if (energy[i][j] > 9) {
          flash_queue.push([i, j]);
        }
      }
    }

    while (flash_queue.length > 0) {
      let [i, j] = flash_queue.pop();
      // In case spot has been pushed twice before actually flashing
      if (energy[i][j] === 0) {
        continue;
      }
      energy[i][j] = 0;
      flashes += 1;

      let i_next_pos = [i - 1, i, i + 1];
      let j_next_pos = [j - 1, j, j + 1];

      i_next_pos.forEach((i_next) => {
        if (i_next === -1 || i_next === energy.length) {
          return;
        }
        j_next_pos.forEach((j_next) => {
          if (j_next === -1 || j_next === energy[i].length) {
            return;
          }

          if (energy[i_next][j_next] === 0) {
            // Neighbour already flashed
            return;
          }

          energy[i_next][j_next] += 1;

          if (energy[i_next][j_next] > 9) {
            // This neighbour is flashing next
            flash_queue.push([i_next, j_next]);
          }
        });
      });
    }
  }

  return flashes;
};

const goB = (input: number[][]) => {
  let energy = [...input];
  let flashes = 0;
  let step = 0;

  while (flashes != energy.length * energy[0].length) {
    step += 1;
    flashes = 0;
    // Increase everything by 1
    energy = energy.map((line) => line.map((energyLevel) => energyLevel + 1));

    // Init flash queue
    let flash_queue = [];
    for (let i = 0; i < energy.length; i++) {
      for (let j = 0; j < energy[i].length; j++) {
        if (energy[i][j] > 9) {
          flash_queue.push([i, j]);
        }
      }
    }

    while (flash_queue.length > 0) {
      let [i, j] = flash_queue.pop();
      // In case spot has been pushed twice before actually flashing
      if (energy[i][j] === 0) {
        continue;
      }
      energy[i][j] = 0;
      flashes += 1;

      let i_next_pos = [i - 1, i, i + 1];
      let j_next_pos = [j - 1, j, j + 1];

      i_next_pos.forEach((i_next) => {
        if (i_next === -1 || i_next === energy.length) {
          return;
        }
        j_next_pos.forEach((j_next) => {
          if (j_next === -1 || j_next === energy[i].length) {
            return;
          }

          if (energy[i_next][j_next] === 0) {
            // Neighbour already flashed
            return;
          }

          energy[i_next][j_next] += 1;

          if (energy[i_next][j_next] > 9) {
            // This neighbour is flashing next
            flash_queue.push([i_next, j_next]);
          }
        });
      });
    }
  }

  return step;
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
