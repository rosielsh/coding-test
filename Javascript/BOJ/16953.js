const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

let [A, B] = input[0].split(" ").map(Number);

let answer = Number.MAX_SAFE_INTEGER;

const dfs = (x, cnt) => {
    if (x <= A) {
        if (x === A) {
            answer = Math.min(answer, cnt);
        }
        return;
    }

    if (x % 10 === 1) {
        dfs(parseInt(x / 10), cnt + 1);
    } else if (x % 2 === 0) {
        dfs(x / 2, cnt + 1);
    }
};

dfs(B, 0);
console.log(answer === Number.MAX_SAFE_INTEGER ? -1 : answer + 1);
