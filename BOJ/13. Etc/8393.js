// 합

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n")[0];

console.log(Array.from({ length: input }, (_, idx) => idx + 1).reduce((acc, cur) => acc + cur, 0));
