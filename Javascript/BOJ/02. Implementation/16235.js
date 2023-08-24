const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
let [N, M, K] = input.shift().split(" ").map(Number);
const A = input.splice(0, N).map((x) => x.split(" ").map(Number));
const T = input.map((x) => x.split(" ").map(Number));

const food = Array.from({ length: N }, () => Array(N).fill(5)); // 지금까지의 양분을 저장하는 배열
const trees = [];

const dx = [-1, 0, 1, -1, 1, -1, 0, 1];
const dy = [-1, -1, -1, 0, 0, 1, 1, 1];

function solution() {
  let answer = 0;

  for (let i = 0; i < M; i++) {
    const [x, y, age] = T[i];
    trees.push([x - 1, y - 1, age]);
  }

  trees.sort((a, b) => b[2] - a[2]); // 내림차순 정렬

  // K년동안 반복
  while (K-- > 0) {
    trees.sort((a, b) => b[2] - a[2]); // 내림차순 정렬
    // 봄
    const liveTrees = [];
    const deadTrees = [];

    while (trees.length > 0) {
      const [x, y, age] = trees.pop();

      // 양분이 나이만큼 있으면
      if (food[x][y] >= age) {
        liveTrees.push([x, y, age + 1]);
        food[x][y] -= age;
      } else {
        deadTrees.push([x, y, Math.floor(age / 2)]);
      }
    }

    // 여름
    for (let i = 0; i < deadTrees.length; i++) {
      const [x, y, age] = deadTrees[i];
      food[x][y] += age;
    }

    // 가을
    const liveCnt = liveTrees.length;
    for (let i = 0; i < liveCnt; i++) {
      const [x, y, age] = liveTrees[i];

      if (age % 5 === 0) {
        for (let d = 0; d < 8; d++) {
          const nx = x + dx[d];
          const ny = y + dy[d];

          if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;

          liveTrees.push([nx, ny, 1]);
        }
      }
    }

    // 겨울
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        food[i][j] += A[i][j];
      }
    }

    for (let i = 0; i < liveTrees.length; i++) {
      const [x, y, age] = liveTrees[i];
      trees.push([x, y, age]);
    }
  }

  answer = trees.length;
  return answer;
}

console.log(solution());
