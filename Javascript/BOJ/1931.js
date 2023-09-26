// 회의실 배정

const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");
const [num, ...arr] = input; // 구조분해 할당 : 1번째 요소, 나머지

const times = arr
  .map((ele) => ele.split(" ").map((ele) => Number(ele)))
  .sort((a, b) => {
    if (a[1] === b[1]) {
      // 끝나는 시간이 같으면
      return a[0] - b[0]; // 빨리 시작하는 순으로
    } else {
      return a[1] - b[1]; // 끝나는 시간이 빠른 순으로
    }
  });

let cnt = 0;
let endTime = 0;
times.forEach((ele) => {
  if (ele[0] >= endTime) {
    endTime = ele[1];
    cnt++;
  }
});

console.log(cnt);
