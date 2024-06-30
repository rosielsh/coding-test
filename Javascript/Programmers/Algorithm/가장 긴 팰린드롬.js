function solution(s) {
    var answer = 0;

    let maxLen = 1;
    let N = s.length;

    for (let i = 0; i < N; i++) {
        let dist = 1;
        while (i - dist >= 0 && i + dist < N) {
            if (s[i - dist] === s[i + dist]) {
                dist++;
            } else break;
        }

        maxLen = Math.max(maxLen, (dist - 1) * 2 + 1);

        if (i !== N - 1 && s[i] === s[i + 1]) {
            let dist1 = 1;
            while (i - dist1 >= 0 && i + 1 + dist1 < N) {
                if (s[i - dist1] === s[i + 1 + dist1]) {
                    dist1++;
                } else break;
            }

            maxLen = Math.max(maxLen, (dist1 - 1) * 2 + 2);
        }
    }

    answer = maxLen;

    return answer;
}
