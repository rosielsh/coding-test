const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();
const words = input;

const map = new Map();

for (let word of words) {
    // 단어 하나
    const len = word.length;
    for (let i = 0; i < len; i++) {
        map.set(word[i], (map.get(word[i]) || 0) + Math.pow(10, len - i - 1));
    }
}

const mapArr = Array.from(map);
mapArr.sort((a, b) => b[1] - a[1]);

let answer = 0;
let num = 9;
for (let [_, mNum] of mapArr) {
    answer += mNum * num--;
}

console.log(answer);
