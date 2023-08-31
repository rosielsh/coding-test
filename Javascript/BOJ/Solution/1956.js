// 운동

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [VE, ...edge] = require("fs").readFileSync(filePath).toString().trim().split("\n");
let [V, E] = VE.split(" ").map(Number);

const dist = Array.from({ length: V + 1 }, () => Array(V + 1).fill(Infinity));
edge.forEach((e) => {
  const [a, b, c] = e.split(" ").map(Number);
  dist[a][b] = c;
});

function solution() {
  let answer;

  for (let i = 1; i <= V; i++) {
    for (let j = 1; j <= V; j++) {
      if (i === j) dist[i][j] = 0;
    }
  }

  for (let k = 1; k <= V; k++) {
    for (let i = 1; i <= V; i++) {
      for (let j = 1; j <= V; j++) {
        dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
      }
    }
  }

  let minCost = Number.MAX_SAFE_INTEGER;
  for (let i = 1; i <= V; i++) {
    for (let j = i + 1; j <= V; j++) {
      // 사이클을 이룰 때
      if (dist[i][j] !== Infinity && dist[j][i] !== Infinity) {
        minCost = Math.min(minCost, dist[i][j] + dist[j][i]);
      }
    }
  }

  answer = minCost === Number.MAX_SAFE_INTEGER ? -1 : minCost;
  return answer;
}

console.log(solution());
