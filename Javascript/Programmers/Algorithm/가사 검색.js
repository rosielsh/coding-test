class Node {
    constructor(value = "") {
        this.value = value;
        this.isEnd = false;
        this.children = {};
        this.childrenLen = {}; // 현재까지의 단어에서 가질 수 있는 (단어의 길이):(개수)를 저장
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

            curNode.childrenLen[string.length] = (curNode.childrenLen[string.length] || 0) + 1;
            curNode = curNode.children[s];
        }

        curNode.isEnd = true;
    }

    search(string) {
        let curNode = this.root;

        for (let s of string) {
            if (s === "?") break;

            if (curNode.children[s]) {
                curNode = curNode.children[s];
            } else return 0; // 없음
        }

        return curNode.childrenLen[string.length] || 0;
    }
}

function solution(words, queries) {
    var answer = [];

    const trie = new Trie();
    const rTrie = new Trie();

    for (let word of words) {
        trie.insert(word);
        rTrie.insert(word.split("").reverse().join(""));
    }

    for (let query of queries) {
        // 뒤에서 부터 탐색
        if (query[0] === "?") {
            answer.push(rTrie.search(query.split("").reverse().join("")));
        } else {
            answer.push(trie.search(query));
        }
    }

    return answer;
}
