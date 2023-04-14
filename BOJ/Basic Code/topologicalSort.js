function topologicalSort(vertices, edges) {
  const sortedOrder = [];
  if (vertices <= 0) return sortedOrder;

  const inDegree = Array(vertices).fill(0);
  const adjacencyList = Array(vertices)
    .fill(0)
    .map(() => []);

  edges.forEach(([from, to]) => {
    inDegree[to]++;
    adjacencyList[from].push(to);
  });

  const queue = [];
  for (let i = 0; i < vertices; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }

  while (queue.length) {
    const vertex = queue.shift();
    sortedOrder.push(vertex);

    adjacencyList[vertex].forEach((to) => {
      inDegree[to]--;

      if (inDegree[to] === 0) {
        queue.push(to);
      }
    });
  }

  if (sortedOrder.length !== vertices) {
    return [];
  }

  return sortedOrder;
}
