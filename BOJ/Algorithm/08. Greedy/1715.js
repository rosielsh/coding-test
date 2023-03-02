// 카드 정렬하기

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const N = +input.shift();
const card = input.map(Number);

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

    while (
      this.heap[leftIdx] < this.heap[curIdx] ||
      this.heap[rightIdx] < this.heap[curIdx]
    ) {
      const minIdx =
        this.heap[rightIdx] < this.heap[leftIdx] ? rightIdx : leftIdx;
      this.swap(minIdx, curIdx);
      curIdx = minIdx;
      leftIdx = curIdx * 2;
      rightIdx = curIdx * 2 + 1;
    }

    return min;
  }
}

function solution() {
  let answer = 0;
  const minHeap = new MinHeap();
  for(let i=0; i<N; i++) {
    minHeap.heappush(card[i]);
  }

  for(let i=0; i<N-1; i++) {
    first = minHeap.heappop();
    second = minHeap.heappop();
    answer = answer + first + second;
    minHeap.heappush(first+second);
  }

  return answer;
}

console.log(solution());