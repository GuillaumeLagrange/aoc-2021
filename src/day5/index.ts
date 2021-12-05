import { test, readInput, readExample } from '../utils/index';

interface Coordinates {
  x: number;
  y: number;
}

interface Line {
  start: Coordinates;
  end: Coordinates;
}

const prepareInput = (rawInput: string) => {
  const parsedInput = rawInput
    .trim()
    .split('\n')
    .map((line) => {
      const lineSplit = line.split(' -> ');
      const start = lineSplit[0].split(',').map(Number);
      const end = lineSplit[1].split(',').map(Number);
      return {
        start: {
          x: start[0],
          y: start[1],
        },
        end: {
          x: end[0],
          y: end[1],
        },
      };
    });

  return parsedInput;
};

const input = prepareInput(readInput());
const example = prepareInput(readExample());

const goA = (input: Line[]) => {
  const areaSize = 1000;
  let area: number[][] = [];
  for (let i = 0; i < areaSize; i++) {
    area.push(Array(areaSize).fill(0));
  }

  input.forEach((line) => {
    if (line.start.x === line.end.x) {
      const x = line.start.x;
      const ymin = Math.min(line.start.y, line.end.y);
      const ymax = Math.max(line.start.y, line.end.y);
      for (let y = ymin; y <= ymax; y++) {
        area[y][x] += 1;
      }
    } else if (line.start.y === line.end.y) {
      {
        const y = line.start.y;
        const xmin = Math.min(line.start.x, line.end.x);
        const xmax = Math.max(line.start.x, line.end.x);
        for (let x = xmin; x <= xmax; x++) {
          area[y][x] += 1;
        }
      }
    }
  });

  return area.reduce((prev, line) => {
    return (
      prev +
      line.reduce((prevLine, value) => {
        return value > 1 ? prevLine + 1 : prevLine;
      }, 0)
    );
  }, 0);
};

const goB = (input: Line[]) => {
  const areaSize = 1000;
  let area: number[][] = [];
  for (let i = 0; i < areaSize; i++) {
    area.push(Array(areaSize).fill(0));
  }

  input.forEach((line) => {
    if (line.start.x === line.end.x) {
      const x = line.start.x;
      const ymin = Math.min(line.start.y, line.end.y);
      const ymax = Math.max(line.start.y, line.end.y);
      for (let y = ymin; y <= ymax; y++) {
        area[y][x] += 1;
      }
    } else if (line.start.y === line.end.y) {
      {
        const y = line.start.y;
        const xmin = Math.min(line.start.x, line.end.x);
        const xmax = Math.max(line.start.x, line.end.x);
        for (let x = xmin; x <= xmax; x++) {
          area[y][x] += 1;
        }
      }
    } else if (line.start.x < line.end.x) {
      const direction = line.start.y < line.end.y ? 1 : -1;

      for (let i = 0; i <= line.end.x - line.start.x; i++) {
        area[line.start.y + i * direction][line.start.x + i] += 1;
      }
    } else {
      const direction = line.start.y > line.end.y ? 1 : -1;

      for (let i = 0; i <= line.start.x - line.end.x; i++) {
        area[line.end.y + i * direction][line.end.x + i] += 1;
      }
    }
  });

  return area.reduce((prev, line) => {
    return (
      prev +
      line.reduce((prevLine, value) => {
        return value > 1 ? prevLine + 1 : prevLine;
      }, 0)
    );
  }, 0);
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
