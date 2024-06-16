function solution(n) {
    var answer = 0;
    const board = Array.from({ length: n }, () => 0);

    const isPossible = (row) => {
        for (let i = 0; i < row; i++) {
            if (board[row] === board[i]) return false;
            if (Math.abs(board[row] - board[i]) === Math.abs(row - i)) return false;
        }

        return true;
    };

    const dfs = (row) => {
        if (row === n) {
            answer++;
            return;
        }

        for (let i = 0; i < n; i++) {
            board[row] = i;
            if (isPossible(row)) {
                dfs(row + 1);
            }
        }
    };

    dfs(0);

    return answer;
}
