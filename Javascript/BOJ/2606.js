// 바이러스

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const N = +input.shift();
const V = +input.shift();
const vertex = input.map((x) => x.split(" ").map((x) => +x));
const graph = Array.from({ length: N + 1 }, () => []);
vertex.forEach(([a, b]) => {
  graph[a].push(b);
  graph[b].push(a);
});

function solution() {
  let answer = 0;
  const visited = [];
  const needVisit = [1];

  while (needVisit.length) {
    const cur = needVisit.shift();
    if (!visited.includes(cur)) {
      visited.push(cur);
      needVisit.push(...graph[cur]);
      answer++;
    }
  }
  return answer - 1;
}

console.log(solution());
