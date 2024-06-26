function solution(tickets) {
    var answer = [];
    const answers = [];

    const graph = {};

    for (let [from, to] of tickets) {
        if (graph[from]) graph[from].push([to, 0]);
        else graph[from] = [[to, 0]];
    }

    for (let key of Object.keys(graph)) {
        graph[key].sort();
    }

    const dfs = (depth, cur, route) => {
        if (depth === tickets.length) {
            answers.push([...route]);
            return;
        }

        if (!graph[cur]) return;

        for (let i = 0; i < graph[cur].length; i++) {
            const [next, isUsed] = graph[cur][i];

            if (isUsed) continue;

            graph[cur][i][1] = 1;
            route.push(next);

            dfs(depth + 1, next, route);

            graph[cur][i][1] = 0;
            route.pop();
        }
    };

    dfs(0, "ICN", ["ICN"]);

    answers.sort();
    answer = answers[0];

    return answer;
}
