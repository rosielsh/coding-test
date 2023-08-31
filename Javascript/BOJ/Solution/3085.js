const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [N, ...candy] = require("fs").readFileSync(filePath).toString().trim().split("\n");

N = +N;
candy = candy.map((x) => x.replace("\r", "").split(""));

const visited = Array.from({ length: N }, () => Array(N).fill(0));
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

let cntRow = Array.from({ length: N }, () => Array(N).fill(1));
let cntCol = Array.from({ length: N }, () => Array(N).fill(1));

let maxValue = Number.MIN_SAFE_INTEGER;

function checkMax() {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (i === 0 && j === 0) continue;

      if (i === 0) {
        if (candy[i][j] === candy[i][j - 1]) cntCol[i][j] = cntCol[i][j - 1] + 1;
      } else if (j === 0) {
        if (candy[i][j] === candy[i - 1][j]) cntRow[i][j] = cntRow[i - 1][j] + 1;
      } else {
        if (candy[i][j] === candy[i][j - 1]) cntCol[i][j] = cntCol[i][j - 1] + 1;
        if (candy[i][j] === candy[i - 1][j]) cntRow[i][j] = cntRow[i - 1][j] + 1;
      }
    }
  }

  for (let i = 0; i < N; i++) {
    let rMax = Math.max(...cntRow[i]);
    let cMax = Math.max(...cntCol[i]);

    maxValue = Math.max(maxValue, rMax);
    maxValue = Math.max(maxValue, cMax);
  }
}

function solution() {
  let answer = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      visited[i][j] = 1;
      for (let d = 0; d < 4; d++) {
        const nx = i + dx[d];
        const ny = j + dy[d];

        if (nx < 0 || nx >= N || ny < 0 || ny >= N || visited[nx][ny]) continue;
        if (candy[i][j] === candy[nx][ny]) continue;

        [candy[i][j], candy[nx][ny]] = [candy[nx][ny], candy[i][j]];
        let copyR = cntRow.map((x) => [...x]);
        let copyC = cntCol.map((x) => [...x]);
        checkMax();
        [candy[i][j], candy[nx][ny]] = [candy[nx][ny], candy[i][j]];
        cntRow = copyR.map((x) => [...x]);
        cntCol = copyC.map((x) => [...x]);
      }
    }
  }

  answer = maxValue;
  return answer;
}

console.log(solution());
