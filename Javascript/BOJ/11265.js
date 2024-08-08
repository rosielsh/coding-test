const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input.shift().split(" ").map(Number);
const time = input.splice(0, N).map((x) => x.split(" ").map(Number));
const request = input.map((x) => x.split(" ").map(Number));

const dist = time.map((x) => [...x]);

for (let k = 0; k < N; k++) {
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (dist[i][j] > dist[i][k] + dist[k][j]) dist[i][j] = dist[i][k] + dist[k][j];
        }
    }
}

const answer = [];
for (let [A, B, C] of request) {
    if (dist[A - 1][B - 1] <= C) answer.push(1);
    else answer.push(0);
}

console.log(answer.map((x) => (x === 1 ? "Enjoy other party" : "Stay here")).join("\n"));
