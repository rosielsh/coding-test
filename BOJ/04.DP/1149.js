// 문제 : RGB 거리
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require('fs').readFileSync(filePath).toString().split('\n');
const N = +input.shift();
const house = [];
for(let i = 0; i < N; i++) {
    house.push(input.shift().split(' ').map(x=>+x));
}

function solution() {
    for(let i = 1; i < N; i++) {
        house[i][0] = Math.min(house[i][0]+house[i-1][1], house[i][0]+house[i-1][2]);
        house[i][1] = Math.min(house[i][1]+house[i-1][0], house[i][1]+house[i-1][2]);
        house[i][2] = Math.min(house[i][2]+house[i-1][0], house[i][2]+house[i-1][1]);
    }
    console.log(Math.min(...house.at(-1)));
}

solution();