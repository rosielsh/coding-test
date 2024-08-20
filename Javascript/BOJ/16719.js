const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const str = require("fs").readFileSync(filePath).toString().trim();
const N = str.length;

const arr = Array.from({ length: N }, () => "");
const checked = Array.from({ length: N }, () => false);

const answer = [];

for (let i = 0; i < N; i++) {
    const temp = [];
    const copy = [...arr];
    for (let j = 0; j < N; j++) {
        if (checked[j]) continue;

        copy[j] = str[j];
        temp.push([copy.join(""), j, str[j]]);
        copy[j] = "";
    }

    const sorted = temp.sort();

    const [res, idx, val] = sorted[0];
    arr[idx] = val;
    checked[idx] = true;

    answer.push(arr.join(""));
}

console.log(answer.join("\n"));
