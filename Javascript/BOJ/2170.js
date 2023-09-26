// 선 긋기

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [N, ...lines] = require("fs").readFileSync(filePath).toString().trim().split("\n");
N = +N;
lines = lines.map((x) => x.split(" ").map(Number)).sort((a, b) => a[0] - b[0]);

function solution() {
  let answer = 0;
  const stack = [lines.shift()];

  lines.forEach(([curStart, curEnd]) => {
    const [latestStart, latestEnd] = stack[stack.length - 1];
    if (latestEnd >= curStart && latestEnd <= curEnd) {
      stack[stack.length - 1][1] = curEnd;
    } else if (latestEnd < curStart) {
      stack.push([curStart, curEnd]);
    }
  });

  stack.forEach(([start, end]) => {
    answer += end - start;
  });

  return answer;
}

console.log(solution());
