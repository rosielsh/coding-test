// Union-Find : 합집합 찾기, 서로소 집합 알고리즘

const V = 5;
const parent = Array.from({ length: V + 1 }, (_, idx) => idx);

function getParent(vertex) {
  if (parent[vertex] === vertex) return vertex;
  return (parent[vertex] = getParent(parent[vertex]));
}

function unionParent(v1, v2) {
  p1 = getParent(v1);
  p2 = getParent(v2);
  if (p1 < p2) parent[p2] = p1;
  else parent[p1] = p2;
}

function checkSameParent(v1, v2) {
  p1 = getParent(v1);
  p2 = getParent(v2);
  return p1 === p2 ? true : false;
}

function solution() {
  for (let i = 1; i <= V; i++) {
    parent[i] = i;
  }
  console.log(parent);
  unionParent(1, 2);
  unionParent(2, 3);
  unionParent(4, 5);
  console.log(parent);
}

solution();
