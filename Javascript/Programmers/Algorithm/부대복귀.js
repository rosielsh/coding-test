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

            if (this.heap[pIdx][1] < this.heap[idx][1]) break;

            this.swap(pIdx, idx);

            idx = pIdx;
        }
    }

    pop() {
        if (this.heap.length === 0) return;
        if (this.heap.length === 1) return this.heap.pop();

        const front = this.heap[0];

        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);

        return front;
    }

    heapifyDown(idx) {
        const lChild = idx * 2 + 1;
        const rChild = idx * 2 + 2;

        let minIdx = idx;

        if (lChild < this.heap.length && this.heap[minIdx][1] > this.heap[lChild][1]) {
            minIdx = lChild;
        }

        if (rChild < this.heap.length && this.heap[minIdx][1] > this.heap[rChild][1]) {
            minIdx = rChild;
        }

        if (minIdx === idx) return;

        this.swap(minIdx, idx);

        this.heapifyDown(minIdx);
    }

    getSize() {
        return this.heap.length;
    }
}

function solution(n, roads, sources, destination) {
    var answer = [];

    const dist = Array.from({ length: n + 1 }, () => Infinity);

    const graph = Array.from({ length: n + 1 }, () => []);

    for (let [a, b] of roads) {
        graph[a].push(b);
        graph[b].push(a);
    }

    const pq = new PriorityQueue();

    pq.push([destination, 0]);
    dist[destination] = 0;

    while (pq.getSize() > 0) {
        const [cur, min] = pq.pop();

        for (let i = 0; i < graph[cur].length; i++) {
            const next = graph[cur][i];

            if (dist[next] > min + 1) {
                dist[next] = min + 1;
                pq.push([next, min + 1]);
            }
        }
    }

    for (let s of sources) {
        answer.push(dist[s] === Infinity ? -1 : dist[s]);
    }

    return answer;
}
