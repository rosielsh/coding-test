const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const N = +input.shift()[0];
const map = input.map((x) => x.split(" "));

const teacher = [];
const temp = [];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (map[i][j] === "T") {
      teacher.push([i, j]);
    }

    if (map[i][j] === "X") {
      temp.push([i, j]);
    }
  }
}

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

const search = () => {
  // 전체 학생들
  let cnt = 0;
  // 모든 선생님을 순회
  for (let i = 0; i < teacher.length; i++) {
    // 현재 선생님
    const [x, y] = teacher[i];

    // 4방향 탐색
    for (let d = 0; d < 4; d++) {
      let dist = 1;
      while (true) {
        const nx = x + dist * dx[d];
        const ny = y + dist * dy[d];

        if (nx < 0 || nx >= N || ny < 0 || ny >= N) break;
        if (map[nx][ny] === "O") break;
        if (map[nx][ny] === "S") cnt++;

        dist++;
      }
    }
  }

  return cnt;
};

let isPossible = false;

const combi = (depth, idx) => {
  if (isPossible) return;

  if (depth === 3) {
    // console.log(map.join("\n"));
    // 학생 탐색 결과
    const res = search();
    if (res === 0) {
      isPossible = true;
    }
    return;
  }

  for (let i = idx; i < temp.length; i++) {
    const [x, y] = temp[i];
    map[x][y] = "O";
    combi(depth + 1, i + 1);
    map[x][y] = "X";
  }
};

combi(0, 0);

console.log(isPossible ? "YES" : "NO");
