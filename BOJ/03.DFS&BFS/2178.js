// 문제 : 미로 탐색(2178)
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require('fs').readFileSync(filePath).toString().split('\n');
const [N, M] = input.shift().split(' ').map(ele=>+ele);
const map = [];
for(let i=0; i<N; i++) {
    map.push(input.shift().replace('\r', '').split('').map(ele=>+ele));
}

function solution() {
    const pos = [[0, -1], [0, 1], [-1 ,0], [1, 0]];
    const move = Array.from(Array(N), ()=>new Array(M).fill(0));
    const queue = [];
    queue.push([0, 0]);
    move[0][0] = 1;

    while(queue.length) {
        const [y, x] = queue.shift();
        map[y][x] = 0;

        for(let i = 0; i<4; i++) {
            const ypos = y + pos[i][0];
            const xpos = x + pos[i][1];

            if(ypos < 0 || ypos >= N || xpos < 0 || xpos >= M) continue;
            else if(map[ypos][xpos]) {
                map[ypos][xpos] = 0;
                move[ypos][xpos] = move[y][x] + 1;
                queue.push([ypos, xpos]);
            }
        }
    }
    console.log(move[N-1][M-1]);
}

solution();