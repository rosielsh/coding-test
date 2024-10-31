const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N, P, Q] = require("fs").readFileSync(filePath).toString().trim().split(" ").map(Number);
const dp = {};

dp[0] = 1;

const dfs = (x) => {
    if (x === 0) {
        return 1;
    }

    if (dp[x] > 0) return dp[x];

    dp[x] = dfs(Math.floor(x / P)) + dfs(Math.floor(x / Q));
    return dp[x];
};

dfs(N);
console.log(dp[N]);
