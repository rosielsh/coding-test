class Node {
    constructor(data, prev = null, next = null) {
        this.data = data;
        this.prev = prev;
        this.next = next;
    }
}

function solution(n, k, cmd) {
    var answer = "";

    const delNodes = [];

    const rootNode = new Node(0);
    let prev = rootNode;

    let cur;

    // 1번부터 n-1번 노드 저장
    for (let i = 1; i < n; i++) {
        const newNode = new Node(i, prev);
        prev.next = newNode;
        prev = newNode;

        if (i === k) cur = newNode;
    }

    const move = (dir, cnt) => {
        if (dir === "U") {
            for (let i = 0; i < cnt; i++) {
                if (!cur.prev) break;
                cur = cur.prev;
            }
        } else {
            for (let i = 0; i < cnt; i++) {
                if (!cur.next) break;
                cur = cur.next;
            }
        }
    };

    const del = () => {
        const prev = cur.prev;
        const next = cur.next;

        delNodes.push(cur);

        cur = next ? next : prev;

        if (prev) prev.next = next;
        if (next) next.prev = prev;
    };

    const recover = () => {
        const rNode = delNodes.pop();

        const prev = rNode.prev;
        const next = rNode.next;

        if (prev) prev.next = rNode;
        if (next) next.prev = rNode;
    };

    for (let c of cmd) {
        const [key, val] = c.split(" ");

        switch (key) {
            case "U": {
                move("U", +val);
                break;
            }
            case "D": {
                move("D", +val);
                break;
            }
            case "C": {
                del();
                break;
            }
            case "Z": {
                recover();
                break;
            }
        }
    }

    const isDeleted = Array.from({ length: n }, () => false);

    for (let node of delNodes) {
        isDeleted[node.data] = true;
    }

    answer = isDeleted.map((x) => (x ? "X" : "O")).join("");

    return answer;
}
