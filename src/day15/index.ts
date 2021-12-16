import { readInput, readExample } from '../utils/index';

interface Neighbour {
  label: string;
  weight: number;
}

type Graph = Record<string, Neighbour[]>;

interface Input {
  graph: Graph;
  size: number;
  size2: number;
}

const prepareInput = (rawInput: string) => {
  let parsedArray: number[][] = rawInput
    .trim()
    .split('\n')
    .map((line) => {
      return line.split('').map(Number);
    });

  const size = parsedArray.length - 1;
  console.log(size);

  parsedArray = parsedArray.map((line) => {
    let addedColumns = line;
    for (let i = 0; i < 4; i++) {
      const addedSegment = line.map((element) => {
        return ((element + i) % 9) + 1;
      });

      addedColumns = addedColumns.concat(addedSegment);
    }

    return addedColumns;
  });

  let addedLines = [];
  for (let j = 0; j < 4; j++) {
    addedLines = addedLines.concat(
      parsedArray.map((line) => {
        return line.map((element) => {
          return ((element + j) % 9) + 1;
        });
      }),
    );
  }

  parsedArray = parsedArray.concat(addedLines);

  const size2 = parsedArray.length - 1;
  console.log(size2);

  // Build graph
  let graph: Graph = {};
  parsedArray.forEach((line, i) => {
    line.forEach((value, j) => {
      let nodeLabel = JSON.stringify([i, j]);
      graph[nodeLabel] = [];

      let i_neighbours = [];
      if (i !== 0) {
        i_neighbours.push(i - 1);
      }
      if (i !== line.length - 1) {
        i_neighbours.push(i + 1);
      }

      for (let i_n of i_neighbours) {
        const neighbour = {
          label: JSON.stringify([i_n, j]),
          weight: parsedArray[i_n][j],
        };
        graph[nodeLabel].push(neighbour);
      }

      let j_neighbours = [];
      if (j !== 0) {
        j_neighbours.push(j - 1);
      }
      if (j !== line.length - 1) {
        j_neighbours.push(j + 1);
      }

      for (let j_n of j_neighbours) {
        const neighbour = {
          label: JSON.stringify([i, j_n]),
          weight: parsedArray[i][j_n],
        };
        graph[nodeLabel].push(neighbour);
      }
    });
  });

  return { graph, size, size2 };
};

const input = prepareInput(readInput());
const example = prepareInput(readExample());

const goA = (input: Input) => {
  // Init Dijkstra
  let vertexSet = new Set<string>();
  let dist = {};
  let prev = {};

  for (let vertex of Object.keys(input.graph)) {
    vertexSet.add(vertex);
    dist[vertex] = Number.POSITIVE_INFINITY;
    prev[vertex] = undefined;
  }

  dist[JSON.stringify([0, 0])] = 0;

  while (vertexSet.size !== 0) {
    console.log(vertexSet.size);
    // Find vertex with min dist
    let vertexMin = '';
    let distMin = Number.POSITIVE_INFINITY;

    for (let vertex of vertexSet) {
      if (dist[vertex] < distMin) {
        distMin = dist[vertex];
        vertexMin = vertex;
      }
    }

    vertexSet.delete(vertexMin);

    for (let neighbour of input.graph[vertexMin]) {
      const newDist = dist[vertexMin] + neighbour.weight;
      if (newDist < dist[neighbour.label]) {
        dist[neighbour.label] = newDist;
        prev[neighbour.label] = vertexMin;
      }
    }
  }

  return dist[JSON.stringify([input.size, input.size])];
};

const goB = (input) => {
  // Init Dijkstra
  let vertexSet = new Set<string>();
  let dist = {};
  let prev = {};

  for (let vertex of Object.keys(input.graph)) {
    vertexSet.add(vertex);
    dist[vertex] = Number.POSITIVE_INFINITY;
    prev[vertex] = undefined;
  }

  dist[JSON.stringify([0, 0])] = 0;

  while (vertexSet.size !== 0) {
    console.log(vertexSet.size);
    // Find vertex with min dist
    let vertexMin = '';
    let distMin = Number.POSITIVE_INFINITY;

    for (let vertex of vertexSet) {
      if (dist[vertex] < distMin) {
        distMin = dist[vertex];
        vertexMin = vertex;
      }
    }

    vertexSet.delete(vertexMin);

    for (let neighbour of input.graph[vertexMin]) {
      const newDist = dist[vertexMin] + neighbour.weight;
      if (newDist < dist[neighbour.label]) {
        dist[neighbour.label] = newDist;
        prev[neighbour.label] = vertexMin;
      }
    }
  }

  return dist[JSON.stringify([input.size2, input.size2])];
};

/* Tests */

// const exampleA = goA(example);
// const exampleB = goB(example);

// console.log('Example part 1:', exampleA);
// console.log('Example part 2:', exampleB);

/* Results */

console.time('Time');
// const resultA = goA(input);
const resultB = goB(input);
console.timeEnd('Time');

// console.log('Solution to part 1:', resultA);
console.log('Solution to part 2:', resultB);
