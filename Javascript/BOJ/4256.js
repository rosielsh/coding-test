const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const T = +input.shift();

let idx = 0;
const recursion = (r, st, en, pArr, iArr, res) => {
    const cur = pArr[r];

    for (let i = st; i <= en; i++) {
        if (cur === iArr[i]) {
            recursion(r + 1, st, i - 1, pArr, iArr, res);
            recursion(r + 1 + i - st, i + 1, en, pArr, iArr, res);
            res[idx++] = cur;
        }
    }
};

for (let t = 0; t < T; t++) {
    const n = +input.shift();
    const preorder = input.shift().split(" ").map(Number);
    const inorder = input.shift().split(" ").map(Number);

    const postorder = Array.from({ length: n }, () => 0);

    idx = 0;
    recursion(0, 0, n - 1, preorder, inorder, postorder);

    console.log(postorder.join(" "));
}
