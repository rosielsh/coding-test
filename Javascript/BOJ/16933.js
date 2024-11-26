class Node {
  constructor(x, y, breakCnt, day, dayCount) {
    this.x = x;
    this.y = y;
    this.breakCnt = breakCnt;
    this.day = day;
    this.dayCount = dayCount;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  push(x, y, breakCnt, day, dayCount) {
    const newNode = new Node(x, y, breakCnt, day, dayCount);

    if (this.size === 0) {
      this.head = newNode;
    } else {
      this.tail.next = newNode;
    }

    this.tail = newNode;
    this.size++;
  }

  shift() {
    const value = this.head;

    if (this.size === 0) return;

    this.head = this.head.next;
    this.size--;

    if (this.size === 0) {
      this.head = null;
      this.tail = null;
    }

    return value;
  }

  isEmpty() {
    return this.size === 0;
  }
}

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, M, K] = input[0].split(" ").map(Number);
const map = input.slice(1).map((x) => x.split("").map(Number));

const visited = Array.from({ length: K + 1 }, () =>
  Array.from({ length: 2 }, () => Array.from({ length: N }, () => Array(M).fill(false)))
);

visited[0][0][0][0] = true;

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

let answer = -1;
const queue = new Queue();

queue.push(0, 0, 0, 0, 1);

while (!queue.isEmpty()) {
  const { x, y, breakCnt, day, dayCount } = queue.shift();

  if (x === N - 1 && y === M - 1) {
    answer = dayCount;
    break;
  }

  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;

    if (map[nx][ny] === 0) {
      if (visited[breakCnt][1 - day][nx][ny]) continue;
      visited[breakCnt][1 - day][nx][ny] = true;
      queue.push(nx, ny, breakCnt, 1 - day, dayCount + 1);
      continue;
    }

    if (map[nx][ny] === 1) {
      if (day === 1) {
        if (visited[breakCnt][0][x][y]) continue;
        queue.push(x, y, breakCnt, 0, dayCount + 1);
        continue;
      }

      if (breakCnt >= K) continue;

      if (visited[breakCnt + 1][1][nx][ny]) continue;
      visited[breakCnt + 1][1][nx][ny] = true;
      queue.push(nx, ny, breakCnt + 1, 1, dayCount + 1);
    }
  }
}

console.log(answer);
