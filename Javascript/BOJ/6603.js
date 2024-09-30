const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const answer = [];

const bt = (depth, idx, k, S, selected) => {
    if (depth === 6) {
        answer.push(selected.trim());
        return;
    }

    for (let i = idx; i < k; i++) {
        bt(depth + 1, i + 1, k, S, selected + `${S[i]} `);
    }
};

let idx = 0;

while (input[idx] !== "0") {
    const [k, ...S] = input[idx++].split(" ").map(Number);
    bt(0, 0, k, S, "");
    answer.push("");
}

console.log(answer.join("\n").trim());
