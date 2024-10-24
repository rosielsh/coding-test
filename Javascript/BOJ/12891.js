const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [S, P] = input[0].split(" ").map(Number);
const password = input[1].split("");
const minCnt = input[2].split(" ").map(Number);

const cnt = Array(4).fill(0); // A C G T의 최소 개수

const convertIdx = (str) => {
    if (str === "A") return 0;
    else if (str === "C") return 1;
    else if (str === "G") return 2;
    else if (str === "T") return 3;
};

const check = () => {
    if (cnt[0] >= minCnt[0] && cnt[1] >= minCnt[1] && cnt[2] >= minCnt[2] && cnt[3] >= minCnt[3])
        return 1;
    return 0;
};

for (let i = 0; i < P; i++) {
    cnt[convertIdx(password[i])]++;
}

let answer = check() ? 1 : 0;

for (let i = 0; i < S - P; i++) {
    cnt[convertIdx(password[i])]--;
    cnt[convertIdx(password[i + P])]++;
    answer += check();
}

console.log(answer);
