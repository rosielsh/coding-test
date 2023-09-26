// 팰린드롬수

const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

function solution() {
  for (let i = 0; i < input.length - 1; i++) {
    const num = input[i].replace("\r", "");
    let flag = "";
    if (num.split("").reverse().join("") == num) flag = "yes";
    else flag = "no";

    console.log(flag);
  }
}

solution();
