const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[T, ...input] = require("fs").readFileSync(filePath).toString().trim().split("\n");

function findParent(parent, x) {
  let result = [x];
  while (parent[x]) {
    result.push(parent[x]);
    x = parent[x];
  }
  return result;
}

function solution() {
  let answer = [];
  for (let i = 0; i < T; i++) {
    const n = input.shift();
    const parents = Array.from({ length: n + 1 }, () => 0);

    for (let i = 0; i < n - 1; i++) {
      [parent, child] = input.shift().split(" ").map(Number);
      parents[child] = parent;
    }

    let xParent = 0;
    let yParent = 0;

    const [x, y] = input.shift().split(" ").map(Number);
    xParent = findParent(parents, x);
    yParent = findParent(parents, y);

    let depth1 = 0;
    let depth2 = 0;
    if (xParent.length > yParent.length) {
      depth1 = xParent.length - yParent.length;
    } else {
      depth2 = yParent.length - xParent.length;
    }

    while (xParent[depth1] !== yParent[depth2]) {
      depth1++;
      depth2++;
    }

    answer.push(xParent[depth1]);
  }

  return answer.join("\n");
}

console.log(solution());
