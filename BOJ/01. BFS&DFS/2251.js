// 물통

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [A, B, C] = require("fs").readFileSync(filePath).toString().trim().split(" ").map(Number);

function bfs() {
  const queue = [[0, 0, C]];
  const visited = new Set();

  while (queue.length) {
    const [ca, cb, cc] = queue.shift();

    if (visited.has(`${ca} ${cb} ${cc}`)) continue;
    visited.add(`${ca} ${cb} ${cc}`);

    // a -> b
    if (ca + cb > B) {
      queue.push([ca - (B - cb), B, cc]);
    } else {
      // a 물통이 비면
      queue.push([0, ca + cb, cc]);
    }

    // b->c
    if (cb + cc > C) {
      queue.push([ca, cb - (C - cc), C]);
    } else {
      queue.push([ca, 0, cb + cc]);
    }

    // c->a
    if (cc + ca > A) {
      queue.push([A, cb, cc - (A - ca)]);
    } else {
      queue.push([ca + cc, cb, 0]);
    }

    // b->a
    if (cb + ca > A) {
      queue.push([A, cb - (A - ca), cc]);
    } else {
      queue.push([ca + cb, 0, cc]);
    }

    // c->b
    if (cb + cc > B) {
      queue.push([ca, B, cc - (B - cb)]);
    } else {
      queue.push([ca, cb + cc, 0]);
    }

    // a->c
    if (cc + ca > C) {
      queue.push([ca - (C - cc), cb, C]);
    } else {
      queue.push([0, cb, ca + cc]);
    }
  }

  return [...visited]
    .map((x) => x.split(" ").map(Number))
    .filter((x) => {
      return x[0] === 0 ? x : "";
    })
    .sort((a, b) => a[2] - b[2]);
}

function solution() {
  let answer = [];
  const result = bfs();
  result.forEach(([_, __, c]) => answer.push(c));
  return answer.join(" ");
}

console.log(solution());
