const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();
const food = input.map((x) => x.split(" ").map(Number));

let answer = Number.MAX_SAFE_INTEGER;

const dfs = (depth, S, B, cnt) => {
    if (depth === N) {
        if (cnt > 0) {
            answer = Math.min(answer, Math.abs(S - B));
        }

        return;
    }

    const [s, b] = food[depth];
    dfs(depth + 1, S * s, B + b, cnt + 1);
    dfs(depth + 1, S, B, cnt);
};

dfs(0, 1, 0, 0);

console.log(answer);
