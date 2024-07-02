function solution(sequence) {
    var answer = 0;

    const N = sequence.length;
    const sum1 = Array.from({ length: N + 1 }, () => 0); // 1
    const sum2 = Array.from({ length: N + 1 }, () => 0); // -1

    for (let i = 1; i <= N; i++) {
        if (i % 2 === 1) {
            sum1[i] = sum1[i - 1] + sequence[i - 1];
            sum2[i] = sum2[i - 1] - sequence[i - 1];
        } else {
            sum1[i] = sum1[i - 1] - sequence[i - 1];
            sum2[i] = sum2[i - 1] + sequence[i - 1];
        }
    }

    let max = [0, 0];
    let min = [0, 0];

    for (let i = 1; i <= N; i++) {
        if (max[0] < sum1[i]) {
            max[0] = sum1[i];
        }

        if (min[0] > sum1[i]) {
            min[0] = sum1[i];
        }

        if (max[1] < sum2[i]) {
            max[1] = sum2[i];
        }

        if (min[1] > sum2[i]) {
            min[1] = sum2[i];
        }
    }

    answer = Math.max(max[0] - min[0], max[1] - min[1]);

    return answer;
}

// dp 풀이
// const seq1 = sequence.map((ele, idx) => {
//     if(idx % 2 === 1) {
//         return -ele;
//     } return ele;
// });

// const seq2 = sequence.map((ele, idx) => {
//     if(idx % 2 === 0) {
//         return -ele;
//     } return ele;
// });

// const dp1 = Array.from({length: N+1}, () => 0);
// const dp2 = Array.from({length: N+1}, () => 0);

// for(let i=1; i<=N; i++) {
//     dp1[i] = Math.max(dp1[i-1] + seq1[i-1], seq1[i-1]);
//     dp2[i] = Math.max(dp2[i-1] + seq2[i-1], seq2[i-1]);

//     answer = Math.max(dp1[i], dp2[i], answer);
// }
