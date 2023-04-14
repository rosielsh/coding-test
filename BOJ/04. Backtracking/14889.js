// 스타트와 링크

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[N, ...stats] = require("fs").readFileSync(filePath).toString().trim().split("\n");
stats = stats.map((x) => x.split(" ").map(Number));

const visited = Array.from({ length: N }, () => 0);
const start = Array.from({ length: N / 2 }, () => 0);
let minSub = Number.MAX_SAFE_INTEGER;

function solution(len, idx) {
  if (len === N / 2) {
    let link = [];
    for (let i = 0; i < N; i++) {
      if (!visited[i]) {
        link.push(i);
      }
    }

    let startSum = 0;
    for (let i = 0; i < N / 2; i++) {
      for (let j = i; j < N / 2; j++) {
        startSum = startSum + stats[start[i]][start[j]] + stats[start[j]][start[i]];
      }
    }

    let linkSum = 0;
    for (let i = 0; i < N / 2; i++) {
      for (let j = i; j < N / 2; j++) {
        linkSum = linkSum + stats[link[i]][link[j]] + stats[link[j]][link[i]];
      }
    }

    minSub = Math.min(minSub, Math.abs(startSum - linkSum));
    return;
  }

  for (let i = idx; i < N; i++) {
    if (!visited[i]) {
      start[len] = i;
      visited[i] = 1;
      solution(len + 1, i + 1);
      start[len] = 0;
      visited[i] = 0;
    }
  }
}

solution(0, 0);
console.log(minSub);
