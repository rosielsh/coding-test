// 틱택토

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

function getBoardCnt(board) {
  let oCnt = 0;
  let xCnt = 0;

  for (let i = 0; i < 9; i++) {
    if (board[i] === "O") oCnt++;
    else if (board[i] === "X") xCnt++;
  }

  return [oCnt, xCnt];
}

function isFinalBoard(board) {
  // 보드 o,x 갯수
  const [oCnt, xCnt] = getBoardCnt(board);
  // 갯수 비정상
  if (xCnt > oCnt + 1 || oCnt > xCnt) return false;

  // 연속 3개가 일치하는 구간이 있는지 확인

  let hasSameO = 0;
  let hasSameX = 0;

  // 행
  for (let i = 0; i <= 6; i += 3) {
    if (board[i] === board[i + 1] && board[i + 1] === board[i + 2]) {
      if (board[i] === "O") hasSameO++;
      else if (board[i] === "X") hasSameX++;
    }
  }

  // 열
  for (let i = 0; i < 3; i++) {
    if (board[i] === board[i + 3] && board[i + 3] === board[i + 6]) {
      if (board[i] === "O") hasSameO++;
      else if (board[i] === "X") hasSameX++;
    }
  }

  // 대각선
  if (board[0] === board[4] && board[4] === board[8]) {
    if (board[0] === "O") hasSameO++;
    else if (board[0] === "X") hasSameX++;
  }

  if (board[2] === board[4] && board[4] === board[6]) {
    if (board[2] === "O") hasSameO++;
    else if (board[2] === "X") hasSameX++;
  }

  if (hasSameO === 1 && hasSameX === 0 && oCnt === xCnt) return true;
  if (hasSameO === 0 && hasSameX === 1 && xCnt - oCnt === 1) return true;
  if (oCnt === 4 && xCnt === 5 && hasSameO === 0) return true;

  return false;
}

function solution() {
  let answer = [];
  while (1) {
    board = input.splice(0, 1);
    // 종료 조건
    if (board[0] === "end") break;

    board = board[0].replace("\r", "").split("");

    // 현재 board가 최종 상태인지 확인
    if (isFinalBoard(board)) {
      answer.push("valid");
    } else answer.push("invalid");
  }
  return answer.join("\n");
}

console.log(solution());
