class MaxHeap {
  constructor() {
    this.heap = [];
  }

  swap(a, b) {
    const temp = this.heap[a];
    this.heap[a] = this.heap[b];
    this.heap[b] = temp;
  }

  peek() {
    return this.heap[0];
  }

  heappush(data) {
    this.heap.push(data);
    this.heapifyUp();
  }

  heapifyUp() {
    let currentIndex = this.heap.length - 1;

    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);

      if (this.heap[parentIndex] >= this.heap[currentIndex]) break;

      this.swap(currentIndex, parentIndex);
      currentIndex = parentIndex;
    }
  }

  heappop() {
    const firstValue = this.heap[0];
    const lastValue = this.heap.pop();

    if (this.heap.length === 0) return firstValue;

    this.heap[0] = lastValue;
    this.heapifyDown();
    return firstValue;
  }

  heapifyDown() {
    let currentIndex = 0;
    let size = this.heap.length;

    while (currentIndex < size) {
      let leftIdx = currentIndex * 2 + 1;
      let rightIdx = currentIndex * 2 + 2;
      let biggerIdx = currentIndex;

      if (leftIdx < size && this.heap[leftIdx] > this.heap[biggerIdx]) biggerIdx = leftIdx;
      if (rightIdx < size && this.heap[rightIdx] > this.heap[biggerIdx]) biggerIdx = rightIdx;

      if (biggerIdx === currentIndex) break;

      this.swap(currentIndex, biggerIdx);
      currentIndex = biggerIdx;
    }
  }

  getHeap() {
    return this.heap;
  }
}

function solution(n, works) {
  //  야근 피로도를 최소화 = 남은 일의 작업량의 제곱값을 최소화
  // works에서 가장 큰 수를 계속해서 뽑아내면서 n개 만큼 -1 해주고, 남아있는 works에 대해 제곱값 처리를 해줌

  var answer = 0;
  const maxHeap = new MaxHeap();

  works.forEach((work) => {
    maxHeap.heappush(work);
  });

  for (let i = 0; i < n; i++) {
    if (maxHeap.peek() === 0) continue;
    maxHeap.heappush(maxHeap.heappop() - 1);
  }

  maxHeap.getHeap().forEach((work) => {
    answer += work ** 2;
  });

  return answer;
}
