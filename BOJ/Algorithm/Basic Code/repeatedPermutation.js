// 중복 순열
// 순열을 구하되 visited를 쓰지 않으면 중복값을 구할 수 있다.

const arr = [1, 2, 3, 4];
const pick = 3;
const output = Array.from({length: pick}, ()=>0);

function permutation(depth) {
    if(depth === pick) {
        console.log(output);
        return;
    }

    // 각 자리에 들어갈 후보들을 for문으로 하나씩 넣어주기 
    for(let i=0; i<arr.length; i++) {
        output[depth] = arr[i];
        permutation(depth+1);
    }

}

permutation(0);