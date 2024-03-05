const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

class PriorityQueue {
    constructor() {
        this.heap = [];
    }

    swap(a, b) {
        const temp = this.heap[a];
        this.heap[a] = this.heap[b];
        this.heap[b] = temp;
    }

    push(data) {
        this.heap.push(data);
        this.heapifyUp();
    }

    // 최소힙으로 정렬하는 함수
    heapifyUp() {
        // 현재 원소가 들어간 인덱스
        let idx = this.heap.length - 1;

        while (idx > 0) {
            // 부모 인덱스 => 3번 자식의 부모는 1번
            const pIdx = Math.floor((idx - 1) / 2);

            // 자식이 더 크면 종료
            if (this.heap[idx][2] >= this.heap[pIdx][2]) break;

            this.swap(idx, pIdx);
            idx = pIdx;
        }
    }

    pop() {
        if (this.heap.length === 0) return;

        if (this.heap.length === 1) {
            return this.heap.pop();
        }

        const min = this.heap[0];
        this.heap[0] = this.heap.pop(); // 제일 뒤에 있는 원소를 제일 앞으로
        this.heapifyDown(0);

        return min;
    }

    heapifyDown(idx) {
        const leftChildIdx = idx * 2 + 1;
        const rightChildIdx = idx * 2 + 2;

        // 결과적으로 젤 작은 인덱스
        let minIdx = idx;

        if (leftChildIdx < this.heap.length && this.heap[leftChildIdx][2] < this.heap[minIdx][2]) {
            minIdx = leftChildIdx;
        }

        if (
            rightChildIdx < this.heap.length &&
            this.heap[rightChildIdx][2] < this.heap[minIdx][2]
        ) {
            minIdx = rightChildIdx;
        }

        // 내가 젤 작음
        if (minIdx === idx) return;

        this.swap(minIdx, idx);
        this.heapifyDown(minIdx);
    }

    getSize() {
        return this.heap.length;
    }
}

while (true) {
    const [m, n] = input.shift().split(" ").map(Number);
    if (m === 0 && n === 0) break;
    const road = input.splice(0, n).map((x) => x.split(" ").map(Number));

    const pq = new PriorityQueue();

    let totalCost = 0;
    for (let i = 0; i < n; i++) {
        pq.push(road[i]);
        totalCost += road[i][2];
    }

    // 집합 번호
    const parent = Array.from({ length: m }, (_, idx) => idx);

    const getParent = (x) => {
        if (parent[x] === x) return x;
        return (parent[x] = getParent(parent[x]));
    };

    let connectCnt = 0;
    let costSum = 0;

    // 전체 간선 수 만큼 반복
    while (pq.getSize() > 0) {
        const [x, y, cost] = pq.pop();

        const px = getParent(x);
        const py = getParent(y);

        if (px === py) continue;

        if (px < py) parent[py] = px;
        else parent[px] = py;

        connectCnt++;
        costSum += cost;

        if (connectCnt === m - 1) break;
    }

    console.log(totalCost - costSum);
}
