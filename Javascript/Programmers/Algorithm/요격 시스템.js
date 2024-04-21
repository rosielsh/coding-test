function solution(targets) {
    var answer = 1;

    // targets: 한 미사일의 x 범위들 (s, e)
    // 미사일을 최소로 사용해서 요격하려고 함

    targets.sort((a, b) => a[1] - b[1]);

    let start = targets[0][0];
    let end = targets[0][1];

    for (let i = 1; i < targets.length; i++) {
        const nextStart = targets[i][0];
        const nextEnd = targets[i][1];

        // 안겹치는 경우
        if (end <= nextStart) {
            answer++;
            end = nextEnd;
        }
    }

    return answer;
}
