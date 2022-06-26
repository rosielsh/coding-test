// 문제 : 로프

// 입력 : 로프의 개수 N + 각 로프거 버틸 수 있는 최대 중량
// 출력 : 로프들을 활용하여 들 수 있는 최대 중량

// 과정
// 1. 입력받기 
// 2. 로프의 개수를 늘려가며 최대 중량인 경우 구하기

const input = require('fs').readFileSync('/dev/stdin').toString().split('\n');
const [N, ...arr] = input;
const w = arr.sort((a,b) => b-a).map((e) => Number(e));
let m = 0;
for (let i = 1; i<=N; i++) {
    if(m < w[i-1]*i) {
        m = w[i-1]*i;
        break;
    }
}
console.log(m);