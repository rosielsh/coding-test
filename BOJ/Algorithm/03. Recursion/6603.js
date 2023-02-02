// 로또

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
let lottoSet = [];
let N = 0;
const lottoWin = Array.from({length: 6}, ()=>0);

function backTracking(n, idx) {
  if(n === 6) {
    console.log(lottoWin.join(' '));
    return;
  }

  for(let i=idx; i<lottoSet.length; i++) {
    lottoWin[n] = lottoSet[i];
    backTracking(n+1, i+1);
    lottoWin[n] = 0;
  }
}

function solution() {
  while(true) {
    [N, ...lottoSet] = input.shift().split(' ').map(Number);
    if(N === 0) break;
    backTracking(0, 0);
    console.log('');
  }
}

solution();