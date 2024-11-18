const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N, K] = require("fs").readFileSync(filePath).toString().trim().split(" ").map(Number);

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  push(value) {
    const newNode = new Node(value);
    this.size++;

    if (this.head === null) {
      this.head = this.tail = newNode;
      return;
    }

    this.tail.next = newNode;
    this.tail = newNode;
  }

  shift() {
    if (this.head === null) return;

    const value = this.head.value;
    this.head = this.head.next;
    this.size--;

    if (this.head === null) this.tail = null;

    return value;
  }

  isEmpty() {
    return this.size === 0;
  }
}

let maxTime = -1;
let answer = 0;

const bfs = () => {
  const queue = new Queue();
  const visited = Array.from({ length: 100001 }, () => Array(2).fill(-1)); // 해당 위치에 도달한 수 저장

  queue.push([0, N]);

  visited[N][0] = 0; // 시간
  visited[N][1] = 1; // 갈 수 있는 방법의 수

  while (!queue.isEmpty()) {
    const [time, pos] = queue.shift();

    if (maxTime !== -1 && time > maxTime) {
      break;
    }

    if (pos === K) {
      if (maxTime === -1) {
        maxTime = time;
      }

      answer += visited[pos][1];
      continue;
    }

    for (let nPos of [pos - 1, pos + 1, pos * 2]) {
      if (nPos < 0 || nPos > 100000) continue;

      if (visited[nPos][0] === -1) {
        visited[nPos][0] = time + 1;
        visited[nPos][1] = visited[pos][1];
        queue.push([time + 1, nPos]);
      }
      // 이전에 같은 시간으로 방문 했던 경우 => 현재 위치 간 횟수만큼 더하기
      else if (visited[nPos][0] === time + 1) {
        visited[nPos][1] += visited[pos][1];
      }
    }
  }
};

bfs();

console.log(maxTime, answer);
