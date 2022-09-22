// 문제 : 바이러스(2606)
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require('fs').readFileSync(filePath).toString().split('\n');
const com = +input.shift();
const N = +input.shift();
const connected = Array.from(Array(com+1), ()=>[]);
for(let i = 0; i<N; i++) {
    const [a, b] = input.shift().split(' ').map(x=>+x);
    connected[a].push(b);
    connected[b].push(a);
}

const visited = new Array(com+1).fill(false);
let cnt = 0;

const dfs = (start) => {
    const stack = [start];
    while(stack.length) {
        const cur = stack.pop();
        for(let i of connected[cur]) {
            if(!visited[i]) { // 방문하지 않은것
                stack.push(i);
                visited[i] = true;
                cnt++;
            }
        }
    }
    console.log(cnt-1);
}

function solution() {
    dfs(1);
}

solution();