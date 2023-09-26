// A → B

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[A, B] = require("fs").readFileSync(filePath).toString().trim().split(" ").map(Number);

function solution() {
  let answer = 1;
  while (B >= A) {
    if (A === B) return answer;
    if (B % 2 === 0) {
      B = parseInt(B / 2);
      answer++;
    } else if (B % 10 === 1) {
      B = parseInt(B / 10);
      answer++;
    } else break;
  }
  return -1;
}

console.log(solution());

// bfs 풀이

// const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
// [A, B] = require('fs').readFileSync(filePath).toString().trim().split(' ');
// A = +A;
// B = +B;

// function solution(start) {
//   const needVisit = [[start, 0]];
//   let count = 0;

//   while(needVisit.length) {
//     [curNum, cnt] = needVisit.shift();

//     if(curNum === B) {
//       count = cnt;
//       break;
//     }

//     if(curNum * 2 <= B) {
//       needVisit.push([curNum*2, cnt+1]);
//     }

//     if(Number(String(curNum)+'1') <= B) {
//       needVisit.push([Number(String(curNum)+'1'), cnt+1]);
//     }
//   }

//   if(!count) return -1;
//   return count+1;
// }

// console.log(solution(A));
