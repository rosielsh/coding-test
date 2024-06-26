function solution(food_times, k) {
    // food_times : 각 음식 별 먹는데 걸리는 시간
    // k : 방송 중단된 시간

    var answer = 0;

    const n = food_times.length;
    const sum = food_times.reduce((acc, cur) => acc + cur, 0);

    // 방송 중단 전에 다먹어버림 (sum이랑 k가 같아도 방송 중단 안됨)
    if (sum <= k) return -1;

    // 시간을 줄이기 위해 알아야 할 것 : [3, 1, 2] 배열이 있고, 방송중단 5초전일때, 가장 작은 초인 1초를 기준으로 전부 1초씩 깎으면
    // 모든 배열을 순회하지 않고 전체 초를 줄일 수 있다. 단, 가장 작은 초임을 알기 위해 남은 초를 기준으로 정렬

    // [3, 1, 2] => [[0, 3], [1, 1], [2, 2]] => sort: [[1, 1], [2, 2], [0, 3]];
    const timeInfo = [];

    for (let i = 0; i < n; i++) {
        timeInfo.push([i + 1, food_times[i]]);
    }

    timeInfo.sort((a, b) => a[1] - b[1]);

    let prevTime = 0;

    // 전체 음식 순회하면서 남은 초 줄이기
    for (let i = 0; i < n; i++) {
        const subTime = timeInfo[i][1] - prevTime; // 이전 초와의 차이(높이)
        const leftFoodCnt = n - i; // 남은 음식의 개수
        const totalTime = subTime * leftFoodCnt; // 뺄 수 있는 시간

        if (totalTime <= k) {
            k -= totalTime;
            prevTime = timeInfo[i][1];
        }
        // 빼려는 초가 더작다 => 인덱스 구해야함
        else {
            // 0초보다 많이 남은 음식들 자르기
            const leftArr = timeInfo.slice(i).sort((a, b) => a[0] - b[0]);
            const idx = k % leftArr.length;
            answer = leftArr[idx][0];
            break;
        }
    }

    return answer;
}
