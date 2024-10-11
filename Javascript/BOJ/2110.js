const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, C] = input.shift().split(" ").map(Number);
const house = input.map(Number).sort((a, b) => a - b);

const isPossible = (dist) => {
    let cnt = 1;
    let prevPos = house[0];

    for (let i = 1; i < N; i++) {
        if (house[i] - prevPos >= dist) {
            cnt++;
            prevPos = house[i];
        }
    }

    return cnt >= C;
};

let left = 1;
let right = house[N - 1] - house[0];
let maxDist = 0;

while (left <= right) {
    const mid = parseInt((left + right) / 2);

    if (isPossible(mid)) {
        left = mid + 1;
        maxDist = Math.max(maxDist, mid);
    } else {
        right = mid - 1;
    }
}

console.log(maxDist);
