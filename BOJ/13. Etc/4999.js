// 아!

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

function solution() {
  let answer;
  const jhCnt = input[0].split("").filter((str) => str === "a").length;
  const dtCnt = input[1].split("").filter((str) => str === "a").length;
  answer = jhCnt < dtCnt ? "no" : "go";
  return answer;
}

console.log(solution());
