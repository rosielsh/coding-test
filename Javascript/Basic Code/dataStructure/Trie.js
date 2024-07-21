class Node {
    constructor(value = "") {
        this.value = value;
        this.isEnd = false;
        this.children = {};
    }
}

class Trie {
    constructor() {
        this.root = new Node();
    }

    insert(string) {
        let curNode = this.root;

        for (let s of string) {
            if (curNode.children[s] === undefined) {
                curNode.children[s] = new Node(curNode.value + s);
            }

            curNode = curNode.children[s];
        }

        curNode.isEnd = true;
    }

    search(string) {
        let curNode = this.root;

        for (let s of string) {
            if (curNode.children[s]) {
                curNode = curNode.children[s]; // a가 있으면 a를 현재 노드로 재설정해서 자식 탐색
            } else return "";
        }

        return curNode.value; // apple를 찾고자 한다면 마지막 curNode의 value는 apple일 것
    }
}
