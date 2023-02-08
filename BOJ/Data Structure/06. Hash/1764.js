// 듣보잡

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const [N, M] = input.shift().split(' ').map(Number);
const set = new Set(input.splice(0, N));
console.log(input);
const answer = [];

input.forEach(x => {
  if(!map.has(x)) {
    map.set(x, 1);
  } else {
    map.set(x, map.get(x) + 1);
  }
})

for(let [name, cnt] of map) {
  if(cnt === 2) answer.push(name);
}

console.log(answer.length);
console.log(answer.sort().join('\n'));