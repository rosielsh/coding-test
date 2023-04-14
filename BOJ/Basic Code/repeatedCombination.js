// 중복 조합
// 조합을 구하되 재귀함수의 인자인 idx를 현재 자신의 index부터 포함한다

const arr = [1, 2, 3, 4];
const pick = 3;
const output = Array.from({length: pick}, ()=>0);

function combination(depth, idx) {
    if(depth === pick) {
        console.log(output);
        return;
    }

    for(let i=idx; i<arr.length; i++) {
        output[depth] = arr[i];
        combination(depth+1, i);
    }
}

combination(0, 0);