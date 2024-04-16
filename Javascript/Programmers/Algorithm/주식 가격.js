function solution(prices) {
    // prices [1, 2, 3, 2, 3]

    var answer = [];
    let priceLen = prices.length;

    const stack = []; // 스택에 [주가가 담긴 시간] 저장
    const fallTime = Array.from({ length: priceLen }, () => 0);

    for (let i = 0; i < priceLen; i++) {
        while (stack.length > 0 && prices[stack[stack.length - 1]] > prices[i]) {
            const time = stack.pop(); // 스택의 최상단 원소
            fallTime[time] = i - time;
        }

        stack.push(i);
    }

    if (stack.length) {
        while (stack.length > 0) {
            const time = stack.pop();
            fallTime[time] = priceLen - time - 1;
        }
    }

    answer = fallTime;
    return answer;
}
