// 멀티탭 스케줄링

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [NK, plugs] = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, K] = NK.split(" ").map(Number);
plugs = plugs.split(" ").map(Number);

function searchIndex(tab, index) {
  // 이후 쓰게되는 인덱스 구하기
  for (let i = index + 1; i < plugs.length; i++) {
    if (plugs[i] === tab) return i;
  }
  return Infinity;
}

function solution() {
  let answer = 0;

  // 현재 저장된 멀티탭 (n구 짜리)
  const multiTab = new Set();

  // 전체 플러그 꼽는 순서대로 순회
  plugs.forEach((plug, index) => {
    if (multiTab.size < N) multiTab.add(plug);
    // plug n개 다 꽂았으면
    else {
      // 가장 늦게 쓰는 멀티탭 번호, 거리 저장
      let maxIndex = [-1, -1];
      [...multiTab].forEach((tab) => {
        const useIndex = searchIndex(tab, index);
        if (maxIndex[1] < useIndex) maxIndex = [tab, useIndex];
      });

      const deletePlug = maxIndex[0];
      if (!multiTab.has(plug)) {
        multiTab.delete(deletePlug);
        multiTab.add(plug);
        answer++;
      }
    }
  });
  return answer;
}

console.log(solution());
