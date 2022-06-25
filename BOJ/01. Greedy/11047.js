// 문제 : 동전 0

// 입력 : 동전의 개수 N , 가치의 합 K
// 출력 : 필요한 동전 개수의 최소값

// 과정
// 1. 입력받기 
// 2. 가장 큰 수부터 차례로 나눠주기
// 3. 가치가 0이될때 종료

const input = require('fs').readFileSync('/dev/stdin').toString().split('\n');
const [inputs, ...arr] = input;
const [N, K] = inputs.split(' ');

const vArr = arr.map((ele) => (Number(ele)));

// 로직 시작
let m = 0;
let cnt = 0;
let val = K;
for (let i = N-1; i>=0; i--){
    if(val === 0) break;
    m = vArr[i];
    cnt += parseInt(val / m);
    val = val % m; 
}

console.log(cnt);