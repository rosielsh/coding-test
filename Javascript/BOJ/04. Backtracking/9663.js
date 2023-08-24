// N-Queen

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const N = +require("fs").readFileSync(filePath).toString().trim();
let answer = 0;
let queenPos = Array.from({ length: N }, () => 0);

function isPossible(col) {
  for (let i = 0; i < col; i++) {
    if (queenPos[i] === queenPos[col]) return false;
    if (Math.abs(queenPos[col] - queenPos[i]) === col - i) return false;
  }
  return true;
}

function dfs(n) {
  if (n === N) {
    answer++;
    return;
  }

  for (let i = 0; i < N; i++) {
    queenPos[n] = i; // n번째 자리에 0-N-1까지 넣어보고
    if (isPossible(n)) {
      // n번째 자리까지 검사
      dfs(n + 1); // 다음 자리로
    }
    queenPos[n] = 0;
  }
}

function solution() {
  dfs(0);
  return answer;
}

console.log(solution());
