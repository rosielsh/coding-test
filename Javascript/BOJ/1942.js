const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const calc = (st, en) => {
    let cnt = 0;
    for (let i = st; i <= en; i++) {
        let t = i;
        const h = Math.floor(t / 3600);
        t = t - h * 3600;
        const m = Math.floor(t / 60);
        t = t - m * 60;
        const s = t;
        const num = Number(h + (m < 10 ? `0${m}` : `${m}`) + (s < 10 ? `0${s}` : `${s}`));
        if (num % 3 === 0) cnt++;
    }

    return cnt;
};

for (let str of input) {
    const [start, end] = str.split(" ");
    const [sh, sm, ss] = start.split(":").map(Number);
    const [eh, em, es] = end.split(":").map(Number);

    let answer = 0;
    const startSum = sh * 3600 + sm * 60 + ss;
    const endSum = eh * 3600 + em * 60 + es;
    const std = 23 * 3600 + 59 * 60 + 59;

    // ex) [22시 ~ 1시] => [22~24 + 0~1]
    if (startSum >= endSum) {
        answer += calc(startSum, std);
        answer += calc(0, endSum);
    } else {
        answer += calc(startSum, endSum);
    }

    console.log(answer);
}
