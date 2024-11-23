const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N, K] = require("fs").readFileSync(filePath).toString().trim().split(" ").map(Number);

class Node {
  constructor(time, pos) {
    this.time = time;
    this.pos = pos;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  push(time, pos) {
    const newNode = new Node(time, pos);

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

  getSize() {
    return this.size;
  }
}

const answer = [];

const visited = Array.from({ length: 100001 }, () => [false, 0]); // 최단 시간, 이전 위치
const queue = new Queue();

queue.push(0, N);
visited[N][0] = true;
visited[N][1] = -1;

while (queue.getSize() > 0) {
  const { time, pos } = queue.shift(); // 최단 시간, 위치

  if (pos === K) {
    console.log(time);
    answer.push(K);
    break;
  }

  for (let nextPos of [pos - 1, pos + 1, pos * 2]) {
    if (nextPos < 0 || nextPos > 100000) continue;
    if (visited[nextPos][0]) continue;

    visited[nextPos][0] = true;
    visited[nextPos][1] = pos;

    queue.push(time + 1, nextPos);
  }
}

let nextValue = visited[K][1];

while (nextValue !== -1) {
  answer.push(nextValue);
  nextValue = visited[nextValue][1];
}

console.log(answer.reverse().join(" "));
