const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

class Node {
  constructor(cur, time) {
    this.cur = cur;
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

  push(cur, time) {
    const newNode = new Node(cur, time);
    this.heap.push(newNode);

    this.heapifyUp();
  }

  heapifyUp() {
    let idx = this.heap.length - 1;

    while (idx > 0) {
      const pIdx = Math.floor((idx - 1) / 2);

      if (pIdx > 0 && this.heap[pIdx].time < this.heap[idx].time) {
        break;
      }

      this.swap(idx, pIdx);
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

    if (leftChildIdx < this.heap.length && this.heap[minIdx].time > this.heap[leftChildIdx].time) {
      minIdx = leftChildIdx;
    }

    if (rightChildIdx < this.heap.length && this.heap[minIdx].time > this.heap[rightChildIdx].time) {
      minIdx = rightChildIdx;
    }

    if (minIdx === idx) return;

    this.swap(minIdx, idx);
    this.heapifyDown(minIdx);
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

const [N, M] = input[0].split(" ").map(Number);
const show = input[1].split(" ").map(Number);

const edges = input.slice(2).map((x) => x.split(" ").map(Number));

const graph = Array.from({ length: N + 1 }, () => []);

for (let [from, to, time] of edges) {
  graph[from].push([to, time]);
  graph[to].push([from, time]);
}

const dist = Array.from({ length: N }, () => Infinity);
dist[0] = 0;

let answer = -1;
const pq = new PQ();
pq.push(0, 0);

while (!pq.isEmpty()) {
  const { cur, time } = pq.pop();

  if (cur === N - 1) {
    answer = time;
    break;
  }

  if (show[cur]) continue;
  if (dist[cur] < time) continue; // 이미 최단 시간을 구했다

  for (let [next, nextTime] of graph[cur]) {
    if (dist[next] > dist[cur] + nextTime) {
      dist[next] = dist[cur] + nextTime;
      pq.push(next, dist[cur] + nextTime);
    }
  }
}

console.log(answer);
