const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N, K] = require("fs").readFileSync(filePath).toString().trim().split(" ").map(Number);

class Node {
  constructor(pos, time) {
    this.pos = pos;
    this.time = time;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  push(pos, time) {
    const newNode = new Node(pos, time);

    if (this.head === null) {
      this.head = newNode;
    } else {
      this.tail.next = newNode;
    }

    this.tail = newNode;
    this.size++;
  }

  shift() {
    const value = this.head;
    if (this.head === null) {
      return;
    }

    this.head = this.head.next;
    this.size--;

    if (this.size === 0) {
      this.head = null;
      this.tail = null;
    }

    return value;
  }

  getSize() {
    return this.size;
  }
}

const visited = Array.from({ length: 100001 }, () => Array(2).fill(Infinity));
const queue = new Queue(); // n에서 시작하고 현재까지 갈 수 있는 최단 시간을 저장

queue.push(N, 0);

visited[N][0] = 0;
visited[N][1] = 1;

while (queue.getSize() > 0) {
  const { pos, time } = queue.shift();

  for (let next of [pos - 1, pos + 1, pos * 2]) {
    // 범위 체크
    if (next < 0 || next > 100000) continue;

    // 이미 방문 시간이 더 작으면
    if (visited[next][0] < time + 1) continue;

    // 같은 시간에 방문 했다면
    if (visited[next][0] === time + 1) {
      visited[next][1] += visited[pos][1];
      continue;
    }

    // 최단 시간에 처음 방문했다면
    visited[next][0] = time + 1;
    visited[next][1] = visited[pos][1];
    queue.push(next, time + 1);
  }
}

console.log(visited[K].join("\n"));
