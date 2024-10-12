function solution(progresses, speeds) {
    var answer = [0];

    const leftDay = progresses.map((ele, idx) => Math.ceil((100 - ele) / speeds[idx]));
    const N = progresses.length;

    let prevMaxDay = leftDay[0];
    let dPtr = 0;

    for (let i = 0; i < N; i++) {
        if (prevMaxDay >= leftDay[i]) {
            answer[dPtr]++;
        } else {
            answer.push(0);
            answer[++dPtr]++;
            prevMaxDay = leftDay[i];
        }
    }

    return answer;
}
