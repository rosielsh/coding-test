function solution(gems) {
    var answer = [];
    const set = new Set([...gems]); // 전채 보석 종류

    const N = gems.length;
    const map = new Map();
    const iSet = new Set(); // 포함된 구간의 서로 다른 보석 종류

    for (let s of [...set]) {
        map.set(s, 0);
    }

    let idx = [0, Infinity];

    let j = 0;
    for (let i = 0; i < N; i++) {
        while (j < N && iSet.size !== set.size) {
            iSet.add(gems[j]);
            map.set(gems[j], map.get(gems[j]) + 1);
            j++;
        }

        if (iSet.size === set.size) {
            if (j - i === idx[1] - idx[0]) {
                if (idx[0] > i) {
                    idx = [i, j];
                }
            } else {
                if (idx[1] - idx[0] > j - i) {
                    idx = [i, j];
                }
            }
        }

        map.set(gems[i], map.get(gems[i]) - 1);

        if (map.get(gems[i]) === 0) {
            iSet.delete(gems[i]);
        }
    }

    answer = [idx[0] + 1, idx[1]];

    return answer;
}
