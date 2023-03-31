// 프린터 큐

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[T, ...input] = require('fs').readFileSync(filePath).toString().trim().split('\n');
T = +T;

// 1. Queue의 가장 앞에 있는 문서의 중요도를 확인
// 2. Queue 안에 있는 나머지 문서들 중 현재 문서보다 중요한 문서가 하나라도 있다면 이 문서를 뒤로 재배치
// 3. 가장 중요하다면 바로 인쇄 

// 입력
// N : 문서 수, M : 몇 번째로 인쇄되었는지 궁금한 문서
// N개의 문서의 중요도 (1 이상 9 이하의 정수)
// 중요도가 같은 문서가 여러개 있을 수 있음 

function solution() {
  let answer = [];
  let result = [];
  for(let i=0; i<T*2; i+=2) {
    [N, M] = input[i].split(' ').map(Number);
    result = []
    // 현재 문서의 중요도 
    const importance = input[i+1].split(' ').map(Number);
    const copyImportance = [];

    for(let i=0; i<N; i++) {
      copyImportance.push([importance[i], i]);
    }

    // 현재 문서
    // [2,0], [1,1], [4,2], [3,3]

    // 현재 가장 앞의 중요도
    let firstImportance = copyImportance[0][0];

    while(copyImportance.length) {
      let isExist = false;
      firstImportance = copyImportance[0][0];

      for(let i=1; i<copyImportance.length; i++) {
        if(copyImportance[i][0] > firstImportance) {
          isExist = true;
          copyImportance.push(copyImportance.shift());
          break;
        }
      }

      if(!isExist) {
        result.push(copyImportance.shift());
      }

      if(result.length && result.at(-1)[1] === M) {
        answer.push(result.length);
        break;
      }
    }
  }

  return answer.join('\n');
}

console.log(solution());