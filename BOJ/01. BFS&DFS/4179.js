// 불!

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[NM, ...miro] = require("fs").readFileSync(filePath).toString().trim().split("\n");
[N, M] = NM.split(" ").map(Number);
miro = miro.map((x) => x.replace("\r", "").split(""));

let dx = [0, 0, -1, 1];
let dy = [-1, 1, 0, 0];

function bfs(jihun, fire) {
  const jhQueue = [jihun];
  const fireQueue = [...fire];
  let time = 1;

  const jVisited = Array.from({ length: N }, () => Array(M).fill(0));
  const fVisited = Array.from({ length: N }, () => Array(M).fill(0));

  jVisited[jihun[0]][jihun[1]] = 1;
  for (let i = 0; i < fireQueue.length; i++) {
    fVisited[fire[i][0]][fire[i][1]] = 1;
  }

  while (jhQueue.length || fireQueue.length) {
    let fireCnt = fireQueue.length;
    while (fireCnt) {
      // 불 먼저 퍼짐
      [fireX, fireY] = fireQueue.shift();

      for (let i = 0; i < 4; i++) {
        nx = fireX + dx[i];
        ny = fireY + dy[i];

        if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;
        if (miro[nx][ny] === "#" || miro[nx][ny] === "F" || fVisited[nx][ny]) continue;

        fireQueue.push([nx, ny]);
        miro[nx][ny] = "F";
        fVisited[nx][ny] = 1;
      }
      fireCnt--;
    }

    let jiHunCnt = jhQueue.length;
    while (jiHunCnt) {
      // 지훈 이동
      [jhX, jhY] = jhQueue.shift();

      for (let i = 0; i < 4; i++) {
        nx = jhX + dx[i];
        ny = jhY + dy[i];

        if (nx < 0 || nx >= N || ny < 0 || ny >= M) return time;
        if (miro[nx][ny] === "#" || miro[nx][ny] === "F" || jVisited[nx][ny]) continue;

        jhQueue.push([nx, ny]);
        miro[nx][ny] = "J";
        jVisited[nx][ny] = 1;
      }
      jiHunCnt--;
    }
    // 1분동안 불, 지훈 이동 끝
    time++;
  }

  return -1;
}

function solution() {
  let answer;
  let jihun = [];
  let fire = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (miro[i][j] === "J") jihun = [i, j];
      if (miro[i][j] === "F") fire.push([i, j]);
    }
  }

  answer = bfs(jihun, fire);
  return answer === -1 ? "IMPOSSIBLE" : answer;
}

console.log(solution());
