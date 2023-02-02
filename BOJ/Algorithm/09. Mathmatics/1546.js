// 평균

const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require('fs').readFileSync(filePath).toString().split('\n');
const N = +input.shift();
const score = input.shift().split(' ').map(x => +x);

function solution() {
    const max = Math.max(...score);
    const newScore = score.map(x => x/max*100);
    const result = newScore.reduce((sum, cur) => sum + cur)

    console.log(result/newScore.length);
}

solution();