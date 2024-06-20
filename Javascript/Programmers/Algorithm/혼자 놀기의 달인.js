function solution(cards) {
    var answer = 0;

    const N = cards.length;
    const visited = Array.from({ length: N }, () => false);

    const group = [];

    for (let i = 0; i < N; i++) {
        if (visited[i]) continue;

        let cnt = 0;
        let idx = i;
        while (!visited[idx]) {
            visited[idx] = true;
            cnt++;
            idx = cards[idx] - 1;
        }

        if (cnt) {
            group.push(cnt);
        }
    }

    group.sort((a, b) => b - a);

    if (group.length === 1) return 0;

    answer = group[0] * group[1];
    return answer;
}
