const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const S = input[0].split("");
const P = input[1].split("");

let answer = 0;
let pPtr = 0;
while (pPtr < P.length) {
    let maxCnt = 0;
    for (let i = 0; i < S.length; i++) {
        if (P[pPtr] === S[i]) {
            let len = 0;
            let s = i;
            let p = pPtr;

            while (s < S.length && p < P.length && P[p] === S[s]) {
                s++;
                p++;
                len++;
            }

            maxCnt = Math.max(maxCnt, len);
        }
    }

    pPtr += maxCnt;
    answer++;
}

console.log(answer);
