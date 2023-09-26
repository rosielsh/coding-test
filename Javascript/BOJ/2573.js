const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [NM, ...land] = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, M] = NM.split(" ").map(Number);
land = land.map((x) => x.split(" ").map(Number));

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];
let copyLand;

function searchZeroSpace() {
  const cntArr = Array.from({ length: N }, () => Array(M).fill(0));
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      let cnt = 0;
      if (land[i][j] !== 0) {
        for (let k = 0; k < 4; k++) {
          const nx = i + dx[k];
          const ny = j + dy[k];
          if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;

          if (!land[nx][ny]) cnt++;
        }
      }
      cntArr[i][j] = cnt;
    }
  }

  return cntArr;
}

function calcNextYear(zeroCnt) {
  zeroCnt.forEach((row, i) => {
    row.forEach((ele, j) => {
      if (land[i][j] - ele < 0) land[i][j] = 0;
      else land[i][j] -= ele;
    });
  });
}

function bfs(x, y) {
  const queue = [[x, y]];

  while (queue.length) {
    const [cx, cy] = queue.shift();

    for (let i = 0; i < 4; i++) {
      const nx = cx + dx[i];
      const ny = cy + dy[i];

      if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;

      if (copyLand[nx][ny]) {
        copyLand[nx][ny] = 0;
        queue.push([nx, ny]);
      }
    }
  }
}

function solution() {
  let answer = 1;

  while (1) {
    const zeroCnt = searchZeroSpace();
    calcNextYear(zeroCnt);

    copyLand = land.map((x) => [...x]);

    let lumpCnt = 0;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (copyLand[i][j] > 0) {
          bfs(i, j, copyLand);
          lumpCnt++;
        }
      }
    }

    if (lumpCnt > 1) break;
    if (!lumpCnt) return 0;
    answer++;
  }

  return answer;
}

console.log(solution());
