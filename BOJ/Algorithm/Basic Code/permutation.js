// 순열

// input : [1, 2, 3, 4]
// output(4P3) : [[1, 2, 3], [1, 2, 4], [1, 3, 4], [2, 3, 4] ....]

// visited를 활용하는 방법 
// dfs를 돌면서 모든 인덱스를 방문하여 output에 결과값을 넣는다

const arr = [1, 2, 3, 4];
const pick = 3;
const output = Array.from({length: pick}, ()=>0);
const visited = Array.from({length: arr.length}, ()=>0);

function permutation(depth) {
    if(depth === pick) {
        console.log(output);
        return;
    }

    // 각 자리에 들어갈 후보들을 for문으로 하나씩 넣어주기 
    for(let i=0; i<arr.length; i++) {
        // 방문했으면 이미 앞선 for문에서 처리해준 것임 
        if(visited[i]) continue;
        visited[i] = 1;
        output[depth] = arr[i];
        permutation(depth+1);
        visited[i] = 0;
    }

}

permutation(0);