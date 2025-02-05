const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const T = +input.shift();

const prime = Array.from({ length: 10001 }, () => true);

prime[1] = false;

for (let i = 2; i <= 100; i++) {
  for (let j = i * 2; j <= 10000; j += i) {
    prime[j] = false;
  }
}

const answer = [];

for (let i = 0; i < T; i++) {
  const [f, t] = input[i].split(" ").map(Number);
  const visited = Array.from({ length: 10001 }, () => false);
  const queue = [];

  queue.push([f, 0]);
  visited[f] = true;

  while (queue.length > 0) {
    const [num, cnt] = queue.shift();

    if (num === t) {
      answer.push(cnt);
      break;
    }

    for (let i = 0; i < 4; i++) {
      const prev = String(num).split("");
      for (let j = 0; j <= 9; j++) {
        if (prev[i] === j) continue;

        prev[i] = j;

        const next = +[...prev].join("");

        if (next < 1000 || visited[next] || !prime[next]) continue;

        visited[next] = true;
        queue.push([next, cnt + 1]);
      }
    }
  }
}

console.log(answer.join("\n"));
