const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, M, L, K] = input.shift().split(" ").map(Number);
const star = input.map((x) => x.split(" ").map(Number));

let answer = 0;

for (let i = 0; i < K; i++) {
    for (let j = 0; j < K; j++) {
        const [x1, y1] = star[i];
        const [x2, y2] = star[j];

        let cnt = 0;

        for (let s = 0; s < K; s++) {
            const [x, y] = star[s];
            if (x >= x1 && x <= x1 + L && y >= y2 && y <= y2 + L) {
                cnt++;
            }
        }

        answer = Math.max(answer, cnt);
    }
}

console.log(K - answer);
