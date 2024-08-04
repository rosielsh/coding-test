const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("");

const duck = input;
const N = duck.length;
const str = ["q", "u", "a", "c", "k"];

if (N % 5 !== 0) {
    console.log(-1);
    return;
}

let total = 0;
let answer = 0;

for (let i = 0; i < N; i++) {
    if (duck[i] !== "q") continue;

    let idx = 0;
    for (let j = i; j < N; j++) {
        if (duck[j] === str[idx]) {
            idx++;
            duck[j] = "x";

            if (idx === 5) {
                total += 5;
                idx = 0;
            }
        }
    }

    answer++;
}

if (total !== N) {
    console.log(-1);
    return;
}
console.log(answer);
