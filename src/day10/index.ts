import { test, readInput, readExample } from '../utils/index';

const points = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

const prepareInput = (rawInput: string) => {
  return rawInput.trim().split('\n');
};

const input = prepareInput(readInput());
const example = prepareInput(readExample());

const goA = (input: string[]) => {
  let score = 0;
  input.forEach((line) => {
    let stack = [];
    for (let char of line) {
      switch (char) {
        case '(':
        case '[':
        case '{':
        case '<':
          stack.push(char);
          continue;
        case ')':
          if (stack.pop() !== '(') {
            score += points[char];
          }
          break;
        case ']':
          if (stack.pop() !== '[') {
            score += points[char];
          }
          break;
        case '}':
          if (stack.pop() !== '{') {
            score += points[char];
          }
          break;
        case '>':
          if (stack.pop() !== '<') {
            score += points[char];
          }
          break;
      }
    }
  });

  return score;
};

const points_2 = {
  '(': 1,
  '[': 2,
  '{': 3,
  '<': 4,
};

const goB = (input: string[]) => {
  let scores = [];
  input.forEach((line) => {
    let stack = [];
    let score = 0;
    let stop = false;
    for (let char of line) {
      switch (char) {
        case '(':
        case '[':
        case '{':
        case '<':
          stack.push(char);
          continue;
        case ')':
          if (stack.pop() !== '(') {
            stop = true;
          }
          break;
        case ']':
          if (stack.pop() !== '[') {
            stop = true;
          }
          break;
        case '}':
          if (stack.pop() !== '{') {
            stop = true;
          }
          break;
        case '>':
          if (stack.pop() !== '<') {
            stop = true;
          }
          break;
      }
    }

    if (stop) {
      return;
    }

    while (stack.length != 0) {
      const char = stack.pop();
      score = score * 5 + points_2[char];
    }
    scores.push(score);
  });

  scores.sort((a, b) => a - b);
  console.log('hello');
  console.log(scores);
  return scores[Math.floor(scores.length / 2)];
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
