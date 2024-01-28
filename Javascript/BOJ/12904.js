const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const S = input[0].split("");
let T = input[1].split("");

// S -> T로 만들 수 있는지 확인하는 문제
while (S.length < T.length) {
    if (T[T.length - 1] === "A") {
        T.splice(T.length - 1, 1);
    } else if (T[T.length - 1] === "B") {
        T.splice(T.length - 1, 1);
        T.reverse();
    }
}

if (S.join("") === T.join("")) console.log(1);
else console.log(0);
