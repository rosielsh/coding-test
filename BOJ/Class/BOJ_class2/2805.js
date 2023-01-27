// 문제 : 나무 자르기
// 알고리즘 : 이분 탐색
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const [N, M] = input.shift().split(' ').map(x=>+x);
const tree = input.shift().split(' ').map(x=>+x);

function solution() {
    let min = 1;
    let max = Math.max(...tree);

    while(min <= max) {
        let mid = parseInt((min+max)/2);
        let result = 0;
        tree.map(x => {
            if(x-mid > 0) 
                 result += x-mid;
        })
        
        if(result < M) max = mid - 1;
        else if(result >= M) min = mid + 1;
    }
    console.log(max);
}

solution();