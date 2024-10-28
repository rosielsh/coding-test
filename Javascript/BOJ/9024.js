const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const T = +input.shift();

const answer = [];
for (let t = 0; t < T * 2; t += 2) {
    const [n, K] = input[t].split(" ").map(Number);
    const nums = input[t + 1]
        .split(" ")
        .map(Number)
        .sort((a, b) => a - b);

    let minSub = Number.MAX_SAFE_INTEGER;
    let cnt = 1;
    let left = 0;
    let right = n - 1;

    while (left < right) {
        const sum = nums[left] + nums[right];
        const sub = Math.abs(K - sum);

        if (minSub > sub) {
            minSub = sub;
            cnt = 1;
        } else if (minSub === sub) cnt++;

        if (sum === K) {
            left++;
        } else if (sum > K) {
            right--;
        } else if (sum < K) {
            left++;
        }
    }

    answer.push(cnt);
}

console.log(answer.join("\n"));
