// 수식 최대화

function solution(expression) {
  var answer = 0;
  let maxResult = Number.MIN_SAFE_INTEGER;

  // 연산자 단위로 자르기
  const expressionArr = [];
  let startIdx = 0;
  for (let i = 0; i < expression.length; i++) {
    if (expression[i] === "+" || expression[i] === "-" || expression[i] === "*") {
      expressionArr.push(expression.slice(startIdx, i));
      expressionArr.push(expression[i]);
      startIdx = i + 1;
    }
  }
  expressionArr.push(expression.slice(startIdx));

  const orders = [
    ["+", "-", "*"],
    ["+", "*", "-"],
    ["-", "*", "+"],
    ["-", "+", "*"],
    ["*", "-", "+"],
    ["*", "+", "-"],
  ];

  // 6번의 연산자 우선순위의 경우의 수에 대해 반복
  for (let order of orders) {
    const copyOperation = [...expressionArr];
    // 연산자 하나씩 순회
    for (let operator of order) {
      let pointer = 0;
      while (pointer < copyOperation.length) {
        // 연산 진행
        if (copyOperation[pointer] === operator) {
          const result = eval(
            `${copyOperation[pointer - 1]}${copyOperation[pointer]}${copyOperation[pointer + 1]}`
          );
          copyOperation.splice(pointer - 1, 3, result);
          pointer--;
        }
        pointer++;
      }
    }
    maxResult = Math.max(maxResult, Math.abs(copyOperation[0]));
  }

  answer = maxResult;
  return answer;
}
