// 주유소

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[N, road, price] = require('fs').readFileSync(filePath).toString().trim().split('\n');
N = +N;
road = road.split(' ').map(Number);
price = price.split(' ').map(Number).slice(0, N-1);

const minPrice = Math.min(...price);
let totalRoad = road.reduce((acc, cur) => acc+cur, 0);

function solution() {
  let answer = 0;

  for(let i=0; i<N; i++) {
    if(price[i] === minPrice) {
      answer += totalRoad*price[i];
      return answer;
    } else {
      answer += road[i]*price[i];
      totalRoad -= road[i];
    }
  }
  return answer;
}

console.log(solution());