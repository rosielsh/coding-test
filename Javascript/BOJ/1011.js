const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const T = +input[0];
const pos = input.slice(1).map((x) => x.split(" ").map(Number));

const answer = [];

for (let [from, to] of pos) {
  const gap = to - from;

  if (gap <= 3) {
    answer.push(gap);
    continue;
  }

  let val = 1;
  let i = 1;

  while (val < gap) {
    val += parseInt(i / 2);

    i++;
  }

  if (gap < val) i--;

  answer.push(i - 1);
}

console.log(answer.join("\n"));
