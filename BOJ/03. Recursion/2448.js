// 별 찍기 - 11

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(Number)[0];
const K = Math.log2(input / 3);

let tempCnt = 3;
function makeStar(depth, currentStar) {
  if (depth === K) return currentStar;
  const nextStar = currentStar.split("\n").map((rows) => {
    return " ".repeat(tempCnt) + rows + " ".repeat(tempCnt);
  });

  currentStar.split("\n").forEach((rows) => {
    nextStar.push(rows + " " + rows);
  });

  tempCnt *= 2;
  return makeStar(depth + 1, nextStar.join("\n"));
}

function solution() {
  let answer;
  const init = "  *  \n * * \n*****";
  answer = makeStar(0, init);
  return answer;
}

console.log(solution());
