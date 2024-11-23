const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

class Node {
  constructor(x, y, count) {
    this.x = x;
    this.y = y;
    this.count = count;
  }
}

class PQ {
  constructor() {
    this.heap = [];
  }

  swap(a, b) {
    const temp = this.heap[a];
    this.heap[a] = this.heap[b];
    this.heap[b] = temp;
  }

  push(x, y, count) {
    const newNode = new Node(x, y, count);
    this.heap.push(newNode);
    this.heapifyUp();
  }

  heapifyUp() {
    let idx = this.heap.length - 1;

    while (idx > 0) {
      const pIdx = Math.floor((idx - 1) / 2);
      if (this.heap[pIdx].count <= this.heap[idx].count) break;
      this.swap(pIdx, idx);
      idx = pIdx;
    }
  }

  pop() {
    const front = this.heap[0];
    if (this.heap.length === 0) return;
    if (this.heap.length === 1) return this.heap.pop();

    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    return front;
  }

  heapifyDown(idx) {
    const leftChildIdx = idx * 2 + 1;
    const rightChildIdx = idx * 2 + 2;

    let minIdx = idx;

    if (leftChildIdx < this.heap.length && this.heap[leftChildIdx].count < this.heap[minIdx].count) {
      minIdx = leftChildIdx;
    }

    if (rightChildIdx < this.heap.length && this.heap[rightChildIdx].count < this.heap[minIdx].count) {
      minIdx = rightChildIdx;
    }

    if (minIdx === idx) return;

    this.swap(minIdx, idx);
    this.heapifyDown(minIdx);
  }

  getSize() {
    return this.heap.length;
  }
}

const [N, M] = input[0].split(" ").map(Number);
const [sx, sy, tx, ty] = input[1].split(" ").map(Number);
const map = input.slice(2).map((x) => x.split(""));

const visited = Array.from({ length: N }, () => Array(M).fill(false));
visited[sx - 1][sy - 1] = true;

const pq = new PQ(); // 현재 x, y, depth
pq.push(sx - 1, sy - 1, 0);

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

let answer = 0;

while (pq.getSize() > 0) {
  const { x, y, count } = pq.pop();

  if (map[x][y] === "#") {
    answer = count;
    break;
  }

  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;
    if (visited[nx][ny]) continue;
    visited[nx][ny] = true;
    if (map[nx][ny] === "0") pq.push(nx, ny, count);
    else pq.push(nx, ny, count + 1);
  }
}

console.log(answer);
