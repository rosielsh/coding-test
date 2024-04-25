function solution(lines) {
    var answer = 0;

    const stringToTime = (str) => {
        const splitted = str.split(":");
        return splitted.map((x, idx) => {
            if (idx === 2) {
                return parseFloat(x);
            } else return Number(x);
        });
    };

    const calcSum = (h, m, s) => {
        return (h * 3600 + m * 60 + s) * 1000;
    };

    const times = [];
    for (let line of lines) {
        const [D, S, T] = line.split(" ");

        const end = stringToTime(S);
        const endTime = calcSum(end[0], end[1], end[2]);

        const duringTime = parseFloat(T.replace("s", "")) * 1000;
        const startTime = endTime - duringTime + 1;

        times.push([0, startTime]);
        times.push([1, endTime + 1000]);
    }

    times.sort((a, b) => a[1] - b[1]);

    let cnt = 0;
    for (let [flag, time] of times) {
        if (!flag) cnt++;
        else cnt--;

        answer = Math.max(answer, cnt);
    }

    return answer;
}
