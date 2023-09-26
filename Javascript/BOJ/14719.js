// 빗물

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [HW, height] = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [H, W] = HW.split(" ").map(Number);
height = height.split(" ").map(Number);

function solution() {
  let answer = 0;
  height.forEach((h, index) => {
    let lMax = -1;
    for (let i = 0; i < index; i++) {
      lMax = Math.max(lMax, height[i]);
    }

    let rMax = -1;
    for (let i = index + 1; i < W; i++) {
      rMax = Math.max(rMax, height[i]);
    }

    const smaller = Math.min(lMax, rMax);
    if (smaller !== -1 && smaller > h) {
      answer += smaller - h;
    }
  });
  return answer;
}

console.log(solution());
