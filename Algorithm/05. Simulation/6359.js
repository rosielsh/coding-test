const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [T, ...n] = require('fs').readFileSync(filePath).toString().trim().split('\n').map(x=>+x);

function solution() {
  let answer;
  for(let i=0; i<T; i++) {
    answer = 0;
    const arr = Array.from({length: n[i]}, ()=>1); // 열린 것이 1
    for(let j=2; j<=n[i]; j++) {
      for(let k=0; k<n[i]; k++) {
        // console.log(k, j);
        if((k+1) % j === 0) {
          if(arr[k] === 0) arr[k] = 1;
          else arr[k] = 0;
        }
      }
    }
    arr.forEach(x=>{
      if(x===1) answer++;
    })
    console.log(answer);
  }
}

solution();