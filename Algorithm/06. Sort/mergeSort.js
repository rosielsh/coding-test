// 배열을 병합
function merge(left, right) {
    const result = [];
    while(left.length && right.length) {
        if(left[0] <= right[0]) result.push(left.shift());
        else result.push(right.shift());
    }
    return [...result, ...left, ...right];
}

// 배열을 분할
function mergeSort(arr) {
    if(arr.length <= 1) {
        return arr;
    }
    let mid = Math.floor(arr.length / 2);
    let leftArr = arr.slice(0, mid);
    let rightArr = arr.slice(mid);
    return merge(mergeSort(leftArr), mergeSort(rightArr));
}

const arr = [1, 3, 2, 4];
console.log(mergeSort(arr));