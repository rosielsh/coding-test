// 친구

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[N, ...matrix] = require('fs').readFileSync(filePath).toString().trim().split('\n');
matrix = matrix.map(x=>x.replace('\r', '').split(''));

function solution() {
  let answer = [];
  let friends = matrix.map(x=>[...x]);

  for(let k=0; k<N; k++) {
    for(let i=0; i<N; i++) {
        for(let j=0; j<N; j++) {
            if(i === j) continue;

            if(matrix[i][k] === 'Y' && matrix[k][j] === 'Y' || matrix[i][j] === 'Y') {
                friends[i][j] = 'Y';
            }
        }
    }
  }

  let sum;
  for(let i=0; i<N; i++) {
    sum = 0;
    for(let j=0; j<N; j++) {
        if(friends[i][j] === 'Y') sum++;
    }
    answer.push(sum);
  }
  return answer.sort((a, b)=>a-b).at(-1);
}

console.log(solution());