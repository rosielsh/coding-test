const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);

const graph = Array.from({ length: N + 1 }, () => []);

let mVal = -1;
for (let i = 0; i < M; i++) {
    const [A, B, C] = input[i].split(" ").map(Number);

    graph[A].push([B, C]);
    graph[B].push([A, C]);

    mVal = Math.max(mVal, C);
}

const [s, e] = input[M].split(" ").map(Number);

// 현재 중량 제한 : weight
const bfs = (weight) => {
    const visited = Array.from({ length: N + 1 }, () => false);
    const queue = [s];
    visited[s] = true;

    while (queue.length) {
        const curNode = queue.shift();

        if (curNode === e) return true;

        for (let i = 0; i < graph[curNode].length; i++) {
            const [nextNode, nextWeight] = graph[curNode][i];

            if (visited[nextNode]) continue;
            if (nextWeight < weight) continue; // 다음 갈려고 하는 길의 제한이 더 낮으면 안감

            visited[nextNode] = true;
            queue.push(nextNode);
        }
    }

    return false;
};

let left = 1;
let right = mVal;

while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    // 해당 mid값을 중량 제한이라고 쳤을 때 s -> e 까지 갈 수 있는지 여부
    const res = bfs(mid);

    if (res) {
        left = mid + 1;
    } else {
        right = mid - 1;
    }
}

console.log(right);
