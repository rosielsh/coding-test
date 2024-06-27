const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");
const [n, k] = input.shift().split(" ").map(Number);
const line = input.shift().split("");

let answer = 0;

for (let i = 0; i < n; i++) {
    if (line[i] === "H" || line[i] === "T") continue;

    for (let j = i - k; j <= i + k; j++) {
        if (i === j || j < 0 || j >= n) continue;

        if (line[j] === "H") {
            line[j] = "T";
            answer++;
            break;
        }
    }
}

console.log(answer);
