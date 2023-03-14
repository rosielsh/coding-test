// 조합

// input : [1, 2, 3, 4]
// output(4C3) : [[1, 2, 3], [1, 2, 4], [1, 3, 4], [2, 3, 4]]

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
        combination(depth+1, i+1);
    }
}

combination(0, 0);