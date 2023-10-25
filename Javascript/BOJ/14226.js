const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const S = Number(input);

function bfs() {
  const queue = [[1, 0, 0]];
  const visited = Array.from({ length: 1001 }, () => Array(1001).fill(false));
  visited[1][0] = true;

  while (queue.length) {
    const [screen, clip, time] = queue.shift(); // [1, 0, 0]으로 시작

    if (screen === S) {
      return time;
    }

    if (screen > 0 && screen <= 1000 && !visited[screen][screen]) {
      visited[screen][screen] = true;
      queue.push([screen, screen, time + 1]);
    }

    if (clip > 0 && screen + clip <= 1000 && !visited[screen + clip][clip]) {
      visited[screen + clip][clip] = true;
      queue.push([screen + clip, clip, time + 1]);
    }

    if (screen > 0 && screen <= 1001 && !visited[screen - 1][clip]) {
      visited[screen - 1][clip] = true;
      queue.push([screen - 1, clip, time + 1]);
    }
  }
}

const res = bfs();
console.log(res);
