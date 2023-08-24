// N과 M (3)

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N, M] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(" ")
  .map((x) => +x);
const answer = [];
const ans_list = [];

function solution(K) {
  if (K === M) {
    ans_list.push(answer.join(" "));
    return;
  }

  for (let i = 1; i <= N; i++) {
    answer[K] = i;
    solution(K + 1);
  }

  return answer;
}

solution(0);
console.log(ans_list.join("\n"));
