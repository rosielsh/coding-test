const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input[0];
const dist = input[1].split(" ").map(BigInt);
const cost = input[2].split(" ").map(BigInt);

let minCost = Number.MAX_SAFE_VALUE;
let sum = BigInt(0);
for (let i = 0; i < N - 1; i++) {
    if (cost[i] > minCost) {
        sum += minCost * dist[i];
    } else {
        sum += cost[i] * dist[i];
        minCost = cost[i];
    }
}

console.log(sum.toString());
