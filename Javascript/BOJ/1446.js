const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, D] = input.shift().split(" ").map(Number);
const shortRoad = input.map((x) => x.split(" ").map(Number)).sort((a, b) => a[0] - b[0]);

let minDist = Number.MAX_SAFE_INTEGER;

const dfs = (depth, x, y, res) => {
    if (depth === N) {
        if (y < D) {
            res += D - y;
        }
        minDist = Math.min(minDist, res);
        return;
    }

    dfs(depth + 1, x, y, res);

    const [s, e, dist] = shortRoad[depth];
    if (y <= s && e <= D) {
        dfs(depth + 1, s, e, res + dist + (s - y));
    }
};

dfs(0, 0, 0, 0);

console.log(minDist);
