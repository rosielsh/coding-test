const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();
const money = input.shift().split(" ").map(Number);
const total = +input;

const min = 1;
const max = Math.max(...money);

const calcSum = (std) => {
    let sum = 0;
    for (let i = 0; i < N; i++) {
        sum += money[i] >= std ? std : money[i];
    }

    return sum;
};

let left = min;
let right = max;

while (left <= right) {
    let mid = parseInt((left + right) / 2);

    const sum = calcSum(mid);

    if (sum < total) {
        left = mid + 1;
    } else if (sum > total) {
        right = mid - 1;
    } else if (sum === total) {
        console.log(mid);
        return;
    }
}

console.log(right);
