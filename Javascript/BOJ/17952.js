const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, ...info] = input;

const stack = [];
let score = 0;

for (let lecture of info) {
    if (lecture[0] === "1") {
        const spl = lecture.split(" ").map(Number);
        stack.push([spl[1], spl[2]]);
    }

    if (stack.length > 0) {
        stack[stack.length - 1][1] -= 1;
        if (stack[stack.length - 1][1] === 0) {
            const [sc, _] = stack.pop();
            score += sc;
        }
    }
}

console.log(score);
