function solution(queue1, queue2) {
    var answer = 0;

    // 큐의 원소합을 같게 만드는 최소 연산 횟수
    const q1Sum = queue1.reduce((acc, cur) => acc + cur, 0);
    const q2Sum = queue2.reduce((acc, cur) => acc + cur, 0);

    let sum1 = q1Sum;
    let sum2 = q2Sum;

    let idx1 = 0;
    let idx2 = 0;

    let maxTry = queue1.length * 3;

    while (sum1 !== sum2) {
        // 종료 조건
        if (sum1 <= 0 || sum2 <= 0 || answer >= maxTry) {
            return -1;
        }

        // 현재 큐1의 합이 더 큼
        if (sum1 > sum2) {
            const q1 = queue1[idx1++];
            queue2.push(q1);
            sum1 -= q1;
            sum2 += q1;
        } else if (sum1 < sum2) {
            const q2 = queue2[idx2++];
            queue1.push(q2);
            sum1 += q2;
            sum2 -= q2;
        }

        answer++;
    }

    return answer;
}
