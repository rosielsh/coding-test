function solution(arr) {
  let totalZero = 0;
  let totalOne = 0;

  function recursion(startX, startY, len) {
    if (len === 1) {
      if (arr[startX][startY]) totalOne++;
      else totalZero++;
      return;
    }

    let std = arr[startX][startY];
    let isSame = true;
    outerFor: for (let i = startX; i < startX + len; i++) {
      for (let j = startY; j < startY + len; j++) {
        if (arr[i][j] !== std) {
          isSame = false;
          break outerFor;
        }
      }
    }

    if (isSame) {
      if (std) totalOne++;
      else totalZero++;
      return;
    }

    recursion(startX, startY, len / 2);
    recursion(startX + len / 2, startY, len / 2);
    recursion(startX, startY + len / 2, len / 2);
    recursion(startX + len / 2, startY + len / 2, len / 2);
  }

  var answer = [];
  recursion(0, 0, arr.length);
  answer = [totalZero, totalOne];

  return answer;
}
