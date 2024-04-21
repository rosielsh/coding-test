function solution(n, s) {
    var answer = [];

    // n: 집합 원소의 개수
    // s: 전체 원소의 합

    // 전체 원소의 곱이 가장 커야하므로 최대한 원소끼리 비슷한 크기의 숫자여야 함

    const share = parseInt(s / n); // 2
    const remain = s % n; // 1

    if (!share) return [-1];

    if (!remain) return Array.from({ length: n }, () => share);

    const arr1 = Array.from({ length: n - remain }, () => share);
    const arr2 = Array.from({ length: remain }, () => share + 1);

    answer.push(...arr1);
    answer.push(...arr2);

    return answer;
}
