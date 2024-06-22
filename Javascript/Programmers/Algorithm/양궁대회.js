function solution(n, info) {
    var answer = [];

    let maxSub = -1;
    let lion = [];

    const compareScore = () => {
        let lionScore = 0;
        let apeachScore = 0;

        for (let i = 0; i <= 10; i++) {
            if (info[i] === 0 && lionInfo[i] === 0) continue;

            if (info[i] >= lionInfo[i]) {
                apeachScore += 10 - i;
            } else lionScore += 10 - i;
        }

        const sub = lionScore - apeachScore;

        if (sub > 0) {
            if (sub > maxSub) {
                maxSub = sub;
                lion = [...lionInfo];
            } else if (sub === maxSub) {
                let flag = -1;
                for (let i = 10; i >= 0; i--) {
                    if (lion[i] === lionInfo[i]) continue;

                    if (lion[i] < lionInfo[i]) {
                        flag = 1;
                        break;
                    } else {
                        flag = 0;
                        break;
                    }
                }

                if (flag === 1) {
                    lion = [...lionInfo];
                }
            }
        }
    };

    const lionInfo = Array.from({ length: 11 }, () => 0); // 라이언이 쏜 개수

    const solve = (idx, score) => {
        // 라이언과 어피치의 점수 비교하고 이겼는지 졌는지 판단
        if (idx === 11 || score === 0) {
            compareScore();
            return;
        }

        for (let i = 0; i <= score; i++) {
            if (score - i < 0) continue;
            lionInfo[idx] = i;
            solve(idx + 1, score - i);
            lionInfo[idx] = 0;
        }
    };

    solve(0, n);

    if (maxSub === -1) return [-1];
    else answer = [...lion];

    return answer;
}
