// 더하기 사이클

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const n = +require("fs").readFileSync(filePath).toString().trim();

function solution() {
  let answer = 1;
  let newN = n;

  while (true) {
    newN = (newN % 10) * 10 + ((parseInt(newN / 10) + (newN % 10)) % 10);
    if (n === newN) break;
    answer++;
  }

  return answer;
}

console.log(solution());
