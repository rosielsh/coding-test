// 문제 : 숨바꼭질(1697)

// 입력 : 수빈이의 위치(N), 동생의 위치(K)
// 출력 : 수빈이가 동생을 찾는 가장 빠른 시간

// input
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require('fs').readFileSync(filePath).toString().split('\n');
const [N, K] = input[0].split(' ').map(ele => +ele);

function solution() {
    const queue = [[N, 0]];
    const visited = Array.from({length: 100000}, () => false);

    while(queue.length) {
        const [cur, time] = queue.shift();
        if(visited[cur]) continue;
        visited[cur] = true;

        if(cur === K) {
            console.log(time);
            break;
        }
        for(let i of [cur-1, cur+1, cur*2]) {
            if(!visited[i] && i <= 100000 && i >= 0) {
                queue.push([i, time+1]);
            }
        }
    }
}


solution();