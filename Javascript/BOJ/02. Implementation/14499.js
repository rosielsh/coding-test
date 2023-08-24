// 주사위 굴리기

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, M, x, y, K] = input.shift().split(" ").map(Number);
const map = input.splice(0, N).map((x) => x.split(" ").map(Number));
const orders = input[0].split(" ").map(Number); // 1-4: 동서남북

function outOfRange(x, y) {
  if (x < 0 || x >= N || y < 0 || y >= M) return true;
  return false;
}

function solution() {
  let answer = [];

  const dice = {
    front: 0,
    rear: 0,
    left: 0,
    right: 0,
    up: 0,
    down: 0,
  };

  const dicePos = [x, y];

  orders.forEach((order) => {
    const currentDice = { ...dice };

    let isMoved = false;

    if (order === 1) {
      dicePos[1] += 1;
      if (!outOfRange(dicePos[0], dicePos[1])) {
        dice["up"] = currentDice["left"];
        dice["down"] = currentDice["right"];
        dice["right"] = currentDice["up"];
        dice["left"] = currentDice["down"];
        isMoved = true;
      } else {
        dicePos[1] -= 1;
      }
    } else if (order === 2) {
      dicePos[1] -= 1;
      if (!outOfRange(dicePos[0], dicePos[1])) {
        dice["down"] = currentDice["left"];
        dice["up"] = currentDice["right"];
        dice["left"] = currentDice["up"];
        dice["right"] = currentDice["down"];
        isMoved = true;
      } else {
        dicePos[1] += 1;
      }
    } else if (order === 3) {
      dicePos[0] -= 1;
      if (!outOfRange(dicePos[0], dicePos[1])) {
        dice["up"] = currentDice["front"];
        dice["down"] = currentDice["rear"];
        dice["rear"] = currentDice["up"];
        dice["front"] = currentDice["down"];
        isMoved = true;
      } else {
        dicePos[0] += 1;
      }
    } else {
      dicePos[0] += 1;
      if (!outOfRange(dicePos[0], dicePos[1])) {
        dice["down"] = currentDice["front"];
        dice["up"] = currentDice["rear"];
        dice["front"] = currentDice["up"];
        dice["rear"] = currentDice["down"];
        isMoved = true;
      } else {
        dicePos[0] -= 1;
      }
    }

    if (isMoved) {
      if (map[dicePos[0]][dicePos[1]] === 0) {
        map[dicePos[0]][dicePos[1]] = dice["down"];
      } else {
        dice["down"] = map[dicePos[0]][dicePos[1]];
        map[dicePos[0]][dicePos[1]] = 0;
      }

      answer.push(dice["up"]);
    }
  });

  return answer.join("\n");
}

console.log(solution());
