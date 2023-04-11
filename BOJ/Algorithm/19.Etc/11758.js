// ccw

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[p1, p2, p3] = require("fs").readFileSync(filePath).toString().trim().split("\n");
[x1, y1] = p1.split(" ").map(Number);
[x2, y2] = p2.split(" ").map(Number);
[x3, y3] = p3.split(" ").map(Number);

function ccw() {
  return (x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1);
}

function solution() {
  let answer = 0;
  let result = ccw();
  if (result > 0) answer = 1;
  else if (result < 0) answer = -1;
  return answer;
}

console.log(solution());
