const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input[0];
const danger = input.slice(1, N + 1).map((x) => x.split(" ").map(Number));

const M = +input[N + 1];
const kill = input.slice(N + 2).map((x) => x.split(" ").map(Number));

const map = Array.from({ length: 501 }, () => Array(501).fill(0));
const visited = Array.from({ length: 501 }, () => Array(501).fill(-1));

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

  unshift(data) {
    const newNode = new Node(data);

    if (this.size === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }

    this.size++;
  }

  isEmpty() {
    return this.size === 0;
  }
}

for (let [x1, y1, x2, y2] of danger) {
  let sr = x1 > x2 ? x2 : x1;
  let br = x1 > x2 ? x1 : x2;
  let sc = y1 > y2 ? y2 : y1;
  let bc = y1 > y2 ? y1 : y2;

  for (let i = sr; i <= br; i++) {
    for (let j = sc; j <= bc; j++) {
      map[i][j] = 1;
    }
  }
}

for (let [x1, y1, x2, y2] of kill) {
  let sr = x1 > x2 ? x2 : x1;
  let br = x1 > x2 ? x1 : x2;
  let sc = y1 > y2 ? y2 : y1;
  let bc = y1 > y2 ? y1 : y2;

  for (let i = sr; i <= br; i++) {
    for (let j = sc; j <= bc; j++) {
      map[i][j] = 2;
    }
  }
}

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

const bfs = () => {
  const queue = new Queue();
  queue.push([0, 0, 0]);

  visited[0][0] = 0;

  while (!queue.isEmpty()) {
    const [cx, cy, lessCnt] = queue.shift();

    if (cx === 500 && cy === 500) {
      return lessCnt;
    }

    for (let i = 0; i < 4; i++) {
      const nx = cx + dx[i];
      const ny = cy + dy[i];

      if (nx < 0 || nx > 500 || ny < 0 || ny > 500) continue;
      if (visited[nx][ny] > -1 || map[nx][ny] === 2) continue;

      visited[nx][ny] = 0;

      if (map[nx][ny] === 1) queue.push([nx, ny, lessCnt + 1]);
      else queue.unshift([nx, ny, lessCnt]);
    }
  }

  return -1;
};

console.log(bfs());
