// 스도쿠

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const sudoku = input.map((row) => row.split(" ").map((i) => Number(i)));

let zeroPos = getZeroPos();
let N = zeroPos.length;

function dfs(idx) {
  if (idx === N) {
    console.log(sudoku.map((x) => x.join(" ")).join("\n"));
    process.exit(0);
  }

  let [y, x] = zeroPos[idx];

  for (let i = 1; i <= 9; i++) {
    if (check(y, x, i)) {
      sudoku[y][x] = i;
      dfs(idx + 1);
      sudoku[y][x] = 0;
    }
  }
}

function check(r, c, value) {
  let row = parseInt(r / 3) * 3;
  let col = parseInt(c / 3) * 3;

  for (let i = 0; i < 9; i++) {
    if (sudoku[r][i] === value || sudoku[i][c] === value) return false;
  }

  for (let i = row; i < row + 3; i++) {
    for (let j = col; j < col + 3; j++) {
      if (sudoku[i][j] === value) return false;
    }
  }

  return true;
}

function getZeroPos() {
  const result = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (sudoku[i][j] === 0) result.push([i, j]);
    }
  }
  return result;
}

dfs(0);
