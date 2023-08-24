// 숫자판 점프

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let board = require("fs").readFileSync(filePath).toString().trim().split("\n");
board = board.map((x) => x.split(" ").map(Number));

const set = new Set();

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

function dfs(x, y, result) {
  if (result.length === 6) {
    set.add(result.join(""));
    return;
  }

  for (let k = 0; k < 4; k++) {
    const nx = x + dx[k];
    const ny = y + dy[k];

    if (nx < 0 || nx >= 5 || ny < 0 || ny >= 5) continue;

    result.push(board[nx][ny]);
    dfs(nx, ny, result);
    result.pop();
  }
}

function solution() {
  let answer = 0;

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      dfs(i, j, []);
    }
  }

  answer = set.size;
  return answer;
}

console.log(solution());
