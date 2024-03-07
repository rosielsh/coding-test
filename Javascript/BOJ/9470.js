const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const T = +input.shift();

for (let t = 0; t < T; t++) {
    const [K, M, P] = input.shift().split(" ").map(Number);
    const edge = input.splice(0, P).map((x) => x.split(" ").map(Number));

    const graph = Array.from({ length: M + 1 }, () => []);
    const revgraph = Array.from({ length: M + 1 }, () => []);
    const indegree = Array.from({ length: M + 1 }, () => 0);
    const order = Array.from({ length: M + 1 }, () => 0); // 순서

    for (let [a, b] of edge) {
        graph[a].push(b);
        revgraph[b].push(a);
        indegree[b]++;
    }

    // 위상 정렬
    const queue = [];
    for (let i = 1; i <= M; i++) {
        if (!indegree[i]) {
            queue.push(i);
            order[i] = 1;
        }
    }

    while (queue.length > 0) {
        const curNode = queue.shift();

        for (let i = 0; i < graph[curNode].length; i++) {
            const nextNode = graph[curNode][i];

            indegree[nextNode]--;

            if (!indegree[nextNode]) {
                queue.push(nextNode);
            }
        }

        // 순서 저장
        let maxVal = order[curNode];
        let maxCnt = 0;
        for (let i = 0; i < revgraph[curNode].length; i++) {
            const fromNode = revgraph[curNode][i];

            if (maxVal === order[fromNode]) {
                maxCnt++;
            } else if (maxVal < order[fromNode]) {
                maxVal = order[fromNode];
                maxCnt = 1;
            }
        }

        if (maxCnt > 1) {
            order[curNode] = maxVal + 1;
        } else {
            order[curNode] = maxVal;
        }
    }

    console.log(K + " " + Math.max(...order));
}
