const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const answer = [];
let idx = 0;
while (true) {
    const str = input[idx++].split("");

    if (str[0] === "-") break;

    const stack = [];

    for (let i = 0; i < str.length; i++) {
        if (str[i] === "{") {
            stack.push(str[i]);
        } else {
            if (stack[stack.length - 1] === "{") stack.pop();
            else stack.push(str[i]);
        }
    }

    let cnt = 0;

    for (let i = 0; i < stack.length; i += 2) {
        if (stack[i] === stack[i + 1]) cnt++;
        else cnt += 2;
    }

    answer.push(`${idx}. ${cnt}`);
}

console.log(answer.join("\n"));
