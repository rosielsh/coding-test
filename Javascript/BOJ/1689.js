const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const N = +input.shift();
const line = input.map((x) => x.split(" ").map(Number));

const pos = [];

for (let [s, e] of line) {
    pos.push([s, 1]);
    pos.push([e, -1]);
}

pos.sort((a, b) => {
    if (a[0] === b[0]) return a[1] - b[1];
    else return a[0] - b[0];
});

let answer = 0;
let sum = 0;

for (let [_, std] of pos) {
    sum += std;
    answer = Math.max(answer, sum);
}

console.log(answer);
