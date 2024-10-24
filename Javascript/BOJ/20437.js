const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const T = +input.shift();

const answer = [];

for (let t = 0; t < T * 2; t += 2) {
    const W = input[t].split("");
    const K = +input[t + 1];

  let min = Number.MAX_SAFE_INTEGER;
  let max = -1;

    const idx = Array.from({ length: 26 }, () => []); 

    for (let i = 0; i < W.length; i++) {
        idx[W[i].charCodeAt(0) - 97].push(i);
    }

    for (let i = 0; i < 26; i++) {
        if (idx[i].length < K) continue;

        for (let j = 0; j <= idx[i].length - K; j++) {
            min = Math.min(min, idx[i][j + K - 1] - idx[i][j] + 1);
            max = Math.max(max, idx[i][j + K - 1] - idx[i][j] + 1);
        }
    }

    if (max === -1 || min === Number.MAX_SAFE_INTEGER) answer.push(-1);
    else answer.push(`${min} ${max}`);
}

console.log(answer.join("\n"));
