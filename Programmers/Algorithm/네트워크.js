function solution(n, computers) {
  var answer = 0;

  const graph = Array.from({ length: n + 1 }, () => []);
  for (let i = 0; i < computers.length; i++) {
    for (let j = i + 1; j < computers[0].length; j++) {
      if (computers[i][j]) {
        graph[i + 1].push(j + 1);
        graph[j + 1].push(i + 1);
      }
    }
  }

  function dfs(startVertex) {
    visited[startVertex] = 1;
    const stack = [[startVertex]];

    while (stack.length) {
      let curVertex = stack.pop();

      for (let i = 0; i < graph[curVertex].length; i++) {
        const nextVertex = graph[curVertex][i];

        if (visited[nextVertex]) continue;

        visited[nextVertex] = 1;
        stack.push(nextVertex);
      }
    }
  }

  const visited = Array.from({ length: n + 1 }, () => 0);
  let cnt = 0;
  for (let i = 1; i <= n; i++) {
    if (!visited[i]) {
      dfs(i);
      cnt++;
    }
  }
  answer = cnt;
  return answer;
}
