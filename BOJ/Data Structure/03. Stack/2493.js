// 탑

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[N, top] = require('fs').readFileSync(filePath).toString().trim().split('\n');
N = +N;
top = top.split(' ').map(Number);

// 입력 : N개의 탑의 높이 


// 레이저 송신기는 레이저 신호를 왼쪽 방향으로 발사
// 수신 조건 : 가장 먼저 만나는 단 하나의 탑에서만 수신 

function solution() {
  let answer;
  let receive = Array.from({length: N},()=>0);
  let stack = [];
  // 탑의 번호 i+1
  for(let i=0; i<N; i++) {
    // 현재 탑의 높이 
    h = top[i];

    // 계속 pop하면서 stack에 자신보다 높은 탑이 있는지 찾기 
    while(1) {
      if(!stack.length) break;

      // 이전에 있는 탑 중에 자신보다 높은 탑이 있다
      if(stack[stack.length-1][0] > h) {
        receive[i] = stack[stack.length-1][1];
        break;
      } 
      // 자신보다 낮은 탑이다 
      else {
        stack.pop();
      }
    }

    stack.push([h, i+1]);
  }
  answer = receive.join(' ');
  return answer;
}

console.log(solution());