const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, K] = input.shift().split(" ").map(Number);
const arr = input.shift().split(" ").map(Number);

const cnt = Array(100001).fill(0);

let answer = 0;

let j = 0;
for (let i = 0; i < N; i++) {
    while (j < N && cnt[arr[j]] < K) {
        cnt[arr[j]]++;
        j++;
    }

    answer = Math.max(answer, j - i);
    cnt[arr[i]]--;
}

console.log(answer);
