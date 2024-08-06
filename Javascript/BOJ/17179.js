const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, M, L] = input.shift().split(" ").map(Number);
const S = input.splice(0, M).map(Number);
S.push(L);

const Q = input.map(Number);

const possible = (len, cnt) => {
    let std = 0;
    let c = 0;
    for (let i = 0; i <= M; i++) {
        if (S[i] - std >= len) {
            c++;
            std = S[i];
        }

        if (c === cnt + 1) return true;
    }

    return false;
};

const binarySearch = (cnt) => {
    let left = 2;
    let right = L;

    let maxVal = 1;

    while (left <= right) {
        const mid = parseInt((left + right) / 2);

        if (possible(mid, cnt)) {
            left = mid + 1;
            maxVal = Math.max(maxVal, mid);
        } else {
            right = mid - 1;
        }
    }

    return maxVal;
};

const answer = [];

for (let q of Q) {
    answer.push(binarySearch(q));
}

console.log(answer.join("\n"));
