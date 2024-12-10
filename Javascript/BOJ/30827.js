const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, K] = input.shift().split(" ").map(Number);
const time = input
  .map((x) => x.split(" ").map(Number))
  .sort((a, b) => {
    if (a[1] === b[1]) return a[0] - b[0];
    return a[1] - b[1];
  });

const endTimes = Array.from({ length: K }, () => 0);

let answer = 0;

for (let [s, e] of time) {
  let cabinetIdx = -1;
  let latestEnd = 0;
  for (let i = 0; i < K; i++) {
    let et = endTimes[i];

    // 이전 회의가 끝나는 시간보다 늦게 시작하고 끝나는 시간이 더 늦음
    if (et < s && latestEnd <= et) {
      latestEnd = et;
      cabinetIdx = i;
    }
  }

  if (cabinetIdx === -1) continue;
  endTimes[cabinetIdx] = e;
  answer++;
}

console.log(answer);
