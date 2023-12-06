const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [A, B] = input.shift().split(" ").map(Number);
const [N, M] = input.shift().split(" ").map(Number);

const robot = input.splice(0, N).map((x) => x.split(" "));
robot.unshift([]);

const order = input.map((x) => x.split(" "));
const map = Array.from({ length: B }, () => Array(A).fill(0));

const setDir = (dir) => {
  if (dir === "N") {
    return 0;
  } else if (dir === "E") {
    return 1;
  } else if (dir === "S") {
    return 2;
  } else if (dir === "W") {
    return 3;
  }
};

// 북, 동, 남, 서
const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];

// 초기 로봇 상태 저장
for (let i = 1; i <= N; i++) {
  const [x, y, d] = robot[i];
  map[B - Number(y)][Number(x) - 1] = i;
  robot[i][2] = setDir(d);
  robot[i][0] = B - Number(y);
  robot[i][1] = x - 1;
}

for (let i = 0; i < M; i++) {
  let isPossible = true;

  const r = Number(order[i][0]);
  const cmd = order[i][1];
  const cnt = Number(order[i][2]);

  if (cmd === "L") {
    for (let j = 0; j < cnt; j++) {
      robot[r][2] = (robot[r][2] + 3) % 4;
    }
  } else if (cmd === "R") {
    for (let j = 0; j < cnt; j++) {
      robot[r][2] = (robot[r][2] + 1) % 4;
    }
  } else if (cmd === "F") {
    for (let j = 0; j < cnt; j++) {
      const [x, y, d] = robot[r];
      const nx = x + dx[d]; // 다음 x
      const ny = y + dy[d]; // 다음 y

      // 벽에 부딫힘
      if (nx < 0 || nx >= B || ny < 0 || ny >= A) {
        isPossible = false;
        console.log(`Robot ${r} crashes into the wall`);
        break;
      }

      // 다른 로봇과 충돌
      if (map[nx][ny] > 0) {
        isPossible = false;
        console.log(`Robot ${r} crashes into robot ${map[nx][ny]}`);
        break;
      }

      robot[r][0] = nx;
      robot[r][1] = ny;
      map[nx][ny] = r;
      map[x][y] = 0;
    }

    if (!isPossible) return;
  }
}

console.log("OK");
