const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

// 트리의 지름 알고리즘
// 임의의 정점에서 가장 먼 노드를 찾고, 그 노드에서 가장 먼 노드 찾기

const n = +input.shift();
const graph = Array.from({ length: n + 1 }, () => []);

for (let i = 0; i < n - 1; i++) {
    const [p, c, w] = input[i].split(" ").map(Number);
    graph[p].push([c, w]);
    graph[c].push([p, w]);
}

const bfs = (idx) => {
    const queue = [[idx, 0]];
    const visited = Array.from({ length: n + 1 }, () => false);
    visited[idx] = true;

    // 최대 노드값, 그때의 지름
    let max = [0, 0];

    while (queue.length) {
        const [cIdx, sum] = queue.shift();

        for (let [i, w] of graph[cIdx]) {
            if (visited[i]) continue;
            visited[i] = true;

            // 최댓값 갱신
            if (max[1] < sum + w) {
                max[0] = i;
                max[1] = sum + w;
            }

            queue.push([i, sum + w]);
        }
    }

    return max;
};

const fNode = bfs(1);
console.log(bfs(fNode[0])[1]);
