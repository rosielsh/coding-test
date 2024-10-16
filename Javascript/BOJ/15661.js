const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const N = +input.shift();
const score = input.map((x) => x.split(" ").map(Number));

let minSub = Number.MAX_SAFE_INTEGER;

const dfs = (depth, cnt, selected) => {
    if (depth === N) {
        if (cnt === 0) return;
        let sStart = 0;
        let sLink = 0;

        for (let i = 0; i < N; i++) {
            for (let j = i + 1; j < N; j++) {
                if (selected[i] !== selected[j]) continue;
                if (selected[i] && selected[j]) sStart += score[i][j] + score[j][i];
                else sLink += score[i][j] + score[j][i];
            }
        }

        minSub = Math.min(minSub, Math.abs(sStart - sLink));
        return;
    }

    dfs(depth + 1, cnt, selected);
    selected[depth] = true;
    dfs(depth + 1, cnt + 1, selected);
    selected[depth] = false;
};

const selected = Array.from({ length: N }, () => false);
dfs(0, 0, selected);

console.log(minSub);
