// 문제집 => 메모리 초과

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input.shift().split(" ").map(Number);
const order = input.map((x) => x.split(" ").map(Number));
const graph = Array.from({ length: N + 1 }, () => []);
const ingreeded = Array.from({ length: N + 1 }, () => 0);

class MinHeap {
  constructor() {
    this.heap = [null];
  }

  getLength() {
    return this.heap.length;
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  heappush(value) {
    this.heap.push(value);
    let curIdx = this.heap.length - 1;
    let parentIdx = Math.floor(curIdx / 2);

    while (curIdx > 1 && this.heap[curIdx] < this.heap[parentIdx]) {
      this.swap(curIdx, parentIdx);
      curIdx = parentIdx;
      parentIdx = Math.floor(curIdx / 2);
    }
  }

  heappop() {
    const min = this.heap[1];
    if (this.heap.length <= 2) this.heap = [null];
    else this.heap[1] = this.heap.pop();

    let curIdx = 1;
    let leftIdx = curIdx * 2;
    let rightIdx = curIdx * 2 + 1;

    if (!this.heap[leftIdx]) return min;
    if (!this.heap[rightIdx]) {
      if (this.heap[leftIdx] < this.heap[curIdx]) {
        this.swap(leftIdx, curIdx);
      }
      return min;
    }

    while (this.heap[leftIdx] < this.heap[curIdx] || this.heap[rightIdx] < this.heap[curIdx]) {
      const minIdx = this.heap[rightIdx] < this.heap[leftIdx] ? rightIdx : leftIdx;
      this.swap(minIdx, curIdx);
      curIdx = minIdx;
      leftIdx = curIdx * 2;
      rightIdx = curIdx * 2 + 1;
    }

    return min;
  }

  getHeap() {
    return this.heap;
  }
}

for (let i = 0; i < M; i++) {
  graph[order[i][0]].push(order[i][1]);
  ingreeded[order[i][1]] += 1;
}

function solution() {
  let answer = "";
  const minHeap = new MinHeap();
  for (let i = 1; i <= N; i++) {
    if (!ingreeded[i]) {
      minHeap.heappush(i);
    }
  }

  while (minHeap.getLength() > 1) {
    const curNode = minHeap.heappop();
    answer += `${curNode} `;
    const next = graph[curNode];
    ingreeded[next] -= 1;
    for (let i = 0; i < next.length; i++) {
      if (!ingreeded[next]) minHeap.heappush(next[i]);
    }
  }
  return answer;
}

console.log(solution());
