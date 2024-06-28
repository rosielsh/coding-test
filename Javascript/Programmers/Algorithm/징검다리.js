function solution(distance, rocks, n) {
    var answer = 0;

    rocks.sort((a, b) => a - b);
    rocks.push(distance); // 마지막에도 돌 넣기

    const isPossible = (dist) => {
        let deleteCnt = 0;

        let prev = 0;
        for (let i = 0; i < rocks.length; i++) {
            if (rocks[i] - prev < dist) {
                deleteCnt++;
                if (deleteCnt > n) {
                    return false;
                }
            } else {
                prev = rocks[i];
            }
        }

        if (deleteCnt <= n) return true;

        return false;
    };

    let left = 0;
    let right = distance;
    let mid;

    while (left <= right) {
        mid = parseInt((left + right) / 2);

        // mid로 놓을 수 있다
        if (isPossible(mid)) {
            left = mid + 1;
            answer = mid; // 가능한 mid값 중 가장 큰 값을 answer으로 설정
        } else {
            right = mid - 1;
        }
    }

    return answer;
}
