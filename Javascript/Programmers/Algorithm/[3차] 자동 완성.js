class Node {
    constructor(value = "") {
        this.value = value;
        this.isEnd = false;
        this.children = {};
        this.wordCnt = 0;
    }
}

class Trie {
    constructor() {
        this.root = new Node();
    }

    insert(string) {
        let curNode = this.root;

        let i = 0;
        for (let s of string) {
            if (curNode.children[s] === undefined) {
                curNode.children[s] = new Node(curNode.value + s);
                curNode.children[s].wordCnt = 1;
            } else {
                curNode.children[s].wordCnt += 1;
            }

            curNode = curNode.children[s];
        }

        curNode.isEnd = true;
    }

    search(string) {
        let curNode = this.root;

        let i = 0;
        for (let s of string) {
            if (curNode.children[s].wordCnt === 1) {
                i++;
                break;
            }

            i++;
            curNode = curNode.children[s];
        }

        return i;
    }
}

function solution(words) {
    var answer = 0;

    const trie = new Trie();

    for (let word of words) {
        trie.insert(word);
    }

    for (let word of words) {
        answer += trie.search(word);
    }

    return answer;
}
