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

function solution(jobs) {
    var answer = 0;

    const pq = new PriorityQueue();

    jobs.sort((a, b) => a[0] - b[0]);

    let time = 0;
    let jPtr = 0;
    let cnt = 0;
    while (cnt < jobs.length) {
        while (jPtr < jobs.length && jobs[jPtr][0] <= time) {
            pq.push(jobs[jPtr++]);
        }

        if (pq.getSize() === 0) {
            time = jobs[jPtr][0];
        } else {
            const [start, during] = pq.pop();
            answer += time - start + during;
            time += during;
            cnt++;
        }

        debugger;
    }

    answer = parseInt(answer / jobs.length);

    return answer;
}
