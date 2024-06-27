const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");
const N = +input.shift();
const score = input.map((x) => x.split(" ").map(Number));

const answer = [];
const sorted = score.map((x) => [...x]).map((x) => x.sort((a, b) => a - b)); // 오름차순 정렬

const sum = [];

// target보다 큰 점수를 가진 사람의 명수을 알기 위해 upper bound 사용
const upperBound = (target, arr) => {
    let left = 0;
    let right = N - 1;
    let minIdx = N;

    while (left <= right) {
        const mid = parseInt((left + right) / 2);

        if (arr[mid] > target) {
            right = mid - 1;
            minIdx = Math.min(minIdx, mid);
        } else {
            left = mid + 1;
        }
    }

    return minIdx;
};

for (let i = 0; i < 3; i++) {
    const res = [];
    for (let j = 0; j < N; j++) {
        const ub = upperBound(score[i][j], sorted[i]);
        res.push(N + 1 - ub);
    }

    answer.push(res.join(" "));
}

for (let i = 0; i < N; i++) {
    let s = 0;
    for (let j = 0; j < 3; j++) {
        s += score[j][i];
    }

    sum.push(s);
}

const cpSum = [...sum];

sum.sort((a, b) => a - b);

const total = [];
for (let i = 0; i < N; i++) {
    const ub = upperBound(cpSum[i], sum);
    total.push(N + 1 - ub);
}

answer.push(total.join(" "));

console.log(answer.join("\n"));
