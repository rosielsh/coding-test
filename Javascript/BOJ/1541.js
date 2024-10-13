const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const str = input[0].split("-");

let sum = Number(
    str[0]
        .split("+")
        .map(Number)
        .reduce((acc, cur) => acc + cur, 0)
);
for (let i = 1; i < str.length; i++) {
    sum -= str[i]
        .split("+")
        .map(Number)
        .reduce((acc, cur) => acc + cur, 0);
}

console.log(sum);
