function solution(n, t, m, timetable) {
    var answer = "";

    // n : 셔틀 운행 횟수
    // t : 셔틀 운행 간격
    // m : 한 셔틀에 탈 수 있는 최대 크루 수
    // timetable : 크루가 대기열에 도착하는 시각을 모은 배열

    let arriveTime = timetable
        .map((x) => {
            const temp = x.split(":").map(Number);
            return temp[0] * 60 + temp[1];
        })
        .sort((a, b) => a - b);

    let start = 540;

    // n이 1이되기 전까지
    while (n > 1) {
        let ptr = 0;
        while (ptr < arriveTime.length) {
            // 만약 태울 수 있는 크루라면
            if (arriveTime[ptr] <= start) {
                ptr++;

                if (ptr === m) break; // 태울 사람이 m명인 상태
            } else break;
        }

        if (ptr > 0) {
            arriveTime = arriveTime.slice(ptr);
        }

        n--;
        start += t;
    }

    let ptr = 0;
    while (ptr < arriveTime.length) {
        if (arriveTime[ptr] <= start) {
            ptr++;

            if (ptr === m) break;
        } else break;
    }

    if (ptr >= 0 && ptr < m) {
        const hour = parseInt(start / 60);
        const min = start % 60;
        answer = `${hour >= 10 ? hour : "0" + hour}:${min >= 10 ? min : "0" + min}`;
    } else if (ptr >= m) {
        const time = arriveTime[m - 1] - 1;
        const hour = parseInt(time / 60);
        const min = time % 60;
        answer = `${hour >= 10 ? hour : "0" + hour}:${min >= 10 ? min : "0" + min}`;
    }

    return answer;
}
