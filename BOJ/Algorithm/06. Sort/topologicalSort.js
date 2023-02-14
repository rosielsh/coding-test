function topologicalSort(vertices, edges) {
    const sortedOrder = [];
    if (vertices <= 0) return sortedOrder;
  
    // Initialize the in-degree and adjacency list
    const inDegree = Array(vertices).fill(0);
    const adjacencyList = Array(vertices).fill(0).map(() => []);
  
    // Populate in-degree and adjacency list
    edges.forEach(([from, to]) => {
      inDegree[to]++;
      adjacencyList[from].push(to);
    });
  
    // Add all vertices with 0 in-degree to the queue
    const queue = [];
    for (let i = 0; i < vertices; i++) {
      if (inDegree[i] === 0) {
        queue.push(i);
      }
    }
  
    // Until the queue is empty
    while (queue.length) {
      // Remove the vertex from the queue and add it to the sortedOrder
      const vertex = queue.shift();
      sortedOrder.push(vertex);
  
      // Decrement the in-degree of each vertex connected to the current vertex
      adjacencyList[vertex].forEach(to => {
        inDegree[to]--;
  
        // If the in-degree of a vertex becomes 0, add it to the queue
        if (inDegree[to] === 0) {
          queue.push(to);
        }
      });
    }
  
    // If there was a cycle, sortedOrder will not contain all vertices
    if (sortedOrder.length !== vertices) {
      return [];
    }
  
    return sortedOrder;
  }