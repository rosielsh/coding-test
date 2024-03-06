const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const T = +input.shift();

class PriorityQueue {
    constructor() {
        this.heap = [];
    }

    swap(x, y) {
        const temp = this.heap[x];
        this.heap[x] = this.heap[y];
        this.heap[y] = temp;
    }

    push(data) {
        this.heap.push(data);
        this.heapifyUp();
    }

    heapifyUp() {
        let idx = this.heap.length - 1;

        while (idx > 0) {
            const pIdx = Math.floor((idx - 1) / 2);

            if (this.heap[pIdx][1] <= this.heap[idx][1]) break;

            this.swap(pIdx, idx);
            idx = pIdx;
        }
    }

    pop() {
        if (!this.heap.length) return;

        if (this.heap.length === 1) return this.heap.pop();

        const res = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return res;
    }

    heapifyDown(idx) {
        const leftChildIdx = idx * 2 + 1;
        const rightChildIdx = idx * 2 + 2;

        let minIdx = idx;
        if (leftChildIdx < this.heap.length && this.heap[idx][1] > this.heap[leftChildIdx][1]) {
            minIdx = leftChildIdx;
        }

        if (rightChildIdx < this.heap.length && this.heap[idx][1] > this.heap[rightChildIdx][1]) {
            minIdx = rightChildIdx;
        }

        if (minIdx === idx) return;

        this.swap(minIdx, idx);
        this.heapifyDown(minIdx);
    }

    size() {
        return this.heap.length;
    }
}

for (let t = 0; t < T; t++) {
    const [n, d, c] = input.shift().split(" ").map(Number); // 컴퓨터 개수, 의존성 개수
    const edge = input.splice(0, d).map((x) => x.split(" ").map(Number));

    const graph = Array.from({ length: n + 1 }, () => []);

    for (let i = 0; i < d; i++) {
        const [a, b, s] = edge[i];
        graph[b].push([a, s]);
    }

    const mintimeArr = Array.from({ length: n + 1 }, () => Infinity); // 감염되기까지의 시간
    mintimeArr[c] = 0;

    const pq = new PriorityQueue();
    pq.push([c, 0]);

    while (pq.size() > 0) {
        const [curNode, time] = pq.pop();

        for (let i = 0; i < graph[curNode].length; i++) {
            const [nextNode, nextTime] = graph[curNode][i];

            // 다음 노드에 저장된 시간이 지금까지 시간 + 다음 노드에 감염될 시간보다 더 작으면 최솟값 갱신 할 필요 없음
            if (mintimeArr[nextNode] <= time + nextTime) continue;

            mintimeArr[nextNode] = time + nextTime;
            pq.push([nextNode, time + nextTime]);
        }
    }

    let cnt = 0;
    let maxTime = 0;
    for (let i = 1; i <= n; i++) {
        if (mintimeArr[i] !== Infinity) {
            cnt++;
        }

        if (mintimeArr[i] !== Infinity && mintimeArr[i] >= maxTime) {
            maxTime = mintimeArr[i];
        }
    }

    console.log(cnt, maxTime);
}
