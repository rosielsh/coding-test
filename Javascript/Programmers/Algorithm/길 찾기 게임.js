function solution(nodeinfo) {
    var answer = [[]];

    class BinaryTree {
        constructor(idx, xPos) {
            this.idx = idx;
            this.xPos = xPos;
            this.left = null;
            this.right = null;
        }

        insert(idx, xPos) {
            if (xPos <= this.xPos) {
                this.toLeft(idx, xPos);
            } else this.toRight(idx, xPos);
        }

        toLeft(idx, xPos) {
            if (this.left) {
                this.left.insert(idx, xPos);
            } else this.left = new BinaryTree(idx, xPos);
        }

        toRight(idx, xPos) {
            if (this.right) {
                this.right.insert(idx, xPos);
            } else this.right = new BinaryTree(idx, xPos);
        }
    }

    const sortednodeInfo = nodeinfo
        .map((node, idx) => [idx + 1, node[0], node[1]])
        .sort((a, b) => b[2] - a[2]);

    const bt = new BinaryTree(sortednodeInfo[0][0], sortednodeInfo[0][1]);

    for (let i = 1; i < sortednodeInfo.length; i++) {
        bt.insert(sortednodeInfo[i][0], sortednodeInfo[i][1]);
    }

    const preOrderArr = [];
    const postOrderArr = [];

    const preOrder = (bt, result) => {
        if (bt === null) return;
        result.push(bt.idx);
        preOrder(bt.left, result);
        preOrder(bt.right, result);
    };

    const postOrder = (bt, result) => {
        if (bt === null) return;
        postOrder(bt.left, result);
        postOrder(bt.right, result);
        result.push(bt.idx);
    };

    preOrder(bt, preOrderArr);
    postOrder(bt, postOrderArr);

    answer = [preOrderArr, postOrderArr];
    return answer;
}
