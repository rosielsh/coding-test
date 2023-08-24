// 택배

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [NC, M, ...boxes] = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, C] = NC.split(" ").map(Number);
M = +M;
boxes = boxes.map((x) => x.split(" ").map(Number)).sort((a, b) => a[1] - b[1]);

function solution() {
  let answer = 0;
  const truckCapacity = Array.from({ length: N }, () => 0); // 각 마을을 방문할 때 트럭 용량

  boxes.forEach(([send, recv, cnt]) => {
    const inRange = truckCapacity.slice(send - 1, recv);
    const maxCnt = Math.max(...inRange);

    const leftCnt = Math.min(cnt, C - maxCnt);
    answer += leftCnt;

    for (let i = send - 1; i < recv - 1; i++) {
      truckCapacity[i] += leftCnt;
    }
  });

  return answer;
}

console.log(solution());
