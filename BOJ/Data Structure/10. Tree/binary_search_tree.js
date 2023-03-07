// 이진 탐색 트리 (연결 리스트)

class Node {
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  }
  
  class BinarySearchTree {
    constructor() {
      this.root = null;
    }
  
    insertNode(data) {
      let node = new Node(data);
  
      // 데이터가 하나도 없는 경우 => 현재 노드를 root로 설정
      if(!this.root) {
        this.root = node;
        return this;
      }
  
      let current = this.root; // 비교하기 위해 설정
  
      while(current) {
        if(data === current.data) return; // 현재 기준 데이터와 넣으려는 데이터가 같을 때
  
        if(data < current.data) { // 현재 기준 데이터보다 작을 때
          if(!current.left) { // 현재 기준 노드에 왼쪽 자식이 없다면 
            current.left = node; // 현재 기준 노드의 왼쪽 자식으로 할당
            break;
          }
          current = current.left; // current 갱신 
        }
  
        if(data > current.data) { // 현재 기준 데이터보다 클 때
          if(!current.right) {
            current.right = node;
            break;
          }
          current = current.right;
        }
      }
    }
  }
  
  const bst = new BinarySearchTree();
  bst.insertNode(10);
  bst.insertNode(25);
  bst.insertNode(3);
  bst.insertNode(8);
  
  console.log(bst);

//   BinarySearchTree {
//     root: Node {
//       data: 10,
//       left: Node { data: 3, left: null, right: [Node] },
//       right: Node { data: 25, left: null, right: null }
//     }
//   }