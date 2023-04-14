// 섬의 개수

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
let map = [];

function DFS(startY, startX, w, h, map) {
  const needVisit = [[startY, startX]];
  const pos = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
    [-1, -1],
    [1, 1],
    [-1, 1],
    [1, -1],
  ];

  while (needVisit.length) {
    const [curY, curX] = needVisit.pop();

    for (let i = 0; i < 8; i++) {
      const adjY = curY + pos[i][0];
      const adjX = curX + pos[i][1];

      if (adjY < 0 || adjY >= h || adjX < 0 || adjX >= w) continue;
      if (map[adjY][adjX]) {
        map[adjY][adjX] = 0;
        needVisit.push([adjY, adjX]);
      }
    }
  }
}

function solution() {
  let answer;
  while (1) {
    const [w, h] = input
      .shift()
      .split(" ")
      .map((x) => +x);
    if (w === 0 && h === 0) break; // 종료 조건

    for (let i = 0; i < h; i++) {
      map.push(
        input
          .shift()
          .replace("\r", "")
          .split(" ")
          .map((x) => +x)
      );
    }

    answer = 0;
    for (let i = 0; i < h; i++) {
      for (let j = 0; j < w; j++) {
        if (map[i][j]) {
          DFS(i, j, w, h, map);
          answer++;
        }
      }
    }
    console.log(answer);
    map = []; // 초기화
  }
}

solution();
