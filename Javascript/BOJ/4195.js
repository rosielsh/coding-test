const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

let parent;
const T = +input.shift();

const find = (x) => {
  if (parent[x] === x) return x;
  return (parent[x] = find(parent[x]));
};

const union = (a, b) => {
  const pa = find(a);
  const pb = find(b);

  if (pa < pb) parent[pb] = pa;
  else parent[pa] = pb;
};

const answer = [];

for (let t = 0; t < T; t++) {
  const F = +input.shift();
  const friends = input.splice(0, F).map((x) => x.split(" "));

  const set = new Set();
  const connectCnt = new Map();

  const setInfo = new Map();
  parent = Array.from({ length: F * 2 + 1 }, (_, idx) => idx);

  for (let [a, b] of friends) {
    if (!set.has(a)) {
      set.add(a);
      setInfo.set(a, set.size);
      connectCnt.set(set.size, 1);
    }

    if (!set.has(b)) {
      set.add(b);
      setInfo.set(b, set.size);
      connectCnt.set(set.size, 1);
    }
  }

  for (let [a, b] of friends) {
    const aIdx = setInfo.get(a);
    const bIdx = setInfo.get(b);

    const apIdx = find(aIdx);
    const bpIdx = find(bIdx);

    if (apIdx === bpIdx) {
      answer.push(connectCnt.get(apIdx));
    } else {
      union(aIdx, bIdx);

      const aCnt = connectCnt.get(apIdx);
      const bCnt = connectCnt.get(bpIdx);

      if (apIdx < bpIdx) {
        connectCnt.set(apIdx, aCnt + bCnt);
        connectCnt.set(bpIdx, 0);
        answer.push(connectCnt.get(apIdx));
      } else {
        connectCnt.set(apIdx, 0);
        connectCnt.set(bpIdx, aCnt + bCnt);
        answer.push(connectCnt.get(bpIdx));
      }
    }
  }
}

console.log(answer.join("\n"));
