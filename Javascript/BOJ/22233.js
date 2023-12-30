const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const word = input.splice(0, N);

const set = new Set();
for (let i = 0; i < N; i++) {
    set.add(word[i]);
}

let totalCnt = N;
const answer = [];

for (let i = 0; i < M; i++) {
    const strArr = input[i].split(",");

    for (let word of strArr) {
        if (set.has(word)) {
            totalCnt--;
            set.delete(word);
        }
    }

    answer.push(totalCnt);
}

console.log(answer.join("\n"));
