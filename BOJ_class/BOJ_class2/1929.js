// 문제 : 소수 구하기
// 알고리즘 : 에라토스테네스의 체
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const [n, m] = require('fs').readFileSync(filePath).toString().trim().split(' ').map(x=>+x);

function solution() {

    const prime = {1: true};
    
    for (let i = 2; i <= Math.ceil(Math.sqrt(m)); i++) {
        if (prime[i]) {
           continue;
        }
     
        for (let j = i ** 2; j <= m; j += i) {      
           prime[j] = true;
        }
     }
     
     const results = [];
     
     for (let i = n; i <= m; i++) {
         if (!prime[i]) {
             results.push(i);
         }
     }
     
     console.log(results.join("\n"));
}

solution();