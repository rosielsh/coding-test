// 문제 : 랜선 자르기
// 알고리즘 : 이분 탐색

const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const [K, N] = input.shift().split(' ');
const lines = [...input].map(x => +x);

function solution() {
    let left = 1;
    let right = Math.max(...lines);
    let mid;

    while(left <= right) {
        mid = parseInt((left+right) / 2);

        const result = lines.reduce((acc, cur) => {
            return acc + parseInt(cur/mid)
        }, 0);

        if(result < N) { // 만들고자하는 랜선보다 적으면
            right = mid - 1;// 단위를 작게 해주어야 한다.
        } 
        else if(result >= N) { 
            // 같은 경우도 포함하는 이유 : 어쨌든 N와 가깝게(result를 줄이려면) 만들려면 나누는 단위를 늘려야 하기 때문
            left = mid + 1;
        }
    }
    console.log(right);
    
}

solution();