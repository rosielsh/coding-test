// 할리갈리

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const N = +input.shift();
const card = input;
const map = new Map();
card.forEach(x => {
  const [fruit, cnt] = x.split(' ');
  if(!map.has(fruit)) {
    map.set(fruit, Number(cnt));
  } else map.set(fruit, map.get(fruit)+Number(cnt));
})

let answer = 'NO';
for(let m of map.values()) {
  if(m === 5) {
    answer = 'YES'
  }
}

console.log(answer);
