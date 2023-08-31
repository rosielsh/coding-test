// 암호 만들기

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [L, C] = input.shift().split(" ").map(Number);
const pwCandi = input.shift().split(" ").sort();
let vowel = 0; // 모음
const vArr = ["a", "e", "i", "o", "u"];
const visited = Array.from({ length: L }, () => 0);

function password(n, idx) {
  if (n === L) {
    if (vowel < 1 || vowel > L - 2) return;
    console.log(visited.join(""));
    return;
  }

  for (let i = idx; i < pwCandi.length; i++) {
    if (vArr.includes(pwCandi[i])) {
      vowel++;
      visited[n] = pwCandi[i];
      password(n + 1, i + 1);
      vowel--;
    } else {
      visited[n] = pwCandi[i];
      password(n + 1, i + 1);
    }
    visited[n] = 0;
  }
}

password(0, 0);
