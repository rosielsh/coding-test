const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N, K] = require("fs").readFileSync(filePath).toString().trim().split(" ").map(Number);

class Node {
  constructor(pos, time) {
    this.pos = pos;
    this.time = time;
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

  push(pos, time) {
    const newNode = new Node(pos, time);
    this.heap.push(newNode);
    this.heapifyUp();
  }

  heapifyUp() {
    let idx = this.heap.length - 1;

    while (idx > 0) {
      const pIdx = Math.floor((idx - 1) / 2);
      if (this.heap[pIdx].time <= this.heap[idx].time) break;
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

    if (leftChildIdx < this.heap.length && this.heap[leftChildIdx].time < this.heap[minIdx].time) {
      minIdx = leftChildIdx;
    }

    if (rightChildIdx < this.heap.length && this.heap[rightChildIdx].time < this.heap[minIdx].time) {
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

const visited = Array.from({ length: 100001 }, () => false);
const pq = new PQ();
let answer = 0;

pq.push(N, 0);

while (pq.getSize() > 0) {
  const { pos, time } = pq.pop();
  if (pos === K) {
    answer = time;
    break;
  }
  if (visited[pos]) continue;
  visited[pos] = true;

  for (let [nextPos, nextTime] of [
    [pos * 2, time],
    [pos - 1, time + 1],
    [pos + 1, time + 1],
  ]) {
    if (nextPos < 0 || nextPos > 100000) continue;

    pq.push(nextPos, nextTime);
  }
}

console.log(answer);
