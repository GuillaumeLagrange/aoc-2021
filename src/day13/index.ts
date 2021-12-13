import { test, readInput, readExample } from '../utils/index';

interface Fold {
  axis: 'x' | 'y';
  coordinate: number;
}

interface Input {
  folds: Fold[];
  points: Set<string>;
}

const prepareInput = (rawInput: string): Input => {
  const parsed = rawInput.trim().split('\n');

  let points = new Set<string>();
  let folds: Fold[] = [];

  parsed.forEach((line) => {
    if (line === '') {
      return;
    }

    if (line[0] === 'f') {
      const [axis, coordinate] = line.split(' ')[2].split('=');
      if (axis != 'x' && axis != 'y') {
        return;
      }

      folds.push({ axis, coordinate: Number(coordinate) });
      return;
    }

    const point = line.split(',').map(Number);
    points.add(JSON.stringify(point));
  });

  return {
    folds,
    points,
  };
};

const input = prepareInput(readInput());
const example = prepareInput(readExample());

const goA = (input: Input) => {
  let fold = input.folds[0];
  if (fold.axis === 'y') {
    for (let point of input.points) {
      const [x, y] = JSON.parse(point);
      if (y > fold.coordinate) {
        input.points.delete(point);
        input.points.add(JSON.stringify([x, 2 * fold.coordinate - y]));
      }
    }
  } else {
    for (let point of input.points) {
      const [x, y] = JSON.parse(point);
      if (x > fold.coordinate) {
        input.points.delete(point);
        input.points.add(JSON.stringify([2 * fold.coordinate - x, y]));
      }
    }
  }
  return input.points.size;
};

const goB = (input: Input) => {
  input.folds.forEach((fold) => {
    if (fold.axis === 'y') {
      for (let point of input.points) {
        const [x, y] = JSON.parse(point);
        if (y > fold.coordinate) {
          input.points.delete(point);
          input.points.add(JSON.stringify([x, 2 * fold.coordinate - y]));
        }
      }
    } else {
      for (let point of input.points) {
        const [x, y] = JSON.parse(point);
        if (x > fold.coordinate) {
          input.points.delete(point);
          input.points.add(JSON.stringify([2 * fold.coordinate - x, y]));
        }
      }
    }
  });

  let display = [];
  for (let i = 0; i < 6; i++) {
    let line = [];
    for (let j = 0; j < 40; j++) {
      line.push(' ');
    }
    display.push(line);
  }

  for (let point of input.points) {
    let [x, y] = JSON.parse(point);

    display[y][x] = '#';
  }

  console.log(display.map((line) => line.join('')));
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
