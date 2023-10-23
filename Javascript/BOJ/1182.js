const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, S] = input[0].split(" ").map(Number);
const num = input[1].split(" ").map(Number);

let count = 0;

function powerset(depth, sum, cnt) {
  if (depth === N) {
    if (sum === S && cnt > 0) {
      count++;
    }
    return;
  }

  powerset(depth + 1, sum + num[depth], cnt + 1);
  powerset(depth + 1, sum, cnt);
}

function solution() {
  let answer = 0;
  powerset(0, 0, 0);
  answer = count;
  return answer;
}

console.log(solution());
