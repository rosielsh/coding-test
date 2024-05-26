function solution(A, B) {
    var answer = -1;
    A.sort((a, b) => a - b); // 1 3 5 7
    B.sort((a, b) => a - b); // 2 2 6 8

    let bPointer = 0;
    let score = 0;
    for (let aPointer = 0; aPointer < A.length; aPointer++) {
        while (bPointer < B.length) {
            // 종료 조건
            if (A[aPointer] < B[bPointer]) {
                score++;
                bPointer++;
                break;
            }
            bPointer++;
        }
    }
    answer = score;

    return answer;
}
