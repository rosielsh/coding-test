const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();
const A = input.shift().split(" ").map(Number);

const str = [];

const binarySearch = (target) => {
    let left = 0;
    let right = str.length;

    while (left < right) {
        const mid = parseInt((left + right) / 2);

        if (str[mid] >= target) right = mid;
        else left = mid + 1;
    }

    return right;
};

for (let i = 0; i < N; i++) {
    const num = A[i];

    if (!str.length) {
        str.push(num);
    } else {
        if (str[str.length - 1] < num) {
            str.push(num);
        } else {
            const idx = binarySearch(num);
            str[idx] = num;
        }
    }
}

console.log(str.length);
