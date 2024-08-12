const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const n = +input.shift();
const parents = input.shift().split(" ").map(Number);
const del = +input.shift();

const graph = Array.from({ length: n }, () => []);

let root = 0;
for (let i = 0; i < n; i++) {
    if (parents[i] === -1) {
        root = i;
        continue;
    }
    if (parents[i] === del || i === del) continue;
    graph[parents[i]].push(i);
}

let cnt = 0;
const dfs = (x) => {
    if (x === del) return;

    if (graph[x].length === 0) {
        cnt++;
        return;
    }

    for (let child of graph[x]) {
        dfs(child);
    }
};

dfs(root);
console.log(cnt);
