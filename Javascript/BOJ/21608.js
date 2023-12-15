const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();
const favorateStd = new Map();

const seat = Array.from({ length: N }, () => Array(N).fill(0));

// 학생은 총 N*N명
for (let i = 0; i < N * N; i++) {
    // 현재 학생이 좋아하는 학생 4명의 번호
    const [stdNum, ...favorate] = input[i].split(" ").map(Number);
    favorateStd.set(stdNum, favorate);

    let cnt = 0; // 인접한 좋아하는 학생 수
    let pos = []; // 후보 위치 자리

    for (let x = 0; x < N; x++) {
        for (let y = 0; y < N; y++) {
            if (seat[x][y] === 0) {
                let fCnt = 0;

                for (let [dx, dy] of [
                    [0, -1],
                    [0, 1],
                    [1, 0],
                    [-1, 0],
                ]) {
                    const nx = x + dx;
                    const ny = y + dy;

                    if (nx < 0 || nx >= N || ny < 0 || ny >= N || !seat[nx][ny]) continue;

                    if (favorate.includes(seat[nx][ny])) fCnt++;
                }

                if (cnt < fCnt) {
                    pos = [[x, y]];
                    cnt = fCnt;
                } else if (cnt === fCnt) {
                    pos.push([x, y]);
                }
            }
        }
    }

    if (pos.length === 1) {
        const [nx, ny] = pos[0];
        seat[nx][ny] = stdNum;
        continue;
    }

    let maxTemp = 0;
    let pos1 = []; // 조건 2 후보

    for (let [x, y] of pos) {
        let tCnt = 0;

        for (let [dx, dy] of [
            [0, -1],
            [0, 1],
            [1, 0],
            [-1, 0],
        ]) {
            const nx = x + dx;
            const ny = y + dy;

            if (nx < 0 || nx >= N || ny < 0 || ny >= N || seat[nx][ny]) continue;
            tCnt++;
        }

        if (maxTemp < tCnt) {
            pos1 = [[x, y]];
            maxTemp = tCnt;
        } else if (maxTemp === tCnt) {
            pos1.push([x, y]);
        }
    }

    if (pos1.length === 1) {
        const [nx, ny] = pos1[0];
        seat[nx][ny] = stdNum;
        continue;
    }

    pos1.sort((a, b) => {
        // 행이 같으면 열 기준 오름차순
        if (a[0] === b[0]) return a[1] - b[1];
        else return a[0] - b[0]; // 그 외는 행 기준 오름차순
    });

    const [nx, ny] = pos1[0];
    seat[nx][ny] = stdNum;
}

let answer = 0;
for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
        let fCnt = 0;

        for (let [dx, dy] of [
            [0, -1],
            [0, 1],
            [1, 0],
            [-1, 0],
        ]) {
            const nx = i + dx;
            const ny = j + dy;

            if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;

            if (favorateStd.get(seat[i][j]).includes(seat[nx][ny])) {
                fCnt++;
            }
        }

        if (fCnt === 0) continue;
        answer += Math.pow(10, fCnt - 1);
    }
}

console.log(answer);
