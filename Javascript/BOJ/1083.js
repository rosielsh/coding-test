const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input[0];
const numbers = input[1].split(" ").map(Number);
const S = +input[2];

let cnt = S;

const swap = (a, b) => {
  [numbers[b], numbers[a]] = [numbers[a], numbers[b]];
};

let std = 0;
while (cnt > 0 && std < N) {
  let maxIdx = std;
  let maxVal = numbers[std];
  for (let i = std + 1; i <= std + cnt; i++) {
    if (maxVal < numbers[i]) {
      maxIdx = i;
      maxVal = numbers[i];
    }
  }

  for (let i = maxIdx - 1; i >= std; i--) {
    swap(i, i + 1);
  }

  cnt -= maxIdx - std;
  std++;
}

console.log(numbers.join(" "));
