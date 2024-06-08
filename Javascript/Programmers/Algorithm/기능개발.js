function solution(progresses, speeds) {
    var answer = [];

    for (let i = 0; i < progresses.length; ) {
        const leftDay = 100 - progresses[i];
        const jobDay = Math.ceil(leftDay / speeds[i]); // 첫 번째 작업이 끝날때까지 걸리는 날짜

        let cnt = 0;
        while (i < progresses.length) {
            if (progresses[i] + speeds[i] * jobDay >= 100) {
                cnt++;
                i++;
            } else break;
        }

        answer.push(cnt);
    }

    return answer;
}
