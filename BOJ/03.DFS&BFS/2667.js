// 문제 : 단지번호붙이기
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require('fs').readFileSync(filePath).toString().split('\n');
const N = +input.shift();
const apt = [];
for(let i = 0; i<N; i++) {
    apt.push(input.shift().replace('\r', '').split('').map(x=>+x));
}
const aptCntList = [];

const bfs = (y, x) => {
    const queue = [[y, x]];
    const visited = Array.from(Array(N), ()=>new Array(N).fill(false));
    let cnt = 0;
    const pos = [[0, -1], [0, 1], [-1 ,0], [1, 0]];

    while(queue.length) {
        const [Y, X] = queue.shift();

        for(let i = 0; i < 4; i++) {
            const ypos = Y + pos[i][0];
            const xpos = X + pos[i][1];

            if(ypos < 0 || ypos >= N || xpos < 0 || xpos >= N) continue;
            
            if(!visited[ypos][xpos] && apt[ypos][xpos] === 1) {
                queue.push([ypos, xpos]);
                visited[ypos][xpos] = true;
                apt[ypos][xpos] = 0;
                cnt++;
            }
        }
    }
    aptCntList.push(cnt);
}

function solution() {
    for(let i=0; i<N; i++) {
        for(let j=0; j<N; j++) {
            if(apt[i][j]) {
                bfs(i, j);
            }
        }
    }
    console.log(aptCntList.length);
    aptCntList.map((ele, idx) => {
        if(ele === 0) aptCntList[idx] = 1;
    })
    for(let i of aptCntList.sort((a, b) => a-b)) console.log(+i);
}

solution();