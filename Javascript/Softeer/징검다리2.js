const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");
const N = +input.shift();
const A = input.shift().split(" ").map(Number);

const lis1 = [A[0]];
const lis2 = [A[N - 1]];

const dp1 = Array.from({ length: N }, () => 0);
const dp2 = Array.from({ length: N }, () => 0);

dp1[0] = 1;
dp2[N - 1] = 1;

const lowerBound = (arr, target) => {
    let left = 0;
    let right = arr.length - 1;
    let minIdx = arr.length;

    while (left <= right) {
        const mid = parseInt((left + right) / 2);

        if (arr[mid] >= target) {
            right = mid - 1;
            minIdx = Math.min(minIdx, mid);
        } else left = mid + 1;
    }

    return minIdx;
};

for (let i = 1; i < N; i++) {
    const last = lis1[lis1.length - 1]; // 마지막 원소
    if (last < A[i]) {
        lis1.push(A[i]); // 증가하는 부분 수열에 추가
    } else {
        const lb = lowerBound(lis1, A[i]);
        lis1[lb] = A[i];
    }

    dp1[i] = lis1.length;
}

for (let i = N - 1; i >= 0; i--) {
    const last = lis2[lis2.length - 1];
    if (last < A[i]) {
        lis2.push(A[i]);
    } else {
        const lb = lowerBound(lis2, A[i]);
        lis2[lb] = A[i];
    }

    dp2[i] = lis2.length;
}

let answer = -1;
for (let i = 0; i < N; i++) {
    answer = Math.max(answer, dp1[i] + dp2[i] - 1);
}

console.log(answer);
