const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const N = +input.shift();
const nums = input.map((x) => x - 1);

const isChecked = Array.from({ length: N }, () => false);
let visited;

const answer = [];

const dfs = (x, route) => {
    if (route.length > 1 && nums[x] === route[0]) {
        for (let r of route) {
            isChecked[r] = true;
        }

        answer.push(...route);
        return;
    }

    const next = nums[x];

    if (!visited[next]) {
        visited[next] = true;
        dfs(next, [...route, next]);
    }
};

for (let i = 0; i < N; i++) {
    if (isChecked[i]) continue;
    if (nums[i] === i) {
        isChecked[i] = true;
        answer.push(i);
        continue;
    }

    visited = Array.from({ length: N }, () => false);
    visited[i] = true;
    dfs(i, [i]);
}

console.log(answer.length);
console.log(
    answer
        .map((x) => x + 1)
        .sort((a, b) => a - b)
        .join("\n")
);
