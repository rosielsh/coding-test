// 원하는 값 이상
const lowerBound = (target) => {
    let left = 0;
    let right = arr.length;

    while (left < right) {
        const mid = parseInt((left + right) / 2);

        if (arr[mid] >= target) right = mid;
        else left = mid + 1;
    }

    return right; 
};

// 원하는 값 초과
const upperBound = (target) => {
    let left = 0;
    let right = arr.length;

    while (left < right) {
        const mid = parseInt((left + right) / 2);

        if (arr[mid] > target) right = mid;
        else left = mid + 1;
    }

    return right;
};
