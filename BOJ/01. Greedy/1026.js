// 문제 : 보물

// 입력 : 배열의 길이 N + 배열 A,B
// 출력 : 함수 S의 최솟값

// 과정
// 1. 입력받기 
// 2. A는 오름차순, B는 내림차순으로 정렬
// 3. S 함수 실행하여 결과 구하기

const input = require('fs').readFileSync('/dev/stdin').toString().split('\n');
const [N, ...val] = input;
const [a, b] = val.map((e) => e.split(" ").map((e) => Number(e)));

a.sort((a, b) => a-b);
b.sort((a, b) => b-a);

let sum = 0;
for (let i=0; i<N; i++) {
    sum += a[i]*b[i];   
}

console.log(sum);