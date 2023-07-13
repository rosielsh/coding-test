// dslr

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [T, ...input] = require("fs").readFileSync(filePath).toString().trim().split("\n");
T = Number(T);

function calcNextNum(orderIdx, curValue) {
  let result = curValue;
  switch (orderIdx) {
    case 0:
      if (result * 2 >= 10000) {
        result = (result * 2) % 10000;
      } else {
        result *= 2;
      }
      break;
    case 1:
      if (result === 0) {
        result = 9999;
      } else {
        result -= 1;
      }
      break;
    case 2:
      result = (result % 1000) * 10 + Math.floor(result / 1000);
      break;
    case 3:
      result = (result % 10) * 1000 + Math.floor(result / 10);
      break;
  }

  return result;
}

function bfs(value, target) {
  const queue = [[value, ""]];
  const visited = Array.from({ length: 10000 }, () => 0);
  visited[value] = 1;
  const orderStr = ["D", "S", "L", "R"];

  while (queue.length) {
    const [curValue, curOrder] = queue.shift();

    if (Number(curValue) === Number(target)) return curOrder;

    for (let i = 0; i < 4; i++) {
      const nextValue = calcNextNum(i, curValue);
      if (visited[nextValue]) continue;

      visited[nextValue] = 1;
      queue.push([nextValue, curOrder + orderStr[i]]);
    }
  }

  return;
}

function solution() {
  let answer = [];
  for (let i = 0; i < T; i++) {
    const [init, target] = input[i].split(" ").map(Number);
    const result = bfs(init, target);
    answer.push(result);
  }

  return answer.join("\n");
}

console.log(solution());
