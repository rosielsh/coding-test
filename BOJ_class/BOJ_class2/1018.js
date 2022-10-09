// 문제 : 체스판 다시 칠하기
// 반복문으로 하다가 오래 걸림
// 체스판을 미리 생성한다면 쉽게 해결되는 문제
// 알고리즘 : 브루트 포스
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\r\n');
const [N, M] = input.shift().split(' ');
const board = [];
for(let i = 0; i<N; i++) {
    board.push(input.shift().split(''));
}

const white = [
    "WBWBWBWB",
    "BWBWBWBW",
    "WBWBWBWB",
    "BWBWBWBW",
    "WBWBWBWB",
    "BWBWBWBW",
    "WBWBWBWB",
    "BWBWBWBW",
  ];
  
  const black = [
    "BWBWBWBW",
    "WBWBWBWB",
    "BWBWBWBW",
    "WBWBWBWB",
    "BWBWBWBW",
    "WBWBWBWB",
    "BWBWBWBW",
    "WBWBWBWB",
  ];

const check = (x, y) => {
    let countA = 0;
    let countB = 0;

    for(let i = y; i<y+8; i++) { // 행
        for(let j = x; j<x+8; j++) { // 열
            
            if(white[i][j] !== board[i-y][j-x]){
                countA++;
            }

            if(black[i][j] !== board[i-y][j-x]){
                countB++;
            }
        }
    }
    return countA > countB ? countB : countA;
}

function solution() {
    let cntList = [];
    for(let i = 0; i+8 <= N; i++) {
        for(let j = 0; j+8 <= M; j++) {
            cntList.push(check(j, i));
        }
    }

    console.log(Math.min(...cntList));
}

solution();