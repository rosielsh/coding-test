// 신나는 함수 실행

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
let result;

function recursion(a, b, c) {
  if (result[a][b][c] !== -1) return result[a][b][c];

  if (a <= 0 || b <= 0 || c <= 0) return 1;

  if (a < b && b < c)
    return recursion(a, b, c - 1) + recursion(a, b - 1, c - 1) - recursion(a, b - 1, c);
  else
    return (
      recursion(a - 1, b, c) +
      recursion(a - 1, b - 1, c) +
      recursion(a - 1, b, c - 1) -
      recursion(a - 1, b - 1, c - 1)
    );
}

function solution() {
  let answer = [];
  let index = 0;
  result = Array.from({ length: 21 }, () =>
    Array.from({ length: 21 }, () => Array.from({ length: 21 }, () => -1))
  );

  for (let i = 0; i <= 20; i++) {
    for (let j = 0; j <= 20; j++) {
      for (let k = 0; k <= 20; k++) {
        result[i][j][k] = recursion(i, j, k);
      }
    }
  }

  while (1) {
    [a, b, c] = input[index++].split(" ").map(Number);

    if (a === -1 && b === -1 && c === -1) break;

    if (a <= 0 || b <= 0 || c <= 0) {
      answer.push(`w(${a}, ${b}, ${c}) = 1`);
      continue;
    }

    if (a > 20 || b > 20 || c > 20) {
      answer.push(`w(${a}, ${b}, ${c}) = ${2 ** 20}`);
      continue;
    }

    answer.push(`w(${a}, ${b}, ${c}) = ${result[a][b][c]}`);
  }

  return answer.join("\n");
}

console.log(solution());
