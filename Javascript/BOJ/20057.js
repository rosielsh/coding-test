const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();
const map = input.map((x) => x.split(" ").map(Number));

// 시작 좌표 : parseInt(N/2), parseInt(N/2)

// 회전 방향
const dx = [0, 1, 0, -1];
const dy = [-1, 0, 1, 0];

let x = parseInt(N / 2);
let y = parseInt(N / 2);

let cnt = 0; // 회전 횟수
let dist = 1; // 직진 거리
let d = 0; // 방향
let answer = 0; // 나가는 모래 양

const percent = [1, 1, 2, 2, 7, 7, 10, 10, 5];
const moveX = [
    [-1, 1, -2, 2, -1, 1, -1, 1, 0, 0], // 좌
    [-1, -1, 0, 0, 0, 0, 1, 1, 2, 1], // 하
    [-1, 1, -2, 2, -1, 1, -1, 1, 0, 0], // 우
    [1, 1, 0, 0, 0, 0, -1, -1, -2, -1], // 상
];

const moveY = [
    [1, 1, 0, 0, 0, 0, -1, -1, -2, -1], // 좌
    [-1, 1, -2, 2, -1, 1, -1, 1, 0, 0], // 하
    [-1, -1, 0, 0, 0, 0, 1, 1, 2, 1], // 우
    [-1, 1, -2, 2, -1, 1, -1, 1, 0, 0], // 상
];

const spread = (x, y, d) => {
    let total = map[x][y];
    let movedSand = 0; // 이동된 모래 양

    map[x][y] = 0;

    for (let i = 0; i < 9; i++) {
        let nx = x + moveX[d][i];
        let ny = y + moveY[d][i];
        let calcSand = Math.floor((total * percent[i]) / 100);

        if (nx < 0 || nx >= N || ny < 0 || ny >= N) {
            answer += calcSand;
        } else {
            map[nx][ny] += calcSand;
        }

        movedSand += calcSand;
    }

    // a 모래 이동
    let leftSand = total - movedSand;
    let ax = x + dx[d];
    let ay = y + dy[d];

    if (ax < 0 || ax >= N || ay < 0 || ay >= N) {
        answer += leftSand;
    } else {
        map[ax][ay] += leftSand;
    }
};

let isFin = false;

while (x >= 0 && y >= 0 && x < N && y < N) {
    // dist만큼 직진하며 퍼트리기
    for (let i = 0; i < dist; i++) {
        x = x + dx[d];
        y = y + dy[d];

        if (x === 0 && y === 0) {
            spread(x, y, d);
            isFin = true;
            break;
        }

        if (map[x][y] === 0) continue;

        spread(x, y, d);
    }

    if (isFin) break;

    cnt++;
    d = (d + 1) % 4;

    if (cnt === 2) {
        dist++;
        cnt = 0;
    }
}

console.log(answer);
