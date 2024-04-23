function solution(arr) {
    var answer = -1;

    // arr : 피연산자와 연산자 조합
    // 구하는 것 : 연산 순서를 다르게 했을때 최댓값

    const operandCnt = parseInt(arr.length / 2) + 1;

    const minDP = Array.from({ length: operandCnt }, () => Array(operandCnt).fill(Infinity));
    const maxDP = Array.from({ length: operandCnt }, () => Array(operandCnt).fill(-Infinity));

    for (let i = 0; i < operandCnt; i++) {
        minDP[i][i] = +arr[i * 2];
        maxDP[i][i] = +arr[i * 2];
    }

    // 구간을 1씩 늘려가면서 순회
    for (let size = 1; size < operandCnt; size++) {
        for (let start = 0; start < operandCnt - size; start++) {
            let end = start + size; // 시작 + 구간

            for (let mid = start; mid < end; mid++) {
                // 구간1 - 구간2 사이의 연산자가 + 일 때
                if (arr[mid * 2 + 1] === "+") {
                    maxDP[start][end] = Math.max(
                        maxDP[start][end],
                        maxDP[start][mid] + maxDP[mid + 1][end]
                    );
                    minDP[start][end] = Math.min(
                        minDP[start][end],
                        minDP[start][mid] + minDP[mid + 1][end]
                    );
                }
                // - 일때
                else {
                    maxDP[start][end] = Math.max(
                        maxDP[start][end],
                        maxDP[start][mid] - minDP[mid + 1][end]
                    );
                    minDP[start][end] = Math.min(
                        minDP[start][end],
                        minDP[start][mid] - maxDP[mid + 1][end]
                    );
                }
            }
        }

        // console.log(size, maxDP, minDP);
    }

    answer = maxDP[0][operandCnt - 1];

    return answer;
}
