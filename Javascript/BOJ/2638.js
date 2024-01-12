const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const paper = input.map((x) => x.split(" ").map(Number));

let cheeseCnt = 0;
let isOut;

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

const checkOut = () => {
    isOut = Array.from({ length: N }, () => Array(M).fill(false));

    const queue = [[0, 0]];
    isOut[0][0] = true;

    while (queue.length) {
        const [cx, cy] = queue.shift();

        for (let i = 0; i < 4; i++) {
            const nx = cx + dx[i];
            const ny = cy + dy[i];

            if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;
            if (isOut[nx][ny] || paper[nx][ny]) continue;

            isOut[nx][ny] = true;
            queue.push([nx, ny]);
        }
    }
};

const meltCheese = () => {
    let meltPos = [];

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            let air = 0;
            if (!paper[i][j]) continue;

            for (let d = 0; d < 4; d++) {
                const ni = i + dx[d];
                const nj = j + dy[d];

                if (ni < 0 || ni >= N || nj < 0 || nj >= M) continue;
                if (paper[ni][nj]) continue;
                if (!isOut[ni][nj]) continue;

                air++;
            }

            if (air >= 2) {
                meltPos.push([i, j]);
            }
        }
    }

    for (let [x, y] of meltPos) {
        paper[x][y] -= 1;
        cheeseCnt--;
    }
};

for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
        if (paper[i][j]) cheeseCnt++;
    }
}

let time = 0;
while (cheeseCnt > 0) {
    checkOut();
    meltCheese();
    time++;
}

console.log(time);
