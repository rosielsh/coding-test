const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input[0];
const cur = input[1].split("").map(Number);
const target = input[2].split("").map(Number);

const change = (x) => {
  return x === 1 ? 0 : 1;
};

const calc = (status) => {
  let cnt = 0;

  for (let i = 1; i < N; i++) {
    if (target[i - 1] === status[i - 1]) continue;

    cnt++;

    for (let j = i - 1; j <= i + 1; j++) {
      status[j] = change(status[j]);
    }
  }

  let flag = true;

  for (let i = 0; i < N; i++) {
    if (status[i] !== target[i]) {
      flag = false;
      break;
    }
  }

  return flag ? cnt : Infinity;
};

let cnt1 = calc([...cur]);

cur[0] = change(cur[0]);
cur[1] = change(cur[1]);

let cnt2 = calc([...cur]);

if (cnt2 !== Infinity) cnt2 += 1;

let answer = 0;

if (cnt1 === Infinity && cnt2 === Infinity) {
  answer = -1;
} else {
  answer = Math.min(cnt1, cnt2);
}

console.log(answer);
