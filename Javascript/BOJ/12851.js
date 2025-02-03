const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

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

const [N, K] = input[0].split(" ").map(Number);

const visited = Array.from({ length: 100001 }, () => Array(2).fill(-1));
const queue = new Queue();
queue.push([N, 0]);

visited[N][0] = 0;
visited[N][1] = 1;

let answer = 0;
let minTime = -1;

while (!queue.isEmpty()) {
  const [x, time] = queue.shift();

  if (minTime !== -1 && minTime < time) break;

  if (x === K) {
    if (minTime === -1) {
      minTime = time;
    }

    answer += visited[x][1];
    continue;
  }

  for (let nx of [x - 1, x + 1, 2 * x]) {
    if (nx < 0 || nx > 100000) continue;

    // 처음 방문한 위치
    if (visited[nx][0] === -1) {
      visited[nx][0] = time + 1;
      visited[nx][1] = visited[x][1];
      queue.push([nx, time + 1]);
    }
    // 방문한 적 있는데, 같은 시간에 방문했던 경우
    else if (visited[nx][0] === time + 1) {
      visited[nx][1] += visited[x][1];
    }
  }
}

console.log(minTime, answer);
