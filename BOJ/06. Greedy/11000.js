// 강의실 배정

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[N, ...lecture] = require("fs").readFileSync(filePath).toString().trim().split("\n");
N = +N;
lecture = lecture.map((x) => x.split(" ").map(Number));
lecture.sort((a, b) => {
  if (a[0] === b[0]) return a[1] - b[1];
  else return a[0] - b[0];
});

class Heap {
  constructor() {
    this.heap = [];
  }

  getLeftChildIdx(parentIdx) {
    return parentIdx * 2 + 1;
  }

  getRightChildIdx(parentIdx) {
    return parentIdx * 2 + 2;
  }

  getParentIdx(idx) {
    return parseInt((idx - 1) / 2);
  }

  peek() {
    if (!this.heap[0]) return;
    return this.heap[0];
  }

  // 삽입 메서드
  insert(value) {
    // heap에 각 강의가 끝나는 시간 저장
    this.heap.push(value);
    this.heapifyUp(); // 배열의 끝에 넣고 minHeap의 형태로 구성
  }

  // 조건에 따라 min-heap구조로 만들어주는 함수
  // -> 삽입 노드가 제 자리를 찾아가도록 한다
  heapifyUp() {
    // index는 현재 노드를 가리키는 포인터 느낌
    let curIdx = this.heap.length - 1; // 전체 힙 길이
    const lastInsertedNode = this.heap[curIdx]; // 힙의 마지막 요소 저장 용도

    //  index는 끝에서 부터 0으로 감소하며 순회
    while (curIdx > 0) {
      const parentIdx = this.getParentIdx(curIdx);

      // 부모의 값이 마지막 삽입 된 노드 값보다 크다면 => 부모-자식 교환
      if (this.heap[parentIdx] >= lastInsertedNode) {
        // curIdx의 값을 부모 값으로 바꾸고, curIdx는 부모 인덱스로 변경
        this.heap[curIdx] = this.heap[parentIdx];
        curIdx = parentIdx;
      } else break; // 부모가 더 크지 않다면 => 최소힙 조건 만족
    }
    // curIdx에 현재 위치가 들어간 상황
    this.heap[curIdx] = lastInsertedNode;
  }

  // 제거 메서드
  remove() {
    const len = this.heap.length;
    const rootNode = this.heap[0];

    if (len <= 0) return;

    if (len === 1) {
      this.heap = [];
      return rootNode;
    } else {
      // 여러개 일 때
      this.heap[0] = this.heap.pop(); // 요소 하나 빼고
      this.heapifyDown(); // 최소힙 형태로 만들기
    }

    return rootNode;
  }

  heapifyDown() {
    let curIdx = 0;
    let len = this.heap.length;
    const rootNode = this.heap[curIdx];

    // leftChild가 있을 때 까지
    while (this.getLeftChildIdx(curIdx) < len) {
      const lChildIdx = this.getLeftChildIdx(curIdx);
      const rChildIdx = this.getRightChildIdx(curIdx);

      // 왼쪽 자식, 오른쪽 자식 중 더 작은 값 찾기
      let smallerChildIdx = 0;
      // 오른쪽 자식이 있으면 => 왼/오 자식 값 검사
      if (rChildIdx < len && this.heap[rChildIdx] < this.heap[lChildIdx]) {
        smallerChildIdx = rChildIdx;
      } else smallerChildIdx = lChildIdx;

      // 자식 노드의 더 작은 값과 루트와 비교
      if (this.heap[smallerChildIdx] <= rootNode) {
        this.heap[curIdx] = this.heap[smallerChildIdx];
        curIdx = smallerChildIdx;
      } else break;
    }

    this.heap[curIdx] = rootNode;
  }
}

class PriorityQueue extends Heap {
  constructor() {
    super();
  }

  enqueue(value) {
    return this.insert(value);
  }

  dequeue() {
    return this.remove();
  }

  isEmpty() {
    return this.heap.length <= 0;
  }

  peek() {
    return this.heap[0];
  }

  getSize() {
    return this.heap.length;
  }
}

function solution() {
  const pq = new PriorityQueue();
  pq.enqueue(lecture[0][1]); // 첫 수업이 끝나는 시간 저장

  for (let i = 1; i < N; i++) {
    // 두번째 수업부터 진행
    // 큐의 root : 제일 빨리 끝나는 강의 시간 <= 현재 강의 시간
    // => 현재 강의 진행 가능하므로
    if (pq.peek() <= lecture[i][0]) {
      pq.dequeue();
    }
    // 다음 강의 삽입
    pq.enqueue(lecture[i][1]);
  }

  return pq.getSize();
}

console.log(solution());
