const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();
const score = input
    .shift()
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b);

let answer = 0;

for (let i = 0; i < N - 2; i++) {
    let left = i + 1;
    let right = N - 1;

    while (left < right) {
        const sum = score[i] + score[left] + score[right];

        if (sum === 0) {
            if (score[left] === score[right]) {
                answer += ((right - left + 1) * (right - left)) / 2;
                break;
            }

            let lCnt = 1;
            let rCnt = 1;

            while (left + 1 < right && score[left] === score[left + 1]) {
                lCnt++;
                left++;
            }

            while (right - 1 > left && score[right] === score[right - 1]) {
                rCnt++;
                right--;
            }

            answer += lCnt * rCnt;

            left++;
            right--;
        } else if (sum > 0) right--;
        else if (sum < 0) left++;
    }
}

console.log(answer);
