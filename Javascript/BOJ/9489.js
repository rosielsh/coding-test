const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

while (true) {
    let [n, k] = input.shift().split(" ").map(Number);

    if (n === 0 && k === 0) break;

    const nums = input.shift().split(" ").map(Number);
    const parent = Array.from({ length: n }, () => 0);

    let pIdx = 0;
    parent[0] = -1;

    let targetIdx = 0;

    for (let i = 1; i < n; i++) {
        parent[i] = pIdx;

        if (nums[i] === k) targetIdx = i;

        if (i + 1 < n && nums[i] + 1 !== nums[i + 1]) {
            pIdx++;
        }
    }

    let cousin = 0;

    const pVal = parent[targetIdx];
    const ppVal = parent[pVal];

    for (let i = 0; i < n; i++) {
        if (i === targetIdx) continue;

        if (pVal !== parent[i] && ppVal === parent[parent[i]]) cousin++;
    }

    console.log(cousin);
}
