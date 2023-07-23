// 곱셈

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [A, B, C] = require("fs").readFileSync(filePath).toString().trim().split(" ").map(BigInt);

function recursion(exp) {
  if (exp === 1n) {
    return A % C;
  }

  // 현재 지수에서 2를 나눈 값으로 재귀함수 호출
  const result = recursion(exp / 2n) % C;

  // 지수가 홀수이면
  // ex) 10 ** 5 => 10**2 * 10**2 * 10
  if (exp % 2n === 1n) {
    // result가 max 값이라면 result * result * A에서 오버플로우 발생하기 때문에 모듈러 법칙을 활용
    return (result * result * A) % C;
  }
  // ex) 10 ** 4 => 10**2 * 10**2
  else {
    return (result * result) % C;
  }
}

function solution() {
  let answer = 0n;
  answer = recursion(B) % C;
  return answer.toString();
}

console.log(solution());
