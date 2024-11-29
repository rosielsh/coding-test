const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input[0];
const arr = input[1].split("");

const RGB = ["R", "G", "B"];

const getNext = (val) => {
  if (val === "R") return "G";
  else if (val === "G") return "B";
  else if (val === "B") return "R";
};

let answer = Number.MAX_SAFE_INTEGER;

for (let k = 0; k < 3; k++) {
  let cnt = 0;
  const light = [...arr];
  for (let i = 0; i <= N - 3; i++) {
    while (light[i] !== RGB[k]) {
      for (let j = i; j <= i + 2; j++) {
        light[j] = getNext(light[j]);
      }
      cnt++;
    }
  }

  let flag = true;

  for (let i = N - 1; i >= 0; i--) {
    if (light[i] !== RGB[k]) {
      flag = false;
      break;
    }
  }

  if (flag) {
    answer = Math.min(answer, cnt);
  }
}

console.log(answer === Number.MAX_SAFE_INTEGER ? -1 : answer);
