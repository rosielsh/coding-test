// 고층 건물

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[N, building] = require('fs').readFileSync(filePath).toString().trim().split('\n');
N = +N;
building = building.split(' ').map(Number);

function checkViewBuilding(index) {
  const currentHeight = building[index];
  let cnt = 0;

  let leftMinInclination = Number.MAX_SAFE_INTEGER;

  // 왼쪽 체크
  for(let i=index-1; i>=0; i--) {
    const checkBuildingHeight = building[i];
    const inclination = (currentHeight-checkBuildingHeight)/(index-i);

    // 현재 기울기가 지금까지 기울기의 최솟값보다 작을 때 
    if(inclination < leftMinInclination) {
      cnt++;
      leftMinInclination = inclination;
    }
  }

  let rightMaxInclination = Number.MIN_SAFE_INTEGER;

  // 오른쪽 체크
  for(let i=index+1; i<N; i++) {
    const checkBuildingHeight = building[i];
    const inclination = (checkBuildingHeight-currentHeight)/(i-index);

    // 현재 기울기가 지금까지 기울기의 최댓값보다 클 때 
    if(inclination > rightMaxInclination) {
      cnt++;
      rightMaxInclination = inclination;
    }
  }

  return cnt;
}

function solution() {
  let answer = Number.MIN_SAFE_INTEGER;
  for(let i=0; i<N; i++) {
    answer = Math.max(checkViewBuilding(i), answer);
  }

  return answer;
}

console.log(solution());