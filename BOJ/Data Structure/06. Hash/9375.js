// 패션왕 신해빈

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[T, ...input] = require("fs").readFileSync(filePath).toString().trim().split("\n");

function solution() {
  let answer = [];
  let clothesObj = {};

  for (let i = 0; i < T; i++) {
    n = +input.shift();
    clothes = input.splice(0, n).map((x) => x.replace("\r", "").split(" "));
    clothesObj = {};

    for (let j = 0; j < n; j++) {
      if (Object.keys(clothesObj) && Object.keys(clothesObj).includes(clothes[j][1])) {
        clothesObj[`${clothes[j][1]}`].add(`${clothes[j][0]}`);
      } else {
        clothesObj[`${clothes[j][1]}`] = new Set();
        clothesObj[`${clothes[j][1]}`].add(`${clothes[j][0]}`);
      }
    }

    let cnt = 1;
    for (let value of Object.values(clothesObj)) {
      cnt *= value.size + 1;
    }

    answer.push(cnt - 1);
  }

  return answer.join("\n");
}

console.log(solution());
