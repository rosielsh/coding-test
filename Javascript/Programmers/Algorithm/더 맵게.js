class PQ {
    constructor() {
        this.heap = [];
    }

    swap(a, b) {
        const temp = this.heap[a];
        this.heap[a] = this.heap[b];
        this.heap[b] = temp;
    }

    push(value) {
        this.heap.push(value);
        this.heapifyUp();
    }

    pop() {
        if (this.heap.length === 0) return;
        if (this.heap.length === 1) return this.heap.pop();

        const val = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);

        return val;
    }

    heapifyUp() {
        let idx = this.heap.length - 1;

        while (idx > 0) {
            let pIdx = parseInt((idx - 1) / 2);

            if (this.heap[pIdx] < this.heap[idx]) break;
            this.swap(pIdx, idx);
            idx = pIdx;
        }
    }

    heapifyDown(idx) {
        let leftIdx = idx * 2 + 1;
        let rightIdx = idx * 2 + 2;

        let minIdx = idx;

        if (leftIdx < this.heap.length && this.heap[leftIdx] < this.heap[minIdx]) minIdx = leftIdx;
        if (rightIdx < this.heap.length && this.heap[rightIdx] < this.heap[minIdx])
            minIdx = rightIdx;

        if (minIdx === idx) return;

        this.swap(minIdx, idx);
        this.heapifyDown(minIdx);
    }

    getMin() {
        return this.heap[0];
    }

    getSize() {
        return this.heap.length;
    }
}

function solution(scoville, K) {
    var answer = 0;

    const pq = new PQ();

    for (let sc of scoville) {
        pq.push(sc);
    }

    let flag = false;

    while (pq.getSize() >= 2) {
        const min1 = pq.pop();
        const min2 = pq.pop();

        if (min1 >= K && min2 >= K) {
            flag = true;
            break;
        }

        const newScoville = min1 + min2 * 2;

        pq.push(newScoville);

        answer++;
    }

    if (pq.pop() >= K) flag = true;

    answer = flag ? answer : -1;

    return answer;
}
