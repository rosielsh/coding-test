class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  swap(a, b) {
    const temp = this.heap[a];
    this.heap[a] = this.heap[b];
    this.heap[b] = temp;
  }

  push(node, dist) {
    this.heap.push([node, dist]);
    this.heapifyUp();
  }

  heapifyUp() {
    let idx = this.heap.length - 1;

    while (idx > 0) {
      const pIdx = Math.floor((idx - 1) / 2);
      if (this.heap[idx][1] >= this.heap[pIdx][1]) break;
      this.swap(idx, pIdx);
      idx = pIdx;
    }
  }

  shift() {
    if (this.heap.length === 0) return;

    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);

    return min;
  }

  heapifyDown(idx) {
    const leftChildIdx = idx * 2 + 1;
    const rightChildIdx = idx * 2 + 2;

    let minIdx = idx;

    if (leftChildIdx < this.heap.length && this.heap[leftChildIdx][1] < this.heap[minIdx][1]) {
      minIdx = leftChildIdx;
    }

    if (rightChildIdx < this.heap.length && this.heap[rightChildIdx][1] < this.heap[minIdx][1]) {
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

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const N = +input.shift();
const map = input.map((x) => x.split(" ").map(Number));

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

function dijkstra() {
  const distances = Array.from({ length: N }, () => Array(N).fill(Infinity));
  distances[0][0] = 0;

  const pq = new PriorityQueue();
  pq.push([0, 0], 0);

  while (pq.getSize() > 0) {
    const [[cx, cy], maxDist] = pq.shift();

    if (maxDist > distances[cx][cy]) continue;

    for (let i = 0; i < 4; i++) {
      const nx = cx + dx[i];
      const ny = cy + dy[i];

      if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;

      const nextMax = Math.max(maxDist, Math.abs(map[cx][cy] - map[nx][ny]));

      if (nextMax < distances[nx][ny]) {
        distances[nx][ny] = nextMax;
        pq.push([nx, ny], nextMax);
      }
    }
  }

  return distances[N - 1][N - 1];
}

console.log(dijkstra());
