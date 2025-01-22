const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const nums = input[1].split(" ").map(Number);
const isExist = Array.from({ length: 1000001 }, () => false);
const score = Array.from({ length: 1000001 }, () => 0);

for (let num of nums) {
  isExist[num] = true;
}

for (let num of nums) {
  for (let i = num * 2; i <= 1000000; i += num) {
    if (isExist[i]) {
      score[num]++;
      score[i]--;
    }
  }
}

const answer = [];

for (let num of nums) {
  answer.push(score[num]);
}

console.log(answer.join(" "));
