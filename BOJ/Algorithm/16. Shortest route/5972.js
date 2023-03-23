// 택배 배송

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[NM, ...edge] = require('fs').readFileSync(filePath).toString().trim().split('\n');
[N, M] = NM.split(' ').map(Number);

const graph = Array.from({length: N+1}, ()=>[]);
edge.forEach(data => {
  [from, to, weight] = data.split(' ').map(Number);
  graph[from].push([to, weight]);
  graph[to].push([from, weight]);
})

class Heap {
  constructor() {
    this.heap = [];
  }

  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
  }

  findParentIndex(index) {
    return Math.floor((index-1)/2);
  }

  findLeftChildIndex(index) {
    return index*2 + 1;
  }

  findRightChildIndex(index) {
    return index*2 + 2;
  }

  findParent(index) {
    return this.heap[this.findParentIndex(index)];
  }

  findLeftChild(index) {
    return this.heap[this.findLeftChildIndex(index)];
  }

  findRightChild(index) {
    return this.heap[this.findRightChildIndex(index)];
  }

  peek() {
    return this.heap[0];
  }

  size() {
    return this.heap.length;
  }
}

class MinHeap extends Heap {
  heapifyUp() {
    let index = this.heap.length-1; // 최근 추가된 원소 

    // 부모 값이 존재하고, 자식이 부모보다 작다면 
    while(this.findParent(index) && this.findParent(index)[1] > this.heap[index][1]) {
      // 바꾼다 
      this.swap(index, this.findParentIndex(index));
      // 계속해서 최소 힙을 만들어준다 
      index = this.findParentIndex(index);
    }
  }

  heapifyDown() {
    let index = 0; // 최근 삭제한 원소 

    // 자식 중 하나라도 작은게 존재 
    while((this.findLeftChild(index) && this.findLeftChild(index)[1] < this.heap[index][1]) ||
    (this.findRightChild(index) && this.findRightChild(index)[1] < this.heap[index][1])) {
      let smallerIdx = this.findLeftChildIndex(index);

      // 오른쪽 자식이 있고, 왼쪽보다 더 작으면 오른쪽으로 갱신 
      if(this.findRightChild(index) && this.findRightChild(index)[1] < this.heap[smallerIdx][1]) {
        smallerIdx = this.findRightChildIndex(index);
      }

      this.swap(index, smallerIdx);

      index = smallerIdx;
    }
  }

  push(value) {
    this.heap.push(value);
    this.heapifyUp();
  }
  
  pop() {
    if(this.heap.length === 1) {
      return this.heap.pop();
    }

    const value = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();

    return value;
  }
}

function dijkstra(start) {
  const minHeap = new MinHeap();
  const distance = Array.from({length: N+1}, ()=>Infinity);
  distance[start] = 0;
  minHeap.push([start, 0]);

  while(minHeap.size()) {
    [vertex, weight] = minHeap.pop();

    if(!graph[vertex] || distance[vertex] < weight) continue;

    for(let i=0; i<graph[vertex].length; i++) {
      [nextVertex, nextWeight] = graph[vertex][i];

      if(distance[nextVertex] > weight + nextWeight) {
        distance[nextVertex] = weight + nextWeight;
        minHeap.push([nextVertex, distance[nextVertex]]);
      }
    }
  }

  return distance[N];
}

function solution() {
  let answer = dijkstra(1);
  return answer;
}

console.log(solution());