// List of Unique Numbers

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[N, numbers] = require("fs").readFileSync(filePath).toString().trim().split("\n");
N = +N;
numbers = numbers.split(" ").map(Number);

function solution() {
  let answer = 0;
  let queue = [];
  let set = new Set();

  for (let i = 0; i < N; i++) {
    currentNum = numbers[i];
    // 중복되는 수가 구간 내에 포함되어 있는 경우
    // ex) set에 1 2 3 이 들어가 있는데 2를 넣어야 한다.
    // 2를 만날때 까지 shift를 하고 해당 값을 set 객체에서 삭제
    if (set.has(currentNum)) {
      while (1) {
        [index, num] = queue.shift();
        set.delete(num);
        if (num === currentNum) break;
      }
    }
    queue.push([i, currentNum]);
    set.add(currentNum);

    answer += queue.length;
  }
  return answer;
}

console.log(solution());
