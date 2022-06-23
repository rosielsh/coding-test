// 문제 : 회의실 배정

// 입력 : 회의의 수 N + 회의의 정보(시작시간, 끝나는 시간)
// 출력 : 회의의 최대 개수

// 과정
// 1. 끝나는 시간이 빠를수록 회의를 최대한 많이 넣을 수 있으므로 정렬진행
// 2. 끝나는 시간이 같으면 시작시간이 빠른 순으로 정렬
// 3. 회의 개수는 이전 회의 끝나는 시간 <= 다음 회의 시작 시간 일 때

const input = require('fs').readFileSync('input.txt').toString().split('\n');
const [num, ...arr] = input; // 구조분해 할당 : 1번째 요소, 나머지

// 정렬 진행
const times = arr
.map((ele) => ele.split(' ').map((ele) => Number(ele)))
.sort((a,b) => {
    if(a[1] === b[1]) { // 끝나는 시간이 같으면
        return a[0]-b[0]; // 빨리 시작하는 순으로
    } else {
        return a[1]-b[1]; // 끝나는 시간이 빠른 순으로
    }
})

// 회의 수 세기
let cnt = 0;
let endTime = 0;
times.forEach((ele) => {
    if(ele[0] >= endTime){
        endTime = ele[1];
        cnt++;
    }
})

console.log(cnt);