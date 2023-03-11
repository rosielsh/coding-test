// 인구 이동 

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[NLR, ...country] = require('fs').readFileSync(filePath).toString().trim().split('\n');
[N, L, R] = NLR.split(' ').map(Number);
country = country.map(x=>x.split(' ').map(Number));

// 입력 
// N: 땅의 크기, L: 인구 차이 하한, R: 인구 차이 상한
// N*N크기의 땅의 각 나라별 인구 수, A[r][c]: r행 c열에 위치하는 나라의 인구수

// 출력
// 인구 이동이 발생하는 날짜 수

// 하루 동안 인구 이동 과정
// 1. 국경선을 공유하는 두 나라의 인구차이가 L이상 R이하 => 국경선 개방
// 2. 국경선 개방 후 인구 이동 시작
// 3. 국경선 개방으로 갈 수 있는 나라 = 연합이라고 하고, 연합을 이루는 각 칸의 인구수는 전체 연합 인구수/연합 국가 수이다.
// 4. 국경선을 닫는다.
// 5. 인구 이동이 없을 때까지 반복한다. 

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];
let visited = Array.from({length: N}, ()=>Array(N).fill(0));

function dfs(y, x, visited) {
  const queue = [[y, x, country[y][x]]];
  visited[y][x] = 1;
  let totalSum = 0;
  let union = [[y, x]];

  while(queue.length) {
    [curY, curX, sum] = queue.pop();
    totalSum += country[curY][curX];

    for(let i=0; i<4; i++) {
      ny = curY + dy[i];
      nx = curX + dx[i];

      if(ny < 0 || ny >= N || nx < 0 || nx >= N || visited[ny][nx]) continue;
      const sub = Math.abs(country[curY][curX] - country[ny][nx]);
      if(sub < L || sub > R) continue;

      visited[ny][nx] = 1;
      queue.push([ny, nx, sum+country[ny][nx]]);
      union.push([ny, nx]);
    }
  }
  
  // 인구 이동 x 
  if(union.length== 1) {
    return 0;
  } 

  // 인구 이동 시작
  else {
    const result = parseInt(totalSum/(union.length));
    for(let i=0; i<union.length; i++) {
      [y, x] = union[i];
      country[y][x] = result;
    }
    return 1;
  }
}

function solution() {
  let answer = 0;
  while(1) {
    let isCountinue = false;
    visited = Array.from({length: N}, ()=>Array(N).fill(0));
    // 1일 동안 인구이동 진행 
    for(let i=0; i<N; i++) {
      for(let j=0; j<N; j++) {
        // 만약 이미 연합된 나라이면 pass
        if(visited[i][j]) continue;
        // 인구이동이 있었다면 다음날도 진행
        if(dfs(i, j, visited)) isCountinue = true;
      }
    }
    
    // 인구이동이 있다 => 다음날도 검사 
    if(isCountinue) {
      answer++;
    }
    // 인구이동이 없다 
    else break;
  }

  return answer;
}

console.log(solution());