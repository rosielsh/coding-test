const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const S = require("fs").readFileSync(filePath).toString().trim().split("");

const alphabet = Array.from({ length: 27 }, () => 0);

for (let s of S) {
    alphabet[s.charCodeAt(0) - 97]++;
}

let answer = 0;

const dfs = (depth, str) => {
    if (depth === S.length) {
        answer++;
        return;
    }

    for (let i = 0; i < 27; i++) {
        const cur = String.fromCharCode(i + 97);
        if (!alphabet[i]) continue;
        if (str.at(-1) === cur) continue;

        alphabet[i]--;
        dfs(depth + 1, str + cur);
        alphabet[i]++;
    }
};

dfs(0, "");

console.log(answer);
