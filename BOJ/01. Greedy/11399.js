// 문제 : ATM

// 입력 : 돈을 인출하는 사람 수 N, 인출하는데 걸리는 시간들
// 출력 : 모든 사람이 돈을 인출하는 데 걸리는 시간의 합의 최솟값

// 과정
// 1. 입력받기 
// 2. 정렬
// 3. 연산

const input = require('fs').readFileSync('input.txt').toString().split('\n');
const [N, ...arr] = input;
const time = arr[0].split(' ').sort((a,b) => b-a);

let sum = 0;
time.forEach((ele, idx) => {
    sum += ele*(idx + 1);
})
console.log(sum);