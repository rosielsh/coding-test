// 컨베이어 벨트 위의 로봇

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[NK, A] = require("fs").readFileSync(filePath).toString().trim().split("\n");
[N, K] = NK.split(" ").map(Number);
const belt = A.split(" ").map(Number);

// 로봇 유무를 나타내는 배열
const robot = Array.from({ length: N }, () => 0);

// 벨트 회전
function rotateBelt() {
  // 벨트 회전
  const last = belt[2 * N - 1];
  for (let i = 2 * N - 1; i >= 1; i--) {
    belt[i] = belt[i - 1];
  }
  belt[0] = last;

  // 로봇 위치 갱신
  for (let i = N - 1; i > 0; i--) {
    robot[i] = robot[i - 1];
  }
  robot[0] = 0; // 방금 회전했으니 0번째는 로봇이 없음
}

// 로봇 이동
function moveRobot() {
  // 마지막에 로봇이 있었다면 내리는 위치에서 내리게 될 것임
  if (robot[N - 1]) robot[N - 1] = 0;

  // 마지막 제외 끝에서부터 이동 가능한지 판단
  for (let i = N - 2; i >= 0; i--) {
    // 이동하려는 칸에 로봇이 있거나, 내구도가 1보다 작으면 pass
    if (!robot[i] || robot[i + 1] || belt[i + 1] < 1) continue;
    // 이동 가능
    robot[i] = 0;
    robot[i + 1] = 1;
    belt[i + 1] -= 1;
  }

  if (belt[0] !== 0) {
    robot[0] = 1;
    belt[0] -= 1;
  }
}

function calcZero() {
  let cnt = 0;
  for (let i = 0; i < 2 * N; i++) {
    if (!belt[i]) cnt++;
  }
  return cnt;
}

function solution() {
  let answer = 1;

  while (1) {
    rotateBelt();
    moveRobot();
    if (calcZero() >= K) break;
    answer++;
  }

  return answer;
}

console.log(solution());
