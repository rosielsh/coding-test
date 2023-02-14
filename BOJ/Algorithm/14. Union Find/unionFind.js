// Union-Find : 합집합 찾기, 서로소 집합 알고리즘
// 여러 개의 노드가 존재할 때, 두 개의 노드를 선택해서 현재 이 두 노드가 같은 그래프에 속하는지 판별

// union : 재귀로 구현, 입력받은 정점의 최종 부모 반환
// find : 두 개의 정점에 대해서 같은 최종 부모를 가지고 있는지 여부를 반환

const V = 5;
const parent = Array.from({length: V+1}, (_, idx) => idx);

// 부모 노드를 찾는 함수
function getParent(vertex) {
  if(parent[vertex] === vertex) return vertex; 
  return parent[vertex] = getParent(parent[vertex]);
}

// 두 부모 노드를 합치는 함수
// 특징 : 부모를 합칠 때는 항상 더 작은 부모의 값으로 합침 
// (각 집합 내에서 가장 작은 수가 root node이기 때문)
function unionParent(v1, v2) {
  p1 = getParent(v1);
  p2 = getParent(v2);
  if(p1 < p2) parent[p2] = p1; 
  else parent[p1] = p2;
}

// 같은 부모를 가지는지 확인
function checkSameParent(v1, v2) {
  p1 = getParent(v1);
  p2 = getParent(v2);
  return p1 === p2 ? true:false;
}

function solution() {
  for(let i=1; i<=V; i++) {
    parent[i] = i;
  }
  console.log(parent);
  unionParent(1, 2);
  unionParent(2, 3);
  unionParent(4, 5);
  console.log(parent);
}

solution();