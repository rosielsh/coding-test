function solution(stones, k) {
    // 최대 몇 명까지 징검다리를 건널 수 있는지? => 이분 탐색으로 건널 수 있는 사람 수를 설정하여 구하기
    var answer = 0;

    let left = 1;
    let right = 200000000;

    while (left <= right) {
        const mid = parseInt((left + right) / 2);

        // mid: 현재 건너는 사람 수
        let cnt = 0;
        for (let s of stones) {
            // 이 돌은 밟을 수 없다
            if (s - mid <= 0) {
                cnt++;

                if (cnt >= k) {
                    break;
                }
            } else {
                cnt = 0;
            }
        }

        if (cnt >= k) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    answer = left;

    return answer;
}
