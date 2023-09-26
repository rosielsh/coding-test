// 나이트의 이동

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const T = +input.shift();
let array = [];
let I;
let from;
let to;

const posX = [-1, -2, 1, 2, -1, -2, 1, 2];
const posY = [-2, -1, 2, 1, 2, 1, -2, -1];

function bfs() {
  const needVisit = [[...from, 0]];
  while (needVisit.length) {
    [curX, curY] = needVisit.shift();
    if (curX === to[0] && curY === to[1]) return array[curX][curY];

    for (let i = 0; i < 8; i++) {
      [adjX, adjY] = [curX + posX[i], curY + posY[i]];

      if (adjY < 0 || adjY >= I || adjX < 0 || adjX >= I) continue;

      if (!array[adjX][adjY]) {
        array[adjX][adjY] = array[curX][curY] + 1;
        needVisit.push([adjX, adjY, array[curX][curY] + 1]);
      }
    }
  }
}

function solution() {
  let answer = [];
  for (let t = 0; t < T * 3; t += 3) {
    I = +input[t];
    array = Array.from({ length: I }, () => Array(I).fill(0));
    [from, to] = [input[t + 1].split(" ").map(Number), input[t + 2].split(" ").map(Number)];
    answer.push(bfs());
  }
  return answer.join("\n");
}

console.log(solution());
