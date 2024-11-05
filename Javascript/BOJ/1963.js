const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const T = +input.shift();
const isPrime = Array.from({ length: 10000 }, () => true);

for (let i = 2; i <= 9999; i++) {
  if (!isPrime[i]) continue;

  for (let j = i * 2; j <= 9999; j += i) {
    if (!isPrime[j]) continue;
    isPrime[j] = false;
  }
}

for (let t = 0; t < T; t++) {
  const [start, end] = input[t].split(" ").map(Number);

  const visited = Array.from({ length: 10000 }, () => -1);
  const queue = [start];

  visited[start] = 0;

  while (queue.length > 0) {
    const cur = queue.shift();

    if (cur === end) {
      break;
    }

    for (let i = 0; i < 4; i++) {
      const curStr = String(cur).split("");
      for (let j = 0; j <= 9; j++) {
        if (curStr[i] === String(j)) continue;

        curStr[i] = String(j);
        const next = +curStr.join("");

        if (next < 1000) continue;
        if (!isPrime[next] || visited[next] > -1) continue;

        visited[next] = visited[cur] + 1;
        queue.push(next);
      }
    }
  }

  console.log(visited[end]);
}
