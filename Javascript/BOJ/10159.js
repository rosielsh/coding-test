const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input[0];
const M = +input[1];

const objects = input.slice(2).map((x) => x.split(" ").map(Number));

const graph = Array.from({ length: N + 1 }, () => []); // 무거움 -> 가벼움
const rgraph = Array.from({ length: N + 1 }, () => []); // 가벼움 -> 무거움

for (let [big, small] of objects) {
  graph[big].push(small);
  rgraph[small].push(big);
}

const answer = [];

const bfs = (node, g) => {
  const visited = Array.from({ length: N + 1 }, () => false);

  visited[node] = true;
  const queue = [node];

  let cnt = 0;

  while (queue.length > 0) {
    const cur = queue.shift();
    cnt++;

    for (let next of g[cur]) {
      if (visited[next]) continue;
      visited[next] = true;
      queue.push(next);
    }
  }

  return cnt - 1;
};

for (let node = 1; node <= N; node++) {
  let cnt = 0;
  cnt += bfs(node, graph);
  cnt += bfs(node, rgraph);

  answer.push(N - 1 - cnt);
}

console.log(answer.join("\n"));
