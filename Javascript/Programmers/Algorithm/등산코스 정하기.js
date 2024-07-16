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

    heapifyUp() {
        let idx = this.heap.length - 1;

        while (idx > 0) {
            const pIdx = parseInt((idx - 1) / 2);

            if (this.heap[pIdx][1] <= this.heap[idx][1]) break;

            this.swap(idx, pIdx);

            idx = pIdx;
        }
    }

    pop() {
        if (this.heap.length === 1) return this.heap.pop();

        const val = this.heap[0];
        this.heap[0] = this.heap.pop();

        this.heapifyDown(0);

        return val;
    }

    heapifyDown(idx) {
        const leftChild = idx * 2 + 1;
        const rightChild = idx * 2 + 2;

        let minIdx = idx;

        if (leftChild < this.heap.length && this.heap[minIdx][1] > this.heap[leftChild][1])
            minIdx = leftChild;
        if (rightChild < this.heap.length && this.heap[minIdx][1] > this.heap[rightChild][1])
            minIdx = rightChild;

        if (minIdx === idx) return;

        this.swap(minIdx, idx);
        this.heapifyDown(minIdx);
    }

    size() {
        return this.heap.length;
    }
}

function solution(n, paths, gates, summits) {
    var answer = [];

    const graph = Array.from({ length: n + 1 }, () => []);
    const minIntensity = Array(n + 1).fill(Infinity);

    const pq = new PriorityQueue();

    const summitSet = new Set(summits);

    for (let gate of gates) {
        minIntensity[gate] = 0;
        pq.push([gate, 0]);
    }

    for (let [from, to, weight] of paths) {
        graph[from].push([to, weight]);
        graph[to].push([from, weight]);
    }

    while (pq.size() > 0) {
        // 현재 정점, 비용
        const [vertex, weight] = pq.pop();

        if (summitSet.has(vertex) || minIntensity[vertex] < weight) continue;

        for (let [nVertex, nWeight] of graph[vertex]) {
            // 최대 intensity
            const max = Math.max(nWeight, weight);

            if (minIntensity[nVertex] <= max) continue;

            minIntensity[nVertex] = max;
            pq.push([nVertex, max]);
        }
    }

    summits.sort((a, b) => a - b);

    answer[0] = 0;
    answer[1] = Infinity;

    for (let s of summits) {
        if (answer[1] > minIntensity[s]) {
            answer[1] = minIntensity[s];
            answer[0] = s;
        }
    }

    return answer;
}
