import { test, readInput, readExample } from '../utils/index';

interface Node {
  next: Set<string>;
}

type Graph = Record<string, Node>;

const prepareInput = (rawInput: string) => {
  const vertices = rawInput
    .trim()
    .split('\n')
    .map((line) => {
      return line.split('-');
    });

  let graph: Graph = {};
  vertices.forEach((vertex) => {
    if (!graph[vertex[0]]) {
      graph[vertex[0]] = {
        next: new Set<string>(),
      };
    }

    graph[vertex[0]].next.add(vertex[1]);

    if (!graph[vertex[1]]) {
      graph[vertex[1]] = {
        next: new Set<string>(),
      };
    }

    graph[vertex[1]].next.add(vertex[0]);
  });

  return graph;
};

const input = prepareInput(readInput());
const example = prepareInput(readExample());

const goA = (input: Graph) => {
  let bfs = [['start']];

  let paths: string[][] = [];

  while (bfs.length > 0) {
    let path = bfs.pop();

    // Consider last node of the path
    let currentNode = input[path[path.length - 1]];

    for (let neighbour of currentNode.next) {
      if (neighbour === 'end') {
        // Add path to final paths
        paths.push([...path, neighbour]);
        continue;
      }

      if (neighbour !== neighbour.toUpperCase()) {
        // Only add path if node has not been visited yet
        if (path.indexOf(neighbour) !== -1) {
          continue;
        }
      }

      // neighbour is uppercase, and therfore valid
      const newPath = [...path, neighbour];
      bfs.push(newPath);
    }
  }

  return paths.length;
};

interface Path {
  path: string[];
  doubleLowerCase: boolean;
}

const goB = (input: Graph) => {
  let bfs: Path[] = [{ path: ['start'], doubleLowerCase: false }];

  let paths: string[][] = [];

  while (bfs.length > 0) {
    let pathObject = bfs.pop();
    let path = pathObject.path;

    // Consider last node of the path
    let currentNode = input[path[path.length - 1]];

    for (let neighbour of currentNode.next) {
      let doubleLowerCase = pathObject.doubleLowerCase;
      if (neighbour === 'end') {
        // Add path to final paths
        paths.push([...path, neighbour]);
        continue;
      }

      // start cannot be visited twice and we started on start
      if (neighbour === 'start') {
        continue;
      }

      if (neighbour !== neighbour.toUpperCase()) {
        // Only add path if node has not been visited yet and we have no double small cave
        if (path.indexOf(neighbour) !== -1) {
          if (doubleLowerCase) {
            continue;
          }

          doubleLowerCase = true;
        }
      }

      // neighbour is uppercase, and therfore valid
      const newPath = [...path, neighbour];
      bfs.push({ path: newPath, doubleLowerCase });
    }
  }

  return paths.length;
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
