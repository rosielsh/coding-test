const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const N = +input.shift();
// 스위치 켜고 끄기

const state = input
  .shift()
  .split(" ")
  .map((x) => +x);
const [n, ...std] = input.map((x) => x.split(" ").map((x) => +x));

function solution() {
  let answer = [];
  std.forEach((x) => {
    if (x[0] === 1) {
      // 남자
      for (let i = 1; i <= N; i++) {
        if (i % x[1] === 0) {
          state[i - 1] = state[i - 1] === 0 ? 1 : 0;
        }
      }
    } else if (x[0] === 2) {
      // 여자
      const num = x[1];
      state[num - 1] = state[num - 1] === 0 ? 1 : 0; // 현재 자리 바꾸고
      for (let i = 1; i < N / 2; i++) {
        if (state[num - i - 1] === state[num + i - 1]) {
          state[num - i - 1] = state[num - i - 1] === 0 ? 1 : 0;
          state[num + i - 1] = state[num + i - 1] === 0 ? 1 : 0;
        } else break;
      }
    }
  });

  const n = state.length / 20;
  for (let i = 0; i < n; i++) {
    answer.push(state.splice(0, 20));
  }
  answer.forEach((x) => console.log(x.join(" ")));
}

solution();
