class Node {
  constructor(x, y, dist, breaked) {
    this.x = x;
    this.y = y;
    this.dist = dist;
    this.breaked = breaked;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  push(x, y, dist, breaked) {
    const newNode = new Node(x, y, dist, breaked);

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

const [N, M] = input[0].split(" ").map(Number);
const map = input.slice(1).map((x) => x.split("").map(Number));

const visited = Array.from({ length: 2 }, () => Array.from({ length: N }, () => Array(M).fill(false)));
visited[0][0][0] = true;

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

let answer = -1;
const queue = new Queue();

queue.push(0, 0, 1, 0);

while (!queue.isEmpty()) {
  const { x, y, dist, breaked } = queue.shift();

  if (x === N - 1 && y === M - 1) {
    answer = dist;
    break;
  }

  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;
    if (visited[breaked][nx][ny]) continue;

    // 다음 위치가 벽이 아니면
    if (map[nx][ny] === 0) {
      visited[breaked][nx][ny] = true;
      queue.push(nx, ny, dist + 1, breaked);
      continue;
    }

    // 다음 위치가 벽이면
    if (map[nx][ny] === 1) {
      if (breaked) continue;
      if (visited[1][nx][ny]) continue;

      visited[breaked + 1][nx][ny] = true;
      queue.push(nx, ny, dist + 1, breaked + 1);
    }
  }
}

console.log(answer);
