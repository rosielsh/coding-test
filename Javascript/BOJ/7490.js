const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();

let nums;
const answer = [];
let currentAns = [];

const combi = (depth, str) => {
    if (depth === nums.length) {
        const res = eval(str.join("").replaceAll(" ", ""));
        if (res === 0) currentAns.push(str.join(""));
        return;
    }

    for (let oper of [" ", "+", "-"]) {
        str.push(oper);
        str.push(`${nums[depth]}`);

        combi(depth + 1, str);

        str.pop();
        str.pop();
    }
};

for (let i = 0; i < input.length; i++) {
    nums = Array.from({ length: input[i] }, (_, idx) => idx + 1);

    combi(1, [`${nums[0]}`]);
    currentAns.sort((a, b) => {
        if (a > b) return 1;
        else if (a < b) return -1;
        return 0;
    });

    for (let ans of currentAns) {
        answer.push(ans);
    }
    answer.push("");

    currentAns = [];
}

console.log(answer.join("\n").trim());
