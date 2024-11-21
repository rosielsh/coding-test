const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();
const map = input.map((x) => x.split(" "));

const teachers = [];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (map[i][j] === "T") teachers.push([i, j]);
  }
}

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

const search = () => {
  for ([x, y] of teachers) {
    for (let i = 0; i < 4; i++) {
      let dist = 1;

      let nx;
      let ny;

      while (true) {
        nx = x + dx[i] * dist;
        ny = y + dy[i] * dist;

        if (nx < 0 || nx >= N || ny < 0 || ny >= N) break;

        const next = map[nx][ny];
        if (next === "O") break;
        if (next === "S") {
          return false;
        }

        dist++;
      }
    }
  }

  return true;
};

let answer = false;

const dfs = (cnt) => {
  if (answer) return;

  if (cnt === 3) {
    if (search()) {
      answer = true;
    }

    return;
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (map[i][j] !== "X") continue;

      map[i][j] = "O";
      dfs(cnt + 1);
      map[i][j] = "X";
    }
  }
};

dfs(0);

console.log(answer ? "YES" : "NO");
