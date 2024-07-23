function solution(orders, course) {
    var answer = [];
    const arr = Array.from({ length: 11 }, () => new Map());

    const combi = (depth, len, idx, res, word) => {
        if (depth === len) {
            arr[len].set(res, (arr[len].get(res) || 0) + 1);
            return;
        }

        for (let i = idx; i < word.length; i++) {
            combi(depth + 1, len, i + 1, res + word[i], word);
        }
    };

    for (let order of orders) {
        const N = order.length;
        for (let i = 1; i < N; i++) {
            combi(0, i + 1, 0, "", order.split("").sort().join(""));
        }
    }

    for (let cnt of course) {
        if (arr[cnt].size === 0) continue;

        const nArr = [...arr[cnt]];
        nArr.sort((a, b) => b[1] - a[1]);

        const std = nArr[0][1];

        if (std < 2) continue;

        for (let [key, val] of nArr) {
            if (std === val) {
                answer.push(key);
            } else break;
        }
    }

    answer.sort();

    return answer;
}
