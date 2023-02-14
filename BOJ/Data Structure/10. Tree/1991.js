// 트리 순회

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const N = +input.shift();
const node = input.map(x=>x.replace('\r','').split(' '));
const graph = {};
for(let i=0; i<N; i++) {
  graph[node[i][0]] = [node[i][1], node[i][2]];
}

const preRes = [];
const inRes = [];
const postRes = [];

function inorder(curNode) {
  if(graph[`${curNode}`][0] !== '.') inorder(graph[`${curNode}`][0]);
  inRes.push(curNode);
  if(graph[`${curNode}`][1] !== '.') inorder(graph[`${curNode}`][1]);
}

function preorder(curNode) {
  preRes.push(curNode);
  if(graph[`${curNode}`][0] !== '.') preorder(graph[`${curNode}`][0]);
  if(graph[`${curNode}`][1] !== '.') preorder(graph[`${curNode}`][1]);
}

function postorder(curNode) {
  if(graph[`${curNode}`][0] !== '.') postorder(graph[`${curNode}`][0]);
  if(graph[`${curNode}`][1] !== '.') postorder(graph[`${curNode}`][1]);
  postRes.push(curNode);
}


function solution() {
  preorder('A');
  inorder('A');
  postorder('A');
  return `${preRes.join('')}\n${inRes.join('')}\n${postRes.join('')}`;
}

console.log(solution());