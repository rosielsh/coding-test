// 숫자 카드

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const N = +input[0];
const cards = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);
const M = +input[2];
const search = input[3].split(" ").map(Number);

function solution() {
  const answerList = [];
  let answer;
  let left;
  let right;
  let mid;
  let find;

  for (let i = 0; i < M; i++) {
    answer = 0;
    left = 0;
    right = N - 1;
    while (left <= right) {
      find = search[i];
      mid = parseInt((left + right) / 2);
      if (find === cards[mid]) {
        answer = 1;
        break;
      } else if (find < cards[mid]) {
        right = mid - 1;
      } else left = mid + 1;
    }
    answerList.push(answer);
  }

  return answerList.join(" ");
}

console.log(solution());

// set 자료구조 활용
// 메모리 153540kb 시간 736ms
// set 객체의 has 연산은 O(1)

// const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
// const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
// const cards = new Set(input[1].split(' ').map(Number));
// const search = input[3].split(' ').map(Number);

// function solution() {
//   const answer = [];
//   for(let i=0; i<search.length; i++) {
//     answer[i] = cards.has(search[i]) ? 1:0;
//   }
//   return answer.join(' ');
// }

// console.log(solution());
