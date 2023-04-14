// ACM

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const T = +input.shift();

function solution() {
  for (let i = 0; i < T; i++) {
    [H, W, N] = input[i].split(" ").map(Number);
    let floor = N % H === 0 ? H * 100 : (N % H) * 100;
    let house = N % H === 0 ? parseInt(N / H) : parseInt(N / H) + 1;
    console.log(floor + house);
  }
}

solution();
