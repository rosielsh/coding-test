const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[NM, tree] = require('fs').readFileSync(filePath).toString().trim().split('\n');
[N, M] = NM.split(' ').map(Number);
tree = tree.split(' ').map(Number);

// 나무 자르기
// 상근이가 H 높이 만큼 나무를 잘라 최소 M 만큼의 나무를 가져가야 함

// 최소 나무 높이 : 0
// 최대 나무 높이 : 나무 중 최댓값 

function solution() {
  let left = 0;
  let right = Math.max(...tree);
  let mid;

  while(left <= right) {
	mid = parseInt((left + right)/2);

	let getTree = 0;
	for(let i=0; i<N; i++) {
		if(tree[i] - mid > 0) {
			getTree += (tree[i] - mid);
		}
	}

	if(getTree === M) {
		return mid;
	} else if(getTree > M) {
		left = mid + 1;
	} else {
		right = mid - 1;
	}
  }

  return right;
}

console.log(solution());