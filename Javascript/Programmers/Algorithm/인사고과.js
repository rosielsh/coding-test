function solution(scores) {
    var answer = 0;

    const whSum = scores[0][0] + scores[0][1];
    const wh = scores[0]; // 완호 점수

    scores.sort((a, b) => {
        if (a[0] === b[0]) {
            return a[1] - b[1];
        } else return b[0] - a[0];
    });

    let maxScore = 0; // 동료 평가 중 최대값
    for (let [a, b] of scores) {
        if (wh[0] < a && wh[1] < b) return -1;

        if (maxScore <= b && whSum < a + b) {
            answer += 1;
            maxScore = b;
        }
    }

    return answer + 1;
}
