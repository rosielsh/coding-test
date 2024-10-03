const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();
const paper = input.map((x) => x.split(" ").map(Number));
const board = Array.from({ length: 101 }, () => Array(101).fill(0));

let answer = 0;
for (let [st, en] of paper) {
    for (let i = st; i < st + 10; i++) {
        for (let j = en; j < en + 10; j++) {
            if (board[i][j]) continue;
            board[i][j] = 1;
            answer++;
        }
    }
}

console.log(answer);
