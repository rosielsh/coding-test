function solution(n, times) {
    var answer = 0;

    times.sort((a, b) => a - b); // 오름차순

    let left = 1;
    let right = times[times.length - 1] * n; // n명을 최대 심사시간동안 모두 처리하는게 최대 시간이 됨

    answer = right;

    let mid;

    while (left <= right) {
        mid = parseInt((left + right) / 2);

        const cnt = times.reduce((acc, cur) => acc + parseInt(mid / cur), 0);

        if (cnt < n) {
            left = mid + 1;
        } else {
            right = mid - 1;
            answer = Math.min(answer, mid);
        }
    }

    return answer;
}
