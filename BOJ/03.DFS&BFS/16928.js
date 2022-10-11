// 문제 : 뱀과 사다리 게임
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const [N, M] = input.shift().split(' ').map(x=>+x);
// board : 사다리와 뱀 정보가 저장된 게임판, 0번을 제외한 인덱스를 사용하기 위해 길이를 101로 선언
const board = Array.from({length:101}, ()=>0);
for(let i = 0; i<N+M; i++) {
    const [a, b] = input.shift().split(' ').map(x=>+x);
    board[a] = b;
}

// bfs 함수 : 인자는 시작하는 위치
function bfs(start) {
    const queue = [start]; // * 시작 노드 설정
    const pos = [1, 2, 3, 4, 5, 6]; // 현재 위치에서 갈 수 있는 경우의 수들
    const cnt = Array.from({length: 101}, () => -1); // * 연산 횟수 저장하는 배열
    // 본래 bfs는 보통 visited라고 해서 방문 여부를 true/false로 체크하지만, 
    // 본 문제에서는 구하는 것이 최소 연산 횟수 이므로, 방문하지 않은 것들은 모두 -1로 세팅하고 
    // 나머지 값들을 연산 횟수로 채운다.
    cnt[start] = 0; // 시작점의 연산 횟수는 0
    
    // bfs 시작
    while(queue.length) { // queue가 비지 않는 동안
        const cur = queue.shift(); // 1. 현재 queue에 있는 원소 꺼내기

        for(let p of pos) { // 2. 현재 위치에서 이동할 수 있는 모든 위치에 대해 for문으로 순회 
            let idx = cur+p; // 3. 후보를 인덱스 변수로 받음
            if(idx > 100) continue; // 4. 가고자 하는 곳이 범위를 벗어나는 것에대한 예외 처리
            if(board[idx] !== 0) { // 5. 현재 board에 저장된 값이 있으면 거기로 이동
                idx = board[idx];
            }
            if(cnt[idx] === -1) { // 6. 이동한 위치가 방문하지 않은 곳이라면 
                cnt[idx] = cnt[cur] + 1; // 연산 횟수 + 1
                queue.push(idx); // queue에 현재 인덱스 삽입
            }
        }
    }

    console.log(cnt[100]);
}

function solution() {
    bfs(1);
}

solution();