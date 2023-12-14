const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

// 맵 크기, 파이어볼 개수, 명령 수
const [N, M, K] = input.shift().split(" ").map(Number);

// M개의 줄 => 파이어볼 정보 (r, c, m, s, d) (행, 열, 질량, 속력, 방향)
const fireball = input.splice(0, M).map((x) => x.split(" ").map(Number));
fireball.unshift([]);

// 맵 선언 (3차원 배열)
let map = Array.from({ length: N }, () => Array.from({ length: N }, () => []));

for (let i = 1; i <= M; i++) {
  const [r, c, m, s, d] = fireball[i];
  map[r - 1][c - 1].push([m, s, d]); // 2차원 map의 r행 c열 위치에 현재 파이어볼의 질량, 속력, 방향 저장
}

// 8방향
const dx = [-1, -1, 0, 1, 1, 1, 0, -1];
const dy = [0, 1, 1, 1, 0, -1, -1, -1];

const moveFireBall = () => {
  const tempMap = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => [])
  );

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      // 현재 맵에 파이어볼이 있다면
      if (map[i][j].length > 0) {
        for (let k = 0; k < map[i][j].length; k++) {
          const [m, s, d] = map[i][j][k];

          // 다음 이동하게 될 위치 정하기
          let nx = (i + dx[d] * s) % N;
          let ny = (j + dy[d] * s) % N;

          if (nx < 0) nx += N;
          if (ny < 0) ny += N;

          tempMap[nx][ny].push([m, s, d]);
        }
      }
    }
  }

  map = tempMap.map((x) => [...x]);
};

const sumDivideFireBall = () => {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      // 현재 맵의 위치에 2개 이상의 볼이 있다면
      if (map[i][j].length > 1) {
        // 현재 위치의 모든 정보들
        let mSum = 0; // 질량의 합
        let sSum = 0; // 속력
        let oddCnt = 0;
        let evenCnt = 0;

        // 현재 위치에 있는 모든 볼에 대해 반복
        for (let k = 0; k < map[i][j].length; k++) {
          const [m, s, d] = map[i][j][k];
          mSum += m;
          sSum += s;

          if (d % 2 === 1) oddCnt++;
          else evenCnt++;
        }

        const nm = Math.floor(mSum / 5);
        const ns = Math.floor(sSum / map[i][j].length);
        const dir = oddCnt === 0 || evenCnt === 0 ? [0, 2, 4, 6] : [1, 3, 5, 7];

        if (nm <= 0) {
          map[i][j] = [];
          continue;
        }

        let dividedBalls = [];
        for (let d = 0; d < 4; d++) {
          dividedBalls.push([nm, ns, dir[d]]);
        }

        // 원래 맵 자리에 붙여넣기
        map[i][j] = dividedBalls.map((x) => [...x]);
      }
    }
  }
};

let answer = 0;

const calcMSum = () => {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (map[i][j].length > 0) {
        for (let k = 0; k < map[i][j].length; k++) {
          answer += map[i][j][k][0];
        }
      }
    }
  }
};

// K번 이동을 명령한다
for (let k = 0; k < K; k++) {
  // 모든 파이어볼을 이동 시킨다.
  moveFireBall();
  // 이동이 끝나면 2개 이상의 파이어볼이 있는 칸을 찾아 하나로 합치고 나누어준다.
  sumDivideFireBall();
}

// 남은 파이어볼 질량 구하기
calcMSum();

console.log(answer);
