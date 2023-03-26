// 녹색 옷 입은 애가 젤다지 ?

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

class Heap {
  constructor() {
    this.heap = [];
  }

  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
  }

  findParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  findLeftChildIndex(index) {
    return index * 2 + 1;
  }

  findRightChildIndex(index) {
    return index * 2 + 2;
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
    let index = this.heap.length - 1; // 최근 추가된 원소

    while (this.findParent(index) && this.findParent(index)[2] > this.heap[index][2]) {
      // 바꾼다
      this.swap(index, this.findParentIndex(index));
      // 계속해서 최소 힙을 만들어준다
      index = this.findParentIndex(index);
    }
  }

  heapifyDown() {
    let index = 0; // 최근 삭제한 원소

    // 자식 중 하나라도 작은게 존재
    while (
      (this.findLeftChild(index) && this.findLeftChild(index)[2] < this.heap[index][2]) ||
      (this.findRightChild(index) && this.findRightChild(index)[2] < this.heap[index][2])
    ) {
      let smallerIdx = this.findLeftChildIndex(index);

      // 오른쪽 자식이 있고, 왼쪽보다 더 작으면 오른쪽으로 갱신
      if (this.findRightChild(index) && this.findRightChild(index)[2] < this.heap[smallerIdx][2]) {
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
    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const value = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();

    return value;
  }
}

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

function dijkstra(N, cave) {
  const minHeap = new MinHeap(); // 최소 힙
  minHeap.push([0, 0, cave[0][0]]);
  const route = Array.from({ length: N }, () => Array(N).fill(Infinity)); // 최단 경로
  route[0][0] = cave[0][0]; // 현재 위치 경로 저장
  const visited = Array.from({ length: N }, () => Array(N).fill(0)); // 방문 체크
  visited[0][0] = 1;

  while (minHeap.size()) {
    [x, y, weight] = minHeap.pop();

    for (let i = 0; i < 4; i++) {
      nx = x + dx[i];
      ny = y + dy[i];

      if (nx < 0 || nx >= N || ny < 0 || ny >= N || visited[nx][ny]) continue;

      if (route[nx][ny] > weight + cave[nx][ny]) {
        route[nx][ny] = weight + cave[nx][ny];
        visited[nx][ny] = 1;
        minHeap.push([nx, ny, route[nx][ny]]);
      }
    }
  }

  return route[N - 1][N - 1];
}

function solution() {
  let answer = [];

  let cnt = 1;
  while (1) {
    let N = +input.shift();
    if (!N) break;
    let cave = input.splice(0, N).map((x) => x.split(" ").map(Number));
    answer.push(`Problem ${cnt++}: ${dijkstra(N, cave)}`);
  }

  return answer.join("\n");
}

console.log(solution());
