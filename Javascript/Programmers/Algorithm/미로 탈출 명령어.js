function solution(n, m, x, y, r, c, k) {
    // 전체 경우의 수 : 4^2500 => 백트래킹
    var answer = "";

    const dx = [1, 0, 0, -1];
    const dy = [0, -1, 1, 0];

    const dir = ["d", "l", "r", "u"];

    const miro = Array.from({ length: n }, () => Array(m).fill(0));
    miro[x - 1][y - 1] = "S";
    miro[r - 1][c - 1] = "E";

    const getDist = (x, y) => {
        return Math.abs(r - 1 - x) + Math.abs(c - 1 - y);
    };

    let flag = false;

    const dfs = (depth, x, y, str) => {
        if (flag) return;

        const dist = getDist(x, y);

        if (k - depth < dist) return; // k-depth: 남은 횟수

        if ((k - depth - dist) % 2 === 1) return; // 남은 이동 횟수와 도착지점까지의 거리는 짝수여야함

        if (depth === k) {
            if (str.length === k && x === r - 1 && y === c - 1) {
                flag = true;
                answer = str;
            }

            return;
        }

        for (let i = 0; i < 4; i++) {
            const nx = x + dx[i];
            const ny = y + dy[i];

            if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;

            dfs(depth + 1, nx, ny, str + dir[i]);
        }
    };

    dfs(0, x - 1, y - 1, "");

    if (answer === "") answer = "impossible";

    return answer;
}
