function solution(board) {
    var answer = 0;

    const N = board.length;

    // 찾아야 하는 블록 5개
    const checkA = (x, y, num) => {
        if (x + 1 >= N || y + 2 >= N) return false;
        return (
            board[x + 1][y] === num && board[x + 1][y + 1] === num && board[x + 1][y + 2] === num
        );
    };

    const checkB = (x, y, num) => {
        if (x + 2 >= N || y - 1 < 0) return false;
        return board[x + 1][y] === num && board[x + 2][y] === num && board[x + 2][y - 1] === num;
    };

    const checkC = (x, y, num) => {
        if (x + 2 >= N || y + 1 >= N) return false;
        return board[x + 1][y] === num && board[x + 2][y] === num && board[x + 2][y + 1] === num;
    };

    const checkD = (x, y, num) => {
        if (x + 1 >= N || y - 2 < 0) return false;
        return (
            board[x + 1][y - 2] === num && board[x + 1][y - 1] === num && board[x + 1][y] === num
        );
    };

    const checkE = (x, y, num) => {
        if (x + 1 >= N || y - 1 < 0 || y + 1 >= N) return false;
        return (
            board[x + 1][y - 1] === num && board[x + 1][y] === num && board[x + 1][y + 1] === num
        );
    };

    const canDrop = (x, y, num) => {
        for (let i = 0; i <= x; i++) {
            if (!board[i][y]) continue;
            if (board[i][y] !== num) return false;
        }

        return true;
    };

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (!board[i][j]) continue;

            const num = board[i][j];
            let isDel = false;

            // 현재 블록이 A이면
            if (checkA(i, j, num) && canDrop(i, j + 1, num) && canDrop(i, j + 2, num)) {
                board[i][j] = 0;
                board[i + 1][j] = 0;
                board[i + 1][j + 1] = 0;
                board[i + 1][j + 2] = 0;
                isDel = true;
            } else if (checkB(i, j, num) && canDrop(i + 1, j - 1, num)) {
                board[i][j] = 0;
                board[i + 2][j - 1] = 0;
                board[i + 2][j] = 0;
                board[i + 1][j] = 0;
                isDel = true;
            } else if (checkC(i, j, num) && canDrop(i + 1, j + 1, num)) {
                board[i][j] = 0;
                board[i + 1][j] = 0;
                board[i + 2][j] = 0;
                board[i + 2][j + 1] = 0;
                isDel = true;
            } else if (checkD(i, j, num) && canDrop(i, j - 1, num) && canDrop(i, j - 2, num)) {
                board[i][j] = 0;
                board[i + 1][j] = 0;
                board[i + 1][j - 1] = 0;
                board[i + 1][j - 2] = 0;
                isDel = true;
            } else if (checkE(i, j, num) && canDrop(i, j - 1, num) && canDrop(i, j + 1, num)) {
                board[i][j] = 0;
                board[i + 1][j - 1] = 0;
                board[i + 1][j] = 0;
                board[i + 1][j + 1] = 0;
                isDel = true;
            }

            if (isDel) {
                j = -1;
                answer++;
            }
        }
    }

    return answer;
}
