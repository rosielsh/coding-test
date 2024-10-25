const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input.shift().split(" ").map(Number);
const map = input.map((x) => x.split(" ").map(Number));

let answer = Number.MAX_SAFE_INTEGER;
const chickenPos = [];
const housePos = [];

for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
        if (map[i][j] === 1) housePos.push([i, j]);
        if (map[i][j] === 2) chickenPos.push([i, j]);
    }
}

const calcSum = (chicken) => {
    let sum = 0;
    for (let [x, y] of housePos) {
        let minDist = Number.MAX_SAFE_INTEGER;
        for (let [cx, cy] of chicken) {
            minDist = Math.min(minDist, Math.abs(cx - x) + Math.abs(cy - y));
        }
        sum += minDist;
    }

    return sum;
};

const cCnt = chickenPos.length;

const dfs = (depth, idx, selected) => {
    if (depth === M) {
        const sum = calcSum(selected);
        if (sum < answer) answer = sum;
        return;
    }

    for (let i = idx; i < cCnt; i++) {
        selected.push(chickenPos[i]);
        dfs(depth + 1, i + 1, selected);
        selected.pop();
    }
};

dfs(0, 0, []);

console.log(answer);
