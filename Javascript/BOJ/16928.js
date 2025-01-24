const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const move = input.map((x) => x.split(" ").map(Number));

const movePos = Array.from({ length: 101 }, () => -1);
for (let [a, b] of move) {
  movePos[a] = b;
}

const bfs = () => {
  const next = [1, 2, 3, 4, 5, 6];
  const visited = Array.from({ length: 101 }, () => -1);
  const queue = [[1, 0]];

  visited[1] = 0;

  while (queue.length > 0) {
    const [pos, cnt] = queue.shift();

    if (pos === 100) {
      return cnt;
    }

    for (let n of next) {
      let nPos = n + pos;
      if (nPos < 0 || nPos > 100 || visited[nPos] > -1) continue;

      if (movePos[nPos] !== -1) {
        nPos = movePos[nPos];
      }

      visited[nPos] = cnt + 1;
      queue.push([nPos, cnt + 1]);
    }
  }
};

console.log(bfs());
