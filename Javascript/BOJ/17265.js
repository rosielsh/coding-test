const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();
const map = input.map((x) => x.split(" "));

const calc = (a, b, oper) => {
  switch (oper) {
    case "+": {
      return a + b;
    }
    case "-": {
      return a - b;
    }
    case "*": {
      return a * b;
    }
  }
};

let maxValue = -Infinity;
let minValue = Infinity;

const dx = [1, 0];
const dy = [0, 1];

const dfs = (x, y, value, oper) => {
  if (x === N - 1 && y === N - 1) {
    maxValue = Math.max(maxValue, value);
    minValue = Math.min(minValue, value);
    return;
  }

  for (let i = 0; i < 2; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (nx >= N || ny >= N) continue;

    // 다음칸: 연산자
    if ((nx + ny) % 2 === 1) {
      dfs(nx, ny, value, map[nx][ny]);
    }
    // 다음칸: 숫자
    else {
      dfs(nx, ny, calc(value, +map[nx][ny], oper), null);
    }
  }
};

dfs(0, 0, +map[0][0], null);

// console.log(maxValue, minValue); 이렇게 적으면 맞왜틀 당함
console.log(`${maxValue} ${minValue}`);
