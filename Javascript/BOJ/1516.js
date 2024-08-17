const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();
const info = input.map((x) => x.split(" ").map(Number));

const graph = Array.from({ length: N + 1 }, () => []);
const indegree = Array.from({ length: N + 1 }, () => 0);
const time = Array.from({ length: N + 1 }, () => 0);

let idx = 1;
for (let [t, ...rest] of info) {
    rest.splice(rest.length - 1, 1);

    time[idx] = t;

    for (let r of rest) {
        graph[r].push(idx);
        indegree[idx]++;
    }

    idx++;
}

const queue = [];
const result = Array.from({ length: N + 1 }, () => 0);

for (let i = 1; i <= N; i++) {
    if (indegree[i] === 0) {
        queue.push(i);
        result[i] = time[i];
    }
}

while (queue.length > 0) {
    const node = queue.shift();

    for (let next of graph[node]) {
        indegree[next]--;

        result[next] = Math.max(result[next], result[node] + time[next]);

        if (indegree[next] === 0) {
            queue.push(next);
        }
    }
}

result.shift();
console.log(result.join("\n"));
