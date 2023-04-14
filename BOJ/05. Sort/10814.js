// 나이순 정렬

const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const [N, ...input] = require("fs").readFileSync(filePath).toString().trim().split("\n");
const info = [];
input.map((x) => {
  const t = x.split(" ");
  info.push({ age: +t[0], name: t[1] });
});

function solution() {
  info.sort((a, b) => a.age - b.age);
  info.forEach((x) => console.log(`${x.age} ${x.name}`));
}

solution();
