// 톱니바퀴

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
let gear = input.splice(0, 4).map((x) => x.replace("\r", "").split("").map(Number));
const K = +input.shift();
const rotate = input.map((x) => x.split(" ").map(Number));

function rotateClockWise(gearIdx) {
  let last = gear[gearIdx][7];
  for (let i = 7; i >= 1; i--) {
    gear[gearIdx][i] = gear[gearIdx][i - 1];
  }
  gear[gearIdx][0] = last;
}

function rotateCounterClockWise(gearIdx) {
  let first = gear[gearIdx][0];
  for (let i = 0; i <= 6; i++) {
    gear[gearIdx][i] = gear[gearIdx][i + 1];
  }
  gear[gearIdx][7] = first;
}

// 톱니바퀴를 회전시키는 함수
function rotateGear(rotateGearIdx, rotateDirection) {
  const visited = Array.from({ length: 4 }, () => 0);
  const queue = [[rotateGearIdx, rotateDirection]];
  visited[rotateGearIdx] = 1;
  const needRotate = [];

  while (queue.length) {
    [curIdx, direction] = queue.shift();
    needRotate.push([curIdx, direction]);

    // 왼쪽 바퀴 탐색
    if (curIdx - 1 >= 0 && !visited[curIdx - 1] && gear[curIdx][6] !== gear[curIdx - 1][2]) {
      visited[curIdx - 1] = 1;
      if (direction === -1) {
        queue.push([curIdx - 1, 1]);
      } else {
        queue.push([curIdx - 1, -1]);
      }
    }

    // 오른쪽 바퀴 탐색
    if (curIdx + 1 < 4 && !visited[curIdx + 1] && gear[curIdx][2] !== gear[curIdx + 1][6]) {
      visited[curIdx + 1] = 1;
      if (direction === -1) {
        queue.push([curIdx + 1, 1]);
      } else {
        queue.push([curIdx + 1, -1]);
      }
    }
  }

  // bfs 돌려서 회전해야 할 인덱스만 회전 처리
  for (let i = 0; i < needRotate.length; i++) {
    [idx, d] = needRotate[i];

    if (d === -1) {
      rotateCounterClockWise(idx);
    } else rotateClockWise(idx);
  }
}

function calcScore() {
  let score = 0;
  if (gear[0][0]) score += 1;
  if (gear[1][0]) score += 2;
  if (gear[2][0]) score += 4;
  if (gear[3][0]) score += 8;
  return score;
}

function solution() {
  let answer;
  for (let i = 0; i < K; i++) {
    [currentNumber, direction] = rotate[i];
    rotateGear(currentNumber - 1, direction);
  }
  answer = calcScore();
  return answer;
}

console.log(solution());
