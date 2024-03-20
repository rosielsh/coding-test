const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();
const map = input.map((x) => x.split(" ").map(Number));

let totalSum = 0;
for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
        totalSum += map[i][j];
    }
}

let answer = Number.MAX_SAFE_INTEGER;

const solution = (x, y, d1, d2) => {
    const boundary = Array.from({ length: N }, () => Array(N).fill(false));

    // 경계선 true로 변경
    for (let i = 0; i <= d1; i++) {
        boundary[x + i][y - i] = true;
        boundary[x + d2 + i][y + d2 - i] = true;
    }

    for (let i = 0; i <= d2; i++) {
        boundary[x + i][y + i] = true;
        boundary[x + d1 + i][y - d1 + i] = true;
    }

    let person = Array.from({ length: 5 }, () => 0);

    for (let i = 0; i < x + d1; i++) {
        for (let j = 0; j <= y; j++) {
            if (boundary[i][j]) break;
            person[0] += map[i][j];
        }
    }

    for (let i = 0; i <= x + d2; i++) {
        for (let j = N - 1; j >= y + 1; j--) {
            if (boundary[i][j]) break;
            person[1] += map[i][j];
        }
    }

    for (let i = x + d1; i < N; i++) {
        for (let j = 0; j < y - d1 + d2; j++) {
            if (boundary[i][j]) break;
            person[2] += map[i][j];
        }
    }

    for (let i = x + d2 + 1; i < N; i++) {
        for (let j = N - 1; j >= y - d1 + d2; j--) {
            if (boundary[i][j]) break;
            person[3] += map[i][j];
        }
    }

    person[4] = totalSum;

    for (let i = 0; i < 4; i++) {
        person[4] -= person[i];
    }

    const sub = Math.max(...person) - Math.min(...person);
    answer = Math.min(answer, sub);
};

for (let x = 0; x < N; x++) {
    for (let y = 0; y < N; y++) {
        for (let d1 = 1; d1 < N; d1++) {
            for (let d2 = 1; d2 < N; d2++) {
                if (x + d1 + d2 >= N) continue;
                if (y - d1 < 0 || y + d2 >= N) continue;

                solution(x, y, d1, d2);
            }
        }
    }
}

console.log(answer);
