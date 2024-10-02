const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const N = +input.shift();
const one = input.shift().split(" ").map(Number);
const dice = input.map((x) => x.split(" ").map(Number));

let answer = 0;

const getBehind = (i) => {
    let top = 0;
    switch (i) {
        case 0: {
            top = 5;
            break;
        }
        case 1: {
            top = 3;
            break;
        }
        case 2: {
            top = 4;
            break;
        }
        case 3: {
            top = 1;
            break;
        }
        case 4: {
            top = 2;
            break;
        }
        case 5: {
            top = 0;
            break;
        }
    }

    return top;
};

const getMax = (a, b, idx) => {
    let max = 0;
    for (let i = 0; i < 6; i++) {
        if (i === a || i === b) continue;

        if (max < dice[idx][i]) {
            max = dice[idx][i];
        }
    }

    return max;
};

for (let bottom = 0; bottom < 6; bottom++) {
    let top = getBehind(bottom);
    let curTop = one[top];
    let maxSum = 0;

    let max = 0;
    for (let i = 0; i < 6; i++) {
        if (i === top || i === bottom) continue;

        if (max < one[i]) {
            max = one[i];
        }
    }

    maxSum += max;

    let nextTopIdx = 0;
    let nextBottomIdx = 0;

    // 모든 주사위 순회
    for (let j = 0; j < N - 1; j++) {
        for (let k = 0; k < 6; k++) {
            if (dice[j][k] === curTop) {
                nextBottomIdx = k;
                nextTopIdx = getBehind(k);
                curTop = dice[j][nextTopIdx];
                break;
            }
        }
        maxSum += getMax(nextTopIdx, nextBottomIdx, j);
    }

    answer = Math.max(answer, maxSum);
}

console.log(answer);
