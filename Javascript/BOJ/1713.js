const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const N = +input.shift();
const cnt = +input.shift();
const nums = input.shift().split(" ").map(Number);

const map = new Map();

for (let i = 0; i < cnt; i++) {
    const num = nums[i];

    if (map.size === N) {
        if (map.has(num)) {
            const [cnt, idx] = map.get(num);
            map.set(num, [cnt + 1, idx]);
            continue;
        }

        const arr = [...map];
        arr.sort((a, b) => {
            if (a[1][0] === b[1][0]) {
                return a[1][1] - b[1][1];
            } else return a[1][0] - b[1][0];
        });

        const del = arr[0];

        map.delete(del[0]);
        map.set(num, [1, i]);
    } else {
        if (map.has(num)) {
            const [cnt, idx] = map.get(num);
            map.set(num, [cnt + 1, idx]);
        } else {
            map.set(num, [1, i]);
        }
    }
}

const keys = [...map.keys()].sort((a, b) => a - b);
console.log(keys.join(" "));
