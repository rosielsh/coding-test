const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [NM, ...city] = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, M] = NM.split(" ").map(Number);
city = city.map((x) => x.split(" ").map(Number));

function calcChickenPos() {
  const pos = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (city[i][j] === 2) pos.push([i, j]);
    }
  }

  return pos;
}

let chickenPos = calcChickenPos();
let minCityDistance = Number.MAX_SAFE_INTEGER;
const closed = Array.from({ length: chickenPos.length }, () => 1);

function calcCityDistance() {
  let cityDistance = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (city[i][j] === 1) {
        let minDistance = Number.MAX_SAFE_INTEGER;
        for (let pos = 0; pos < chickenPos.length; pos++) {
          if (closed[pos]) continue;
          const curChickenDistance =
            Math.abs(i - chickenPos[pos][0]) + Math.abs(j - chickenPos[pos][1]);
          minDistance = Math.min(minDistance, curChickenDistance);
        }
        cityDistance += minDistance;
      }
    }
  }
  minCityDistance = Math.min(cityDistance, minCityDistance);
}

function combination(depth, idx) {
  if (depth === M) {
    calcCityDistance();
    return;
  }

  for (let i = idx; i < chickenPos.length; i++) {
    closed[i] = 0;
    combination(depth + 1, i + 1, chickenPos);
    closed[i] = 1;
  }
}

function solution() {
  let answer = 0;
  combination(0, 0);
  answer = minCityDistance;
  return answer;
}

console.log(solution());
