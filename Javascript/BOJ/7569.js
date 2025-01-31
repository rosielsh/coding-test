const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [M, N, H] = input.shift().split(" ").map(Number);
const tomato = [];

for (let i = 0; i < H; i++) {
  tomato.push(input.splice(0, N).map((x) => x.split(" ").map(Number)));
}

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  push(data) {
    const newNode = new Node(data);

    if (this.size === 0) {
      this.head = newNode;
    } else {
      this.tail.next = newNode;
    }

    this.tail = newNode;
    this.size++;
  }

  shift() {
    const data = this.head.data;

    this.head = this.head.next;
    this.size--;

    if (this.size === 0) {
      this.head = null;
      this.tail = null;
    }

    return data;
  }

  isEmpty() {
    return this.size === 0;
  }
}

const dx = [0, 0, -1, 1, 0, 0];
const dy = [-1, 1, 0, 0, 0, 0];
const dz = [0, 0, 0, 0, -1, 1];

const bfs = () => {
  let maxDay = 0;
  const queue = new Queue();

  for (let i = 0; i < H; i++) {
    for (let j = 0; j < N; j++) {
      for (let k = 0; k < M; k++) {
        if (tomato[i][j][k] === 1) {
          queue.push([i, j, k, 0]);
        }
      }
    }
  }

  while (!queue.isEmpty()) {
    const [cz, cx, cy, day] = queue.shift();

    maxDay = Math.max(maxDay, day);

    for (let i = 0; i < 6; i++) {
      const nx = cx + dx[i];
      const ny = cy + dy[i];
      const nz = cz + dz[i];

      if (nx < 0 || nx >= N || ny < 0 || ny >= M || nz < 0 || nz >= H) continue;

      if (tomato[nz][nx][ny] === 0) {
        tomato[nz][nx][ny] = 1;
        queue.push([nz, nx, ny, day + 1]);
      }
    }
  }

  for (let i = 0; i < H; i++) {
    for (let j = 0; j < N; j++) {
      for (let k = 0; k < M; k++) {
        if (!tomato[i][j][k]) {
          return -1;
        }
      }
    }
  }

  return maxDay;
};

console.log(bfs());
