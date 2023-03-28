const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[N, ...skyLine] = require("fs").readFileSync(filePath).toString().trim().split("\n");
N = +N;
skyLine = skyLine.map((x) => x.split(" ").map(Number));

skyLine.push([0, 0]);

// 스카이라인 높이를 순서대로 받음
// 이전 탑의 높이보다 낮으면 +1

function solution() {
  let answer = 0;
  let stack = [];
  for (let i = 0; i <= N; i++) {
    while (stack.length && stack[stack.length - 1] > skyLine[i][1]) {
      answer++;
      stack.pop();
    }

    if (stack.length && stack[stack.length - 1] === skyLine[i][1]) continue;

    stack.push(skyLine[i][1]);
  }

  return answer;
}

console.log(solution());
