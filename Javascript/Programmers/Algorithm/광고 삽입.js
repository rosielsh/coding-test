function solution(play_time, adv_time, logs) {
    var answer = "";

    const timeToSecond = (str) => {
        const [h, m, s] = str.split(":").map(Number);
        return h * 3600 + m * 60 + s;
    };

    const secondToTime = (sec) => {
        const h = parseInt(sec / 3600);
        sec = sec % 3600;
        const m = parseInt(sec / 60);
        sec = sec % 60;
        const s = sec;

        return [h < 10 ? "0" + h : h, m < 10 ? "0" + m : m, s < 10 ? "0" + s : s].join(":");
    };

    const playTime = timeToSecond(play_time);
    const prefix = Array.from({ length: playTime + 1 }, () => 0); // 특정 초에서 사람이 몇명 +/-되는지

    for (let log of logs) {
        const [start, end] = log.split("-");
        const st = timeToSecond(start);
        const en = timeToSecond(end);

        prefix[st] += 1;
        prefix[en] -= 1;
    }

    // 현재 초에서 몇 명이 보는지
    for (let i = 1; i <= playTime; i++) {
        prefix[i] += prefix[i - 1];
    }

    // 현재 초까지 몇 명이 봤는지
    for (let i = 1; i <= playTime; i++) {
        prefix[i] += prefix[i - 1];
    }

    const advTime = timeToSecond(adv_time);

    // 전체 구간에 대해 광고 시작 시간 - 끝나는 시간의 구간에 대해서 누적된 시청수가 가장 많은 구간
    let max = 0;
    let maxIdx = -1;

    for (let i = advTime - 1; i <= playTime; i++) {
        // 광고시간 동안의 누적 시청수
        if (max < prefix[i] - prefix[i - advTime]) {
            max = prefix[i] - prefix[i - advTime];
            maxIdx = i - advTime;
        }
    }

    if (maxIdx === 0) answer = 0;
    else answer = maxIdx + 1;

    answer = secondToTime(answer);

    return answer;
}
