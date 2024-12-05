const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, E] = input[0].split(" ").map(Number);
const edges = input.slice(1, 1 + E).map((x) => x.split(" ").map(Number));
const vertex = input[1 + E].split(" ").map(Number);

class Node {
  constructor(vertex, dist) {
    this.vertex = vertex;
    this.dist = dist;
    this.next = null;
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

  push(vertex, dist) {
    const newNode = new Node(vertex, dist);

    this.heap.push(newNode);

    this.heapifyUp();
  }

  heapifyUp() {
    let idx = this.heap.length - 1;

    while (idx > 0) {
      const pIdx = parseInt((idx - 1) / 2);

      if (pIdx >= 0 && this.heap[pIdx].dist < this.heap[idx].dist) break;

      this.swap(pIdx, idx);
      idx = pIdx;
    }
  }

  pop() {
    const value = this.heap[0];

    if (this.heap.length === 0) return;
    if (this.heap.length === 1) return this.heap.pop();

    this.heap[0] = this.heap.pop();

    this.heapifyDown(0);

    return value;
  }

  heapifyDown(idx) {
    const leftChildIdx = idx * 2 + 1;
    const rightChildIdx = idx * 2 + 2;

    let minIdx = idx;

    if (leftChildIdx < this.heap.length && this.heap[minIdx].dist > this.heap[leftChildIdx].dist) minIdx = leftChildIdx;
    if (rightChildIdx < this.heap.length && this.heap[minIdx].dist > this.heap[rightChildIdx].dist)
      minIdx = rightChildIdx;

    if (minIdx === idx) return;

    this.swap(minIdx, idx);
    this.heapifyDown(minIdx);
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

const graph = Array.from({ length: N + 1 }, () => []);

for (let [from, to, distance] of edges) {
  graph[from].push([to, distance]);
  graph[to].push([from, distance]);
}

const dijkstra = (s, e) => {
  const distance = Array.from({ length: N + 1 }, () => Infinity);
  distance[s] = 0;

  const pq = new PQ();
  pq.push(s, 0);

  while (!pq.isEmpty()) {
    const { vertex, dist } = pq.pop();

    if (vertex === e) break;

    if (distance[vertex] < dist) continue;

    for (let [next, nextDist] of graph[vertex]) {
      if (distance[next] > distance[vertex] + nextDist) {
        distance[next] = distance[vertex] + nextDist;
        pq.push(next, distance[next]);
      }
    }
  }

  return distance[e];
};

let answer = 0;

let sum1 = 0;
sum1 += dijkstra(1, vertex[0]);
sum1 += dijkstra(vertex[0], vertex[1]);
sum1 += dijkstra(vertex[1], N);

let sum2 = 0;
sum2 += dijkstra(1, vertex[1]);
sum2 += dijkstra(vertex[1], vertex[0]);
sum2 += dijkstra(vertex[0], N);

if (sum1 === Infinity) answer = -1;
else {
  answer = Math.min(sum1, sum2);
}

console.log(answer);
