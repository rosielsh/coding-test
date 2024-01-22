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
            const pIdx = Math.floor((idx - 1) / 2);

            if (this.heap[idx] >= this.heap[pIdx]) break;

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
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);

        return min;
    }

    heapifyDown(idx) {
        let leftChildIdx = 2 * idx + 1;
        let rightChildIdx = 2 * idx + 2;

        let smallIdx = idx;

        if (leftChildIdx < this.heap.length && this.heap[leftChildIdx] < this.heap[smallIdx]) {
            smallIdx = leftChildIdx;
        }

        if (rightChildIdx < this.heap.length && this.heap[rightChildIdx] < this.heap[smallIdx]) {
            smallIdx = rightChildIdx;
        }

        if (smallIdx === idx) return;

        this.swap(idx, smallIdx);
        this.heapifyDown(smallIdx);
    }
}
