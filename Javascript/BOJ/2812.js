// 크게 만들기

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, K] = input.shift().split(" ").map(Number);
const number = input.shift().split("").map(Number);

const stack = [];
let delCnt = K;

for (let i = 0; i < N; i++) {
    const num = number[i];

    if (stack.length === 0) {
        stack.push(num);
    }
    // 스택에 원소가 있으면 가장 마지막 원소랑 비교
    else {
        while (stack.length && stack[stack.length - 1] < num && delCnt > 0) {
            stack.pop();
            delCnt--;
        }

        stack.push(num);
    }
}

console.log(stack.splice(0, N - K).join(""));
