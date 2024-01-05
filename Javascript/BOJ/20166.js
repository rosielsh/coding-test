const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, M, K] = input.shift().split(' ').map(Number);
const board = input.splice(0, N).map(x => x.split(''));
const str = input;

const map = new Map();

// 8방 탐색
const dx = [-1, -1, -1, 0, 0, 1, 1, 1];
const dy = [-1, 0, 1, -1, 1, -1, 0, 1];

// 문자열을 만들 수 있는 경우의 수
let cnt = 0;

const dfs = (x, y, likeStr, curStr, idx) => {
    if(likeStr === curStr) {
        cnt++;
        return;
    }

    for(let i=0; i<8; i++) {
        let nx = x + dx[i];
        let ny = y + dy[i];

        if(ny === -1 && (nx >= 0 && nx < N)) ny = M-1;
        else if(ny === M && (nx >= 0 && nx < N)) ny = 0;
        else if(nx === -1 && (ny >= 0 && ny < M)) nx = N-1;
        else if(nx === N && (ny >= 0 && ny < M)) nx = 0;

        else if(nx === -1 && ny === -1) {
            nx = N-1;
            ny = M-1;
        }

        else if(nx === N && ny === -1) {
            nx = 0; 
            ny = M-1;
        }

        else if(nx === -1 && ny === M) {
            nx = N-1;
            ny = 0;
        }

        else if(nx === N && ny === M) {
            nx = 0;
            ny = 0;
        }

        if(board[nx][ny] === likeStr[idx]) {
            dfs(nx, ny, likeStr, curStr + board[nx][ny], idx+1);
        } 
    }
};

const answer = [];
for(let s of str) {
    const likeStr = s;

    if(map.has(likeStr)) {
        answer.push(map.get(likeStr));
        continue;
    }

    const start = s[0];

    // 2차원 배열 탐색
    for(let i=0; i<N; i++) {
        for(let j=0; j<M; j++) {
            if(board[i][j] != start) continue;
            dfs(i, j, likeStr, board[i][j], 1);
        }
    }

    answer.push(cnt);
    map.set(likeStr, cnt);
    cnt = 0;
}

console.log(answer.join('\n'));