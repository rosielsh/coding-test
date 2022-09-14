// 문제 : 경비원(2564)

// 입력 : 블록의 가로*세로 / 상점 개수 / 상점 위치 / 동근이의 위치
// 출력 : 동근이의 위치와 각 상점사이의 최대 거리의 합

// 과정
// (0,0)을 기준으로 하여 각 좌표별로 값을 평가하고 그것을 빼서 비교

// 입력 예시
/*
block : [10, 5] ,
storeCnt : 3 ,
location : [
    [1, 4],
    [3, 2],
    [2, 8],
    [2, 3]
]
 */
const input = require('fs').readFileSync('input.txt').toString().replace('\r', '').split('\n');

const block = input[0].split(' ').map(ele => +ele);
const storeCnt = input[1];
const location = Array.from(Array(+storeCnt), () => new Array(2));
for(let i=0; i<storeCnt; i++) {
    location[i] = input[i+2].split(' ').map(ele => +ele);
}
const dg = input.at(-1).split(' ').map(ele => +ele);

// logic
function solution(block, storeCnt, location, dg) {
    let value = 0;
    let dg_value = 0;
    let [r, c] = block;
    let sum = 0;

    if(dg[0] === 1) {
        dg_value = r + 2*c + (r-dg[1]);
    } else if(dg[0] === 2) {
        dg_value = c + dg[1];
    } else if(dg[0] === 3) {
        dg_value = dg[1];
    } else if(dg[0] === 4) {
        dg_value = r + c + (c-dg[1]);
    }

    for(let i=0; i<storeCnt; i++) {
        let pos = location[i][1];
        if(location[i][0] === 1) {
            value = r + 2*c + (r-pos);
        } else if(location[i][0] === 2) {
            value = c + pos;
        } else if(location[i][0] === 3) {
            value = pos;
        } else if(location[i][0] === 4) {
            value = r + c + (c-pos);
        }
    
        let sub = Math.abs(value - dg_value);
        sum += Math.min(sub, Math.abs(2*(r+c)-sub));
    }
    console.log(sum);
}


solution(block, storeCnt, location, dg);