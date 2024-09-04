const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("");

const stack = [];
const gh = [];
const result = Array.from({ length: input.length }, () => "");

for (let i = 0; i < input.length; i++) {
    const str = input[i];

    if (str === ")") {
        gh.push([stack.pop(), i]);
    } else if (str === "(") {
        stack.push(i);
    } else {
        result[i] = str;
    }
}

const N = gh.length;
const answer = new Set();

const dfs = (depth, res, cnt) => {
    if (depth === N) {
        if (cnt === N) return;
        answer.add(res.join(""));
        return;
    }

    const [l, r] = gh[depth];

    res[l] = "";
    res[r] = "";
    dfs(depth + 1, res, cnt);

    res[l] = "(";
    res[r] = ")";
    dfs(depth + 1, res, cnt + 1);
};

dfs(0, result, 0);

console.log([...answer].sort().join("\n"));
