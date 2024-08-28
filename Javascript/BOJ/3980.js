const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const T = +input.shift();

let maxSum = 0;
const dfs = (depth, score, selected, sum) => {
    if (depth === 11) {
        maxSum = Math.max(sum, maxSum);
        return;
    }

    for (let i = 0; i < 11; i++) {
        if (!selected[i] && score[depth][i] > 0) {
            selected[i] = true;
            dfs(depth + 1, score, selected, sum + score[depth][i]);
            selected[i] = false;
        }
    }
};

const answer = [];
for (let t = 0; t < T; t++) {
    const score = input.splice(0, 11).map((x) => x.split(" ").map(Number));
    const selected = Array.from({ length: 11 }, () => false);

    maxSum = 0;
    dfs(0, score, selected, 0);

    answer.push(maxSum);
}

console.log(answer.join("\n"));
