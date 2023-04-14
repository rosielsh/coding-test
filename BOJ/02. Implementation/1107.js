// 리모컨 => 실패

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[N, M, btn] = require("fs").readFileSync(filePath).toString().trim().split("\n");
goalChannel = N.replace("\r", "").split("").map(Number);
M = +M;
if (M === 0) {
  console.log(goalChannel.length);
  return;
}
btn = btn.replace("\r", "").split(" ").map(Number);

let errorBtn = Array.from({ length: 10 }, (_, idx) => idx);
for (let i = 0; i < M; i++) {
  errorBtn[btn[i]] = -1;
}

let maxValue = Number.MIN_SAFE_INTEGER;
let minValue = Number.MAX_SAFE_INTEGER;
for (let i = 0; i < 10; i++) {
  if (errorBtn[i] === -1) continue;
  maxValue = Math.max(maxValue, errorBtn[i]);
  minValue = Math.min(minValue, errorBtn[i]);
}

function solution() {
  let answer;
  let curChannel = [];
  let s_flag = false;
  let b_flag = false;

  if (goalChannel.join("") === "100") return 0;

  for (let i = 0; i < goalChannel.length; i++) {
    if (errorBtn[goalChannel[i]] !== -1) {
      // 고장난 버튼 x
      if (s_flag) {
        curChannel[i] = maxValue;
      } else if (b_flag) {
        curChannel[i] = minValue;
      } else curChannel[i] = goalChannel[i];
    } else {
      // 고장난 버튼 0
      if (!s_flag && !b_flag) {
        // 아직 한번도 다른적이 없다
        for (let k = 1; ; k++) {
          // 고장난 버튼 아니면
          if (errorBtn[goalChannel[i] - k] !== -1 && goalChannel[i] - k >= 0) {
            curChannel[i] = goalChannel[i] - k;
            s_flag = true;
            break;
          }

          if (errorBtn[goalChannel[i] + k] !== -1 && goalChannel[i] + k < 10) {
            curChannel[i] = goalChannel[i] + k;
            b_flag = true;
            break;
          }
        }
      } else if (s_flag) {
        // 앞에서 작은 수를 저장한 경우
        // 넣을 수 있는 값 중 최대값 넣기
        curChannel[i] = maxValue;
      } else if (b_flag) {
        // 앞에서 큰 수를 저장한 경우
        curChannel[i] = minValue;
      }
    }
    console.log(curChannel);
  }
  answer =
    Math.abs(Number(goalChannel.join("")) - Number(curChannel.join(""))) + goalChannel.length;
  return answer;
}

console.log(solution());
