// 키 순서

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[NM, ...edge] = require("fs").readFileSync(filePath).toString().trim().split("\n");
[N, M] = NM.split(" ").map(Number);
edge = edge.map((x) => x.split(" ").map(Number));

const student = Array.from({ length: N }, () => Array(N).fill(0));
for (let i = 0; i < M; i++) {
  [a, b] = edge[i];
  student[a - 1][b - 1] = 1;
}

function solution() {
  let answer = 0;
  for (let k = 0; k < N; k++) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (i === j) continue;
        if (student[i][k] && student[k][j]) student[i][j] = 1;
      }
    }
  }

  let cnt = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (student[i][j] || student[j][i]) cnt++;
    }
    if (cnt === N - 1) answer++;
    cnt = 0;
  }
  return answer;
}

console.log(solution());
