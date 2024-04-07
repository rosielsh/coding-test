function solution(genres, plays) {
    var answer = [];

    const map = new Map();

    genres.forEach((genre, idx) => {
        if (map.has(genre)) {
            map.set(genre, [...map.get(genre), [idx, plays[idx]]]);
        } else {
            map.set(genre, [[idx, plays[idx]]]);
        }
    });

    const playsSum = [];
    map.forEach((value, genre) => {
        value.sort((a, b) => {
            if (a[1] === b[1]) return a[0] - b[0];
            else return b[1] - a[1];
        });

        let sum = 0;
        Object.values(value).forEach((play) => {
            sum += play[1];
        });
        playsSum.push([genre, sum]);
    });

    playsSum
        .sort((a, b) => b[1] - a[1])
        .forEach(([genre, plays]) => {
            let totalLen = map.get(genre).length;
            let cnt = 0;
            for (let i = 0; i < totalLen; i++) {
                if (cnt === 2) break;
                answer.push(map.get(genre)[i][0]);
                cnt++;
            }
        });

    return answer;
}
