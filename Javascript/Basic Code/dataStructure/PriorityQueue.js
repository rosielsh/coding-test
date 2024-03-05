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
        this.heap[0] = this.heap.pop(); // 제일 뒤에 있는 원소를 제일 앞으로
        this.heapifyDown(0);

        return min;
    }

    heapifyDown(idx) {
        const leftChildIdx = idx * 2 + 1;
        const rightChildIdx = idx * 2 + 2;

        // 결과적으로 젤 작은 인덱스
        let minIdx = idx;

        if (leftChildIdx < this.heap.length && this.heap[leftChildIdx] < this.heap[minIdx]) {
            minIdx = leftChildIdx;
        }

        if (rightChildIdx < this.heap.length && this.heap[rightChildIdx] < this.heap[minIdx]) {
            minIdx = rightChildIdx;
        }

        // 내가 젤 작음
        if (minIdx === idx) return;

        this.swap(minIdx, idx);
        this.heapifyDown(minIdx);
    }
}
