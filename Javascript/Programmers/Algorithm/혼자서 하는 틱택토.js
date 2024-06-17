function solution(board) {
    var answer = 0;

    const boardArr = board.map((x) => x.split(""));
    const nBoard = Array.from({ length: 3 }, () => Array(3).fill("."));

    const completed = (board) => {
        if (
            (board[0][0] !== "." && board[0][0] === board[0][1] && board[0][1] === board[0][2]) ||
            (board[1][0] !== "." && board[1][0] === board[1][1] && board[1][1] === board[1][2]) ||
            (board[2][0] !== "." && board[2][0] === board[2][1] && board[2][1] === board[2][2]) ||
            (board[0][0] !== "." && board[0][0] === board[1][0] && board[1][0] === board[2][0]) ||
            (board[0][1] !== "." && board[0][1] === board[1][1] && board[1][1] === board[2][1]) ||
            (board[0][2] !== "." && board[0][2] === board[1][2] && board[1][2] === board[2][2]) ||
            (board[0][0] !== "." && board[0][0] === board[1][1] && board[1][1] === board[2][2]) ||
            (board[0][2] !== "." && board[0][2] === board[1][1] && board[1][1] === board[2][0])
        )
            return 1;

        return 0;
    };

    const checkSame = (tickBoard) => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (tickBoard[i][j] !== boardArr[i][j]) return 0;
            }
        }

        return 1;
    };

    const dfs = (board, fill) => {
        if (checkSame(board)) {
            answer = 1;
            return;
        }

        if (completed(board)) {
            return;
        }

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] !== ".") continue;
                board[i][j] = fill % 2 === 0 ? "O" : "X";

                dfs(board, fill + 1);

                board[i][j] = ".";
            }
        }
    };

    dfs(nBoard, 0);

    return answer;
}
