// 별 찍기 - 10

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const N = require("fs").readFileSync(filePath).toString().trim().split("\n").map(Number)[0];

let tempCnt = 3;
function makeRect(depth, currentRect) {
  if (3 ** depth === N) return currentRect;

  const nextRect = currentRect.split("\n").map((rows) => {
    return rows.repeat(3);
  });

  currentRect.split("\n").map((rows) => {
    nextRect.push(rows + " ".repeat(tempCnt) + rows);
  });

  currentRect.split("\n").map((rows) => {
    nextRect.push(rows.repeat(3));
  });

  tempCnt *= 3;
  return makeRect(depth + 1, nextRect.join("\n"));
}

function solution() {
  let answer;
  const init = "***\n* *\n***";
  answer = makeRect(1, init);
  return answer;
}

console.log(solution());
