function solution(participant, completion) {
    var answer = "";

    const map = new Map();

    for (let p of participant) {
        map.set(p, (map.get(p) || 0) + 1);
    }

    for (let c of completion) {
        if (map.get(c) > 0) {
            map.set(c, map.get(c) - 1);
        }
    }

    for (let [key, value] of map) {
        if (value > 0) {
            answer = `${key}`;
        }
    }

    return answer;
}
