// 문제 : 데스 나이트
// 런타임 에러
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const N = +input.shift();
const [r1, c1, r2, c2] = input.shift().split(' ').map(x=>+x);
const moveCnt = Array.from({length: N}, () => Array(N).fill(-1));
    
function bfs(r, c) {
    const queue = [[r,c]];
    const pos = [[-2, -2, 0, 0, 2, 2], [-1, 1, -2, 2, -1, 1]];
    moveCnt[r][c] = 0;

    while(queue.length) {
        const [curR, curC] = queue.shift();

        for(let i=0; i<6; i++) {
            let [R, C] = [curR+pos[0][i], curC+pos[1][i]];
            if(R >= 0 && R <= N && C >= 0 && C <= N && moveCnt[R][C] === -1) { 
                moveCnt[R][C] = moveCnt[curR][curC] + 1;
                queue.push([R, C]);
            }
        }
    }
    console.log(moveCnt[r2][c2]);
}

function solution() {
    bfs(r1, c1);
}

solution();