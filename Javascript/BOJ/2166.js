const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

function solution() {
  let answer = 0;
  const pointCnt = +input.shift();
  const points = input.map((x) => x.split(" ").map(Number));

  let j = pointCnt - 1;
  for (let i = 0; i < pointCnt; i++) {
    answer += (points[j][0] + points[i][0]) * (points[j][1] - points[i][1]);
    j = i;
  }

  return Math.abs(answer / 2).toFixed(1);
}

console.log(solution());
