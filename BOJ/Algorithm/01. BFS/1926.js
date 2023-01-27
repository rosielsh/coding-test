const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const [n, m] = input.shift().split(' ').map(x=>+x);
const paper = input.map(x=>x.split(' ').map(x=>+x));

function solution() {
  const ans_list = [];
  let answer = 0;
  let needVisit = [];
  const pos = [[0, 1], [1, 0], [-1, 0], [0, -1]];

  for(let i=0; i<n; i++) {
    for(let j=0; j<m; j++) {
      if(paper[i][j]) {
        needVisit = [[i, j]];
        answer = 0;
        while(needVisit.length) {
          const [ypos, xpos] = needVisit.shift();
          
          for(let k=0; k<4; k++) {
            const Y = ypos + pos[k][0];
            const X = xpos + pos[k][1];

            if(Y < 0 || Y > n-1 || X < 0 || X > m-1) continue;

            if(paper[Y][X] === 1) {
              paper[Y][X] = 0;
              needVisit.push([Y, X]);
              answer++;
            }
          }
        }
        ans_list.push(answer === 0?1:answer);
      }
    }
  }
  return [ans_list.length, Math.max(...ans_list)].join('\n');
}

console.log(solution());