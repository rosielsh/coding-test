function solution(keymap, targets) {
    var answer = [];

    const map = new Map();

    for (let i = 0; i < keymap.length; i++) {
        let keyStrlen = keymap[i].length;
        for (let j = 0; j < keyStrlen; j++) {
            const curKey = keymap[i][j];

            if (map.has(curKey)) {
                const idx = map.get(curKey);
                map.set(curKey, Math.min(j + 1, idx));
            } else map.set(curKey, j + 1);
        }
    }

    for (let i = 0; i < targets.length; i++) {
        let sum = 0;
        let isInclude = true;
        for (let j = 0; j < targets[i].length; j++) {
            if (!map.has(targets[i][j])) {
                answer.push(-1);
                isInclude = false;
                break;
            }
            sum += map.get(targets[i][j]);
        }
        if (isInclude) answer.push(sum);
    }

    return answer;
}
