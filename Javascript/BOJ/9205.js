const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

let storeCnt;
let sgPos;
let storePos;
let festPos;

function dfs() {
  const stack = [[sgPos[0], sgPos[1]]];
  const visited = Array.from({ length: storeCnt }, () => 0);

  while (stack.length) {
    const [cx, cy] = stack.pop();

    // 페스티벌로 갈 수 있으면 바로 감
    if (Math.abs(cx - festPos[0]) + Math.abs(cy - festPos[1]) <= 1000) {
      return 1;
    }

    // 전체 편의점 순회
    for (let i = 0; i < storeCnt; i++) {
      // 이미 방문한 편의점은 갈 필요 없음
      if (visited[i]) continue;

      const curDist = Math.abs(cx - storePos[i][0]) + Math.abs(cy - storePos[i][1]);
      if (1000 < curDist) continue; // 갈 수 없음

      visited[i] = 1;
      stack.push([storePos[i][0], storePos[i][1]]);
    }
  }

  return 0;
}

function solution() {
  const T = +input.shift();

  for (let t = 0; t < T; t++) {
    storeCnt = +input.shift();

    sgPos = input.shift().split(" ").map(Number);
    storePos = input.splice(0, storeCnt).map((x) => x.split(" ").map(Number));
    festPos = input.shift().split(" ").map(Number);

    console.log(dfs() === 1 ? "happy" : "sad");
  }
}

solution();
