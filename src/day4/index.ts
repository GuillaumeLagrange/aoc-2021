import { test, readInput, readExample } from '../utils/index';

interface ParsedInput {
  numbers: number[];
  boards: {
    number: number;
    found: boolean;
  }[][][];
}

const prepareInput = (rawInput: string) => {
  const parsed = rawInput.split('\n').filter(Boolean);

  const numbers = parsed[0].split(',').map(Number);

  let boards: { number: number; found: boolean }[][][] = [];
  for (let i = 0; i < parsed.slice(1).length / 5; i++) {
    let currentBoard: { number: number; found: boolean }[][] = [];
    for (let j = 0; j < 5; j++) {
      let parsedLine = parsed[1 + 5 * i + j].trim();
      let line = parsedLine.split(/[ ,]+/).map((e) => {
        return {
          number: Number(e),
          found: false,
        };
      });
      currentBoard.push(line);
    }
    boards.push(currentBoard);
  }
  return {
    numbers: numbers,
    boards: boards,
  };
};

const input = prepareInput(readInput());
const example = prepareInput(readExample());

const goA = (input: ParsedInput) => {
  for (let numIndex = 0; numIndex < input.numbers.length; numIndex++) {
    const num = input.numbers[numIndex];
    for (
      let boardsIndex = 0;
      boardsIndex < input.boards.length;
      boardsIndex++
    ) {
      const board = input.boards[boardsIndex];
      board.forEach((line) => {
        line.forEach((entry) => {
          if (entry.number === num) {
            entry.found = true;
          }
        });
      });

      for (let i = 0; i < 5; i++) {
        let foundLine = true;
        let foundColumn = true;

        for (let j = 0; j < 5; j++) {
          foundLine = foundLine && board[i][j].found;
          foundColumn = foundColumn && board[j][i].found;
        }

        if (foundLine || foundColumn) {
          const score = board.reduce((prev, line) => {
            return (
              prev +
              line.reduce((prevLine, entry) => {
                return entry.found ? prevLine : prevLine + entry.number;
              }, 0)
            );
          }, 0);
          return score * num;
        }
      }
    }
  }
};

const goB = (input: ParsedInput) => {
  let boardsWon = Array(input.boards.length).fill(false);
  let boardsScore = Array(input.boards.length).fill(0);
  let boardWinningNumber = Array(input.boards.length).fill(0);
  let boardsWonCount = 0;
  for (let numIndex = 0; numIndex < input.numbers.length; numIndex++) {
    const num = input.numbers[numIndex];
    for (
      let boardsIndex = 0;
      boardsIndex < input.boards.length;
      boardsIndex++
    ) {
      const board = input.boards[boardsIndex];
      board.forEach((line) => {
        line.forEach((entry) => {
          if (entry.number === num) {
            entry.found = true;
          }
        });
      });

      for (let i = 0; i < 5; i++) {
        let foundLine = true;
        let foundColumn = true;

        for (let j = 0; j < 5; j++) {
          foundLine = foundLine && board[i][j].found;
          foundColumn = foundColumn && board[j][i].found;
        }

        if (foundLine || foundColumn) {
          if (boardsWon[boardsIndex] === true) {
            continue;
          }
          boardsWonCount += 1;
          boardsWon[boardsIndex] = true;
          boardWinningNumber[boardsIndex] = num;
          boardsScore[boardsIndex] = board.reduce((prev, line) => {
            return (
              prev +
              line.reduce((prevLine, entry) => {
                return entry.found ? prevLine : prevLine + entry.number;
              }, 0)
            );
          }, 0);

          if (boardsWonCount === input.boards.length) {
            return boardsScore[boardsIndex] * boardWinningNumber[boardsIndex];
          }
        }
      }
    }
  }
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
