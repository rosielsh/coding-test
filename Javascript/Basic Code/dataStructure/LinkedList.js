class Node {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

class LinkedList {
    constructor(head = null) {
        this.head = head;
        this.size = 0;
    }

    insertFist(data) {
        this.head = new Node(data, this.head);
        this.size++;
    }

    insertLast(data) {
        const node = new Node(data);

        let cur;

        if (this.head === null) this.head = node;
        else {
            cur = this.head;

            while (cur.next) cur = cur.next; // head에서부터 next가 없을 때 까지 이동

            cur.next = node; // 마지막 노드의 다음에 node를 삽입
        }

        this.size++;
    }

    getAt(idx) {
        let cur = this.head;
        let cnt = 0;

        while (cur) {
            if (cnt === idx) return cur.data;
            cnt++;
            cur = cur.next; // 앞에서부터 다음 노드로 이동
        }
    }

    removeAt(idx) {
        if (idx > this.size) return;

        let cur = this.head;
        let prev;
        let cnt = 0;

        if (idx === 0) this.head = cur.next;
        else {
            while (cnt < idx) {
                cnt++;
                prev = cur; // 이전 노드를 저장
                cur = cur.next; // 다음 노드로 이동
            }

            prev.next = cur.next; // 이전 노드의 다음을 현재의 다음으로 = cur 노드 삭제
        }

        this.size--;
    }

    clearList() {
        this.head = null;
        this.size = 0;
    }

    printList() {
        let cur = this.head;
        const datas = [];

        while (cur) {
            datas.push(cur.data);
            cur = cur.next;
        }

        return datas.join(" ");
    }
}

const linkedList = new LinkedList();

linkedList.insertFist(100);
linkedList.insertFist(200);
linkedList.insertFist(300);
linkedList.insertFist(400);
linkedList.insertFist(500, 1);

console.log(linkedList.printList());

linkedList.removeAt(2);

console.log(linkedList.printList());
