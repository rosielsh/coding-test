const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const A = input.splice(0, N).map((x) => x.split(" ").map(Number));
const cmd = input.map((x) => x.split(" ").map(Number));

let cloud = [
    [N - 1, 0],
    [N - 1, 1],
    [N - 2, 0],
    [N - 2, 1],
];
const dx = [0, 0, -1, -1, -1, 0, 1, 1, 1];
const dy = [0, -1, -1, 0, 1, 1, 1, 0, -1];

const moveCloud = (d, s) => {
    for (let i = 0; i < cloud.length; i++) {
        let nx = cloud[i][0];
        let ny = cloud[i][1];

        for (let t = 0; t < s; t++) {
            nx = nx + dx[d];
            ny = ny + dy[d];

            if (nx === -1) nx = N - 1;
            else if (nx === N) nx = 0;

            if (ny === -1) ny = N - 1;
            else if (ny === N) ny = 0;
        }

        cloud[i][0] = nx;
        cloud[i][1] = ny;
    }
};

const dx1 = [-1, -1, 1, 1];
const dy1 = [-1, 1, -1, 1];

const rainAndCopy = () => {
    for (let [x, y] of cloud) {
        A[x][y] += 1;
    }

    for (let [x, y] of cloud) {
        let waterCnt = 0;

        let nx = x;
        let ny = y;
        for (let i = 0; i < 4; i++) {
            nx = x + dx1[i];
            ny = y + dy1[i];

            if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;

            if (A[nx][ny] > 0) waterCnt++;
        }

        A[x][y] += waterCnt;
    }
};

const makeCloud = () => {
    const pos = [];
    const set = new Set();

    for (let [x, y] of cloud) {
        set.add(`${x} ${y}`);
    }

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (A[i][j] >= 2) {
                if (set.has(`${i} ${j}`)) continue;

                pos.push([i, j]);
            }
        }
    }

    for (let [x, y] of pos) {
        A[x][y] -= 2;
    }

    cloud = [...pos];
};

for (let [d, s] of cmd) {
    moveCloud(d, s);
    rainAndCopy();
    makeCloud();
}

let answer = 0;
for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
        answer += A[i][j];
    }
}

console.log(answer);
