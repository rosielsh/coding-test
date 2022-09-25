// 문제 : 2xn 타일링
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require('fs').readFileSync(filePath).toString().split('\n');
const n = +input.shift();
const dp = Array.from({length: n+1}, ()=>0);

function solution() {
    dp[1] = 1;
    dp[2] = 2;
    
    for(let i = 3; i <= n; i++) {
        dp[i] = (dp[i-1] + dp[i-2]) % 10007;
    }
    console.log(dp[n]);
}

solution();