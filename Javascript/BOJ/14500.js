// 테트로미노 => 왜 틀렸지 ...

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[NM, ...paper] = require("fs").readFileSync(filePath).toString().trim().split("\n");
[N, M] = NM.split(" ").map(Number);
paper = paper.map((x) => x.split(" ").map(Number));
let totalMaxSum = Number.MIN_SAFE_INTEGER;

// 상하좌우
const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];
const visited = Array.from({ length: N }, () => Array(M).fill(false));

function dfs(y, x, sum, depth) {
  if (depth === 4) {
    // 최대값 갱신
    totalMaxSum = Math.max(sum, totalMaxSum);
    return;
  }

  for (let i = 0; i < 4; i++) {
    ny = y + dy[i];
    nx = x + dx[i];

    if (ny >= 0 && ny < N && nx >= 0 && nx < M && !visited[ny][nx]) {
      // ㅗ 모양

      visited[ny][nx] = true;

      if (depth === 2) {
        dfs(y, x, sum + paper[ny][nx], depth + 1);
      }

      dfs(ny, nx, sum + paper[ny][nx], depth + 1);
      visited[ny][nx] = false;
    }
  }
}

function solution() {
  let answer;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      visited[i][j] = true;
      dfs(i, j, paper[i][j], 1);
      visited[i][j] = false;
    }
  }
  return totalMaxSum;
}

console.log(solution());

// 노가다 풀이
// const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
// [NM, ...paper] = require('fs').readFileSync(filePath).toString().trim().split('\n');
// [N, M] = NM.split(' ').map(Number);
// paper = paper.map(x=>x.split(' ').map(Number));
// let totalMaxSum = Number.MIN_SAFE_INTEGER;

// const pos = [
//   [[0, 0], [0, 1], [0, 2], [0, 3]],
//   [[0, 0], [1, 0], [2, 0], [3, 0]],
//   [[0, 0], [0, 1], [1, 0], [1, 1]],
//   [[0, 0], [1, 0], [2, 0], [2, 1]],
//   [[0, 0], [1, 0], [0, 1], [0, 2]],
//   [[0, 0], [0, 1], [1, 1], [2, 1]],
//   [[0, 0], [0, 1], [0, 2], [-1, 2]],
//   [[0, 0], [0, 1], [-1, 1], [-2, 1]],
//   [[0, 0], [1, 0], [1, 1], [1, 2]],
//   [[0, 0], [0, 1], [1, 0], [2, 0]],
//   [[0, 0], [0, 1], [0, 2], [1, 2]],
//   [[0, 0], [1, 0], [1, 1], [2, 1]],
//   [[0, 0], [0, 1], [-1, 1], [-1, 2]],
//   [[0, 0], [0, 1], [-1, 1], [1, 0]],
//   [[0, 0], [0, 1], [1, 1], [1, 2]],
//   [[0, 0], [0, 1], [0, 2], [1, 1]],
//   [[0, 0], [-1, 1], [0, 1], [1, 1]],
//   [[0, 0], [0, 1], [0, 2], [-1, 1]],
//   [[0, 0], [1, 0], [2, 0], [1, 1]]
// ]

// function tetromino(y, x) {
//   for(let i=0; i<pos.length; i++) {
//     let sum = 0;
//     for(let j=0; j<4; j++) {
//       if(y+pos[i][j][0] < 0 || y+pos[i][j][0] >= N || x+pos[i][j][1] < 0 || x+pos[i][j][1] >= M) continue;
//       sum += paper[y+pos[i][j][0]][x+pos[i][j][1]];
//     }
//     totalMaxSum = Math.max(sum, totalMaxSum);
//   }
// }

// function solution() {
//   for(let i=0; i<N; i++) {
//     for(let j=0; j<M; j++) {
//       tetromino(i, j);
//     }
//   }
//   return totalMaxSum;
// }

// console.log(solution());
