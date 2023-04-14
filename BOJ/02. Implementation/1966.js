// 프린터 큐

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[T, ...input] = require("fs").readFileSync(filePath).toString().trim().split("\n");
T = +T;

function solution() {
  let answer = [];
  let result = [];
  for (let i = 0; i < T * 2; i += 2) {
    [N, M] = input[i].split(" ").map(Number);
    result = [];
    // 현재 문서의 중요도
    const importance = input[i + 1].split(" ").map(Number);
    const copyImportance = [];

    for (let i = 0; i < N; i++) {
      copyImportance.push([importance[i], i]);
    }

    let firstImportance = copyImportance[0][0];

    while (copyImportance.length) {
      let isExist = false;
      firstImportance = copyImportance[0][0];

      for (let i = 1; i < copyImportance.length; i++) {
        if (copyImportance[i][0] > firstImportance) {
          isExist = true;
          copyImportance.push(copyImportance.shift());
          break;
        }
      }

      if (!isExist) {
        result.push(copyImportance.shift());
      }

      if (result.length && result.at(-1)[1] === M) {
        answer.push(result.length);
        break;
      }
    }
  }

  return answer.join("\n");
}

console.log(solution());
