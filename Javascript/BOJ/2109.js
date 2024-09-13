const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const n = +input.shift();
const info = input
    .map((x) => x.split(" ").map(Number))
    .sort((a, b) => {
        if (a[0] === b[0]) return b[1] - a[1];
        else return b[0] - a[0];
    });

let maxDate = 0;
for (let i = 0; i < n; i++) {
    maxDate = Math.max(maxDate, info[i][1]);
}

const expect = Array.from({ length: maxDate + 1 }, () => -1);

for (let [p, d] of info) {
    for (let i = d; i >= 1; i--) {
        if (expect[i] === -1) {
            expect[i] = p;
            break;
        }
    }
}

let answer = expect.reduce((acc, cur) => acc + (cur !== -1 ? cur : 0), 0);
console.log(answer);
