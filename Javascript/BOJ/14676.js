const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, M, K] = input.shift().split(" ").map(Number);
const edge = input.splice(0, M).map((x) => x.split(" ").map(Number));
const yw = input.map((x) => x.split(" ").map(Number));

const graph = Array.from({ length: N + 1 }, () => []);
const indegree = Array.from({ length: N + 1 }, () => 0);

for (let [a, b] of edge) {
    indegree[b]++;
    graph[a].push(b);
}

const buildCnt = Array.from({ length: N + 1 }, () => 0); // 해당 번호에 지은 건물 수

let flag = true;

for (let [a, num] of yw) {
    if (a === 1) {
        if (indegree[num] > 0) {
            flag = false;
            break;
        }

        buildCnt[num]++;

        if (buildCnt[num] === 1) {
            for (let i of graph[num]) {
                indegree[i]--;
            }
        }
    } else if (a === 2) {
        if (buildCnt[num] === 0) {
            flag = false;
            break;
        }

        buildCnt[num]--;

        if (buildCnt[num] === 0) {
            for (let i of graph[num]) {
                indegree[i]++;
            }
        }
    }
}

console.log(flag ? "King-God-Emperor" : "Lier!");
