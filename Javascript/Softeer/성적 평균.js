const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, K] = input.shift().split(" ").map(Number);
const S = input.shift().split(" ").map(Number);
const zone = input.map((x) => x.split(" ").map(Number));

const sumArr = Array.from({ length: N + 1 }, () => 0);

for (let i = 1; i <= N; i++) {
    sumArr[i] = sumArr[i - 1] + S[i - 1];
}

const answer = [];

for (let [st, en] of zone) {
    const sum = sumArr[en] - sumArr[st - 1];
    answer.push((sum / (en - st + 1)).toFixed(2));
}

console.log(answer.join("\n"));
