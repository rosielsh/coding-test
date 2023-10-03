const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().replace(/\r/g, "").trim().split("\n");

const [N, M, K] = input.shift().split(" ").map(Number);
const map = input.map((x) => x.split("").map(Number));

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

class Node {
  constructor(data, next) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.front = null;
    this.rear = null;
    this.size = 0;
  }

  enqueue(value) {
    const newNode = new Node(value);

    if (this.front === null) {
      this.front = newNode;
      this.rear = newNode;
    } else {
      this.rear.next = newNode;
      this.rear = newNode;
    }

    this.size++;
  }

  dequeue() {
    if (this.front === null) {
      return;
    } else {
      const curFront = this.front;
      this.front = curFront.next;
      this.size--;
      return curFront.data;
    }
  }

  getSize() {
    return this.size;
  }
}

function bfs() {
  const queue = new Queue();
  queue.enqueue([0, 0, 0]);

  const visited = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => Array(K + 1).fill(0))
  );

  visited[0][0][0] = 1;

  while (queue.getSize()) {
    const [x, y, breakCnt] = queue.dequeue();

    if (x === N - 1 && y === M - 1) {
      return visited[N - 1][M - 1][breakCnt];
    }

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;

      if (map[nx][ny]) {
        if (breakCnt === K || visited[nx][ny][breakCnt + 1]) continue;
        visited[nx][ny][breakCnt + 1] = visited[x][y][breakCnt] + 1;
        queue.enqueue([nx, ny, breakCnt + 1]);
      } else {
        if (visited[nx][ny][breakCnt]) continue;
        visited[nx][ny][breakCnt] = visited[x][y][breakCnt] + 1;
        queue.enqueue([nx, ny, breakCnt]);
      }
    }
  }

  return -1;
}

console.log(bfs());
