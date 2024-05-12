function solution(sequence, k) {
    var answer = [];
    let left = 0;
    let right = 0;
    let sum = sequence[left];

    let candidatePos = [];
    while (left <= right && right < sequence.length) {
        if (sum === k) {
            candidatePos.push([left, right]);
            right++;
            sum += sequence[right];
        }
        // 만약 합이 K보다 크면
        else if (sum > k) {
            sum -= sequence[left];
            left++;
        } else if (sum < k) {
            right++;
            sum += sequence[right];
        }
    }

    candidatePos.sort((a, b) => {
        if (a[1] - a[0] > b[1] - b[0]) return 1;
        else if (a[1] - a[0] === b[1] - b[0]) {
            console.log(a[0], b[0]);
            if (a[0] > b[0]) return 1;
            else return -1;
        } else return -1;
    });

    answer = candidatePos[0];

    return answer;
}
