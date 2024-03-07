const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const student = input.map((x) => x.split(" ").map(Number));

const result = [];

const graph = Array.from({ length: N + 1 }, () => []);
const indegree = Array.from({ length: N + 1 }, () => 0);

for (let [a, b] of student) {
    graph[a].push(b);
    indegree[b]++;
}

const queue = [];

for (let i = 1; i <= N; i++) {
    if (!indegree[i]) {
        queue.push(i);
    }
}

while (queue.length > 0) {
    const node = queue.shift();

    result.push(node);

    for (let i = 0; i < graph[node].length; i++) {
        const next = graph[node][i];

        indegree[next]--;

        if (!indegree[next]) {
            queue.push(next);
        }
    }
}

console.log(result.join(" "));
