// 스타트 링크

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [F, S, G, U, D] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(" ")
  .map(Number);

function solution(start) {
  const needVisit = [[start, 0]];
  const visited = Array.from({ length: F + 1 }, () => 0);
  while (needVisit.length) {
    const [curNode, floor] = needVisit.shift();
    if (curNode === G) {
      return floor;
    }

    for (let next of [curNode + U, curNode - D]) {
      if (next <= 0 || next > F || visited[next]) continue;

      visited[next] = 1;
      needVisit.push([next, floor + 1]);
    }
  }
  return -1;
}

console.log(solution(S) === -1 ? "use the stairs" : solution(S));
