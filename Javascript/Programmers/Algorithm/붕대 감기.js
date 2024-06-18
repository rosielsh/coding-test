function solution(bandage, health, attacks) {
    var answer = 0;

    let prevTime = 0;
    let power = health; // 현재 체력

    for (let [time, demage] of attacks) {
        const timeGap = time - prevTime - 1; // 다음 공격시간과 이전의 차이

        power += timeGap * bandage[1];
        power += parseInt(timeGap / bandage[0]) * bandage[2];

        if (power > health) power = health;

        prevTime = time;

        power -= demage;

        if (power <= 0) return -1;
    }

    answer = power;

    return answer;
}
