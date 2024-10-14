function solution(tickets) {
    var answer = [];

    const N = tickets.length;
    const map = new Map();

    for (let i = 0; i < N; i++) {
        const [from, to] = tickets[i];
        if (!map.has(from)) map.set(from, []);
        map.set(from, [...map.get(from), [i, to]]);
    }

    const dfs = (cnt, used, cur, route) => {
        if (cnt === N) {
            answer.push(route);
            return;
        }

        if (!map.has(cur)) return;

        for (let [idx, next] of map.get(cur)) {
            if (used[idx]) continue;
            used[idx] = true;
            route.push(next);
            dfs(cnt + 1, used, next, [...route]);
            used[idx] = false;
            route.pop();
        }
    };

    const used = Array.from({ length: N }, () => false);
    dfs(0, used, "ICN", ["ICN"]);

    answer.sort();
    return answer[0];
}
