const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const N = +input.shift();
const str = input.shift();

let left = 0;
const cnt = Array.from({ length: 26 }, () => 0);
const len = str.length;
let maxLen = 0; // 최대 길이
let total = 1; // 전체 알파벳 종류

cnt[str[0].charCodeAt(0) - 97]++;

for (let right = 1; right < len; right++) {
    const r = str[right].charCodeAt(0) - 97;
    if (cnt[r] === 0) {
        total++;
    }

    cnt[r]++;

    while (total > N) {
        const l = str[left].charCodeAt(0) - 97;

        cnt[l]--;

        if (cnt[l] === 0) {
            total--;
        }

        left++;
    }

    maxLen = Math.max(maxLen, right - left + 1);
}

console.log(maxLen);
