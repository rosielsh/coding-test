const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [L, N] = input.shift().split(" ").map(Number);
const words = input.sort();

const visited = new Array(N).fill(false);
const selected = new Array(L);

const check = () => {
  for (let i = 0; i < L; i++) {
    for (let j = i + 1; j < L; j++) {
      if (selected[i][j] !== selected[j][i]) {
        return false;
      }
    }
  }
  return true;
};

const dfs = (depth) => {
  if (depth === L) {
    if (check()) {
      console.log(selected.join("\n"));
      process.exit(0);
    }
    return;
  }

  for (let i = 0; i < N; i++) {
    if (visited[i]) continue;
    visited[i] = true;
    selected[depth] = words[i];
    dfs(depth + 1);
    visited[i] = false;
  }
};

dfs(0);
console.log("NONE");
