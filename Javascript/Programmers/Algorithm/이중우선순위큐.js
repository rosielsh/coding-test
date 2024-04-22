function solution(operations) {
    var answer = [];

    class MinHeap {
        constructor() {
            this.heap = [];
        }

        swap(a, b) {
            let temp = this.heap[a];
            this.heap[a] = this.heap[b];
            this.heap[b] = temp;
        }

        push(data) {
            this.heap.push(data);
            this.heapifyUp();
        }

        pop(type) {
            if (this.heap.length === 0) return null;

            if (this.heap.length === 1) return this.heap.pop();

            // 최댓값 삭제
            if (type === 1) {
                const leafParent = parseInt((this.heap.length - 1) / 2);
                const leafNodes = this.heap.slice(leafParent);
                const max = Math.max(...leafNodes);
                this.swap(this.heap.length - 1, leafParent + leafNodes.indexOf(max));
                return this.heap.pop();
            }

            // 최솟값 삭제
            if (type === -1) {
                const min = this.heap[0];
                this.heap[0] = this.heap.pop();

                this.heapifyDown(0);

                return min;
            }
        }

        heapifyUp() {
            let idx = this.heap.length - 1;
            while (idx > 0) {
                let parentIdx = parseInt(idx / 2);

                if (this.heap[idx] > this.heap[parentIdx]) break;

                this.swap(idx, parentIdx);

                idx = parentIdx;
            }
        }

        heapifyDown(idx) {
            let minIdx = idx;
            let leftChildIdx = idx * 2 + 1;
            let rightChildIdx = idx * 2 + 2;

            if (leftChildIdx < this.heap.length && this.heap[minIdx] > this.heap[leftChildIdx])
                minIdx = leftChildIdx;
            if (rightChildIdx < this.heap.length && this.heap[minIdx] > this.heap[rightChildIdx])
                minIdx = rightChildIdx;
            if (minIdx === idx) return;
            this.swap(minIdx, idx);
            this.heapifyDown(minIdx);
        }

        getHeap() {
            return this.heap;
        }
    }

    const minHeap = new MinHeap();

    for (let oper of operations) {
        const [cmd, num] = oper.split(" ");

        if (cmd === "I") {
            minHeap.push(+num);
        } else if (cmd === "D") {
            minHeap.pop(+num);
        }
    }

    const heap = minHeap.getHeap();
    heap.sort((a, b) => a - b);

    if (heap.length === 0) {
        answer = [0, 0];
    } else {
        answer = [heap[heap.length - 1], heap[0]];
    }

    return answer;
}
