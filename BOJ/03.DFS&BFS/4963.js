// 문제 : 섬의 개수
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require('fs').readFileSync(filePath).toString().split('\n');
let w, h;

const bfs = (map, y ,x) => {
    const queue = [[y, x]];
    map[y][x] = 0;
    const pos = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    
    while(queue.length) {
        const [Y, X] = queue.shift();
        
        for(let i = 0; i < 8; i++) {
            const ypos = Y + pos[i][0];
            const xpos = X + pos[i][1];

            if(ypos < 0 || ypos >= h || xpos < 0 || xpos >= w) continue;

            if(map[ypos][xpos]) {
                map[ypos][xpos] = 0;
                queue.push([ypos, xpos]);
            }
        }
    }
}

function solution() {

    while(1) {
        [w, h] = input.shift().split(' ').map(x=>+x);
        if(h === 0)  return;

        const map = [];
        for(let i = 0; i < h; i++) {
            map.push(input.shift().split(' ').map(x=>+x));
        }

        if(h === 1) {
            console.log(map[0][0]);
            continue;
        }

        let cnt = 0;
        for(let j = 0; j < h; j++) {
            for(let k = 0; k < w; k++) {
                if(map[j][k]) {
                    bfs(map, j, k);
                    cnt++;
                }
            }
        }
        console.log(cnt);
    };

    
}

solution();