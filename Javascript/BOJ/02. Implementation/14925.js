// 목장 건설하기
// dp로 다시 풀기

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [MN, ...land] = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [M, N] = MN.split(" ").map(Number);
land = land.map((x) => x.split(" ").map(Number));

function searchLand(x, y) {
  let searchRow = x + 1;
  let searchCol = y + 1;
  let size = 1;

  let isExpandable = true;

  while (searchRow < M && searchCol < N) {
    for (let i = y; i <= searchCol; i++) {
      if (land[searchRow][i] !== 0) {
        isExpandable = false;
        break;
      }
    }

    for (let i = x; i <= searchRow; i++) {
      if (land[i][searchCol] !== 0) {
        isExpandable = false;
        break;
      }
    }

    if (!isExpandable) break;

    searchRow += 1;
    searchCol += 1;
    size++;
  }

  return size;
}

function solution() {
  let answer;
  let maxSize = 0;
  land.forEach((row, i) => {
    row.forEach((ele, j) => {
      if (ele === 0) {
        maxSize = Math.max(maxSize, searchLand(i, j));
      }
    });
  });

  answer = maxSize;
  return answer;
}

console.log(solution());
