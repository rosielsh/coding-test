const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input[0];
const arr = input[1].split("");

const nums = [];
const opers = [];
arr.forEach((ele, idx) => {
    if (idx % 2 === 0) {
        nums.push(+ele);
    } else {
        opers.push(ele);
    }
});

const calc = (operIdx, num1, num2) => {
    const oper = opers[operIdx];
    let result = 0;
    switch (oper) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
            result = num1 * num2;
            break;
    }

    return result;
};

let maxVal = Number.MIN_SAFE_INTEGER;

// idx : opers연산자 인덱스, result : 이전 연산의 결과값
const dfs = (idx, result) => {
    if (idx >= opers.length) {
        maxVal = Math.max(maxVal, result);
        return;
    }

    const res1 = calc(idx, result, nums[idx + 1]);
    dfs(idx + 1, res1);

    if (idx + 1 >= opers.length) return;

    const res2 = calc(idx + 1, nums[idx + 1], nums[idx + 2]);
    dfs(idx + 2, calc(idx, result, res2));
};

dfs(0, nums[0]);

console.log(maxVal);
