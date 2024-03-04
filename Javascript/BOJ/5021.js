const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

// 나라를 세운 사람과 혈통이 가장 가까운 사람을 찾기
const [N, M] = input.shift().split(" ").map(Number);
const root = input.shift(); // 나라를 세운 사람
const family = input.splice(0, N).map((x) => x.split(" ")); // 가족 정보 : 자식, 부, 모
const person = input; // 왕위를 계승받기를 주장하는 사람

const familyMap = new Map();
const bloodMap = new Map();

for (let [child, p1, p2] of family) {
    familyMap.set(child, [p1, p2]);
    bloodMap.set(child, 0);
    bloodMap.set(p1, 0);
    bloodMap.set(p2, 0);
}

const dfs = (x) => {
    if (!familyMap.has(x)) {
        return bloodMap.get(x);
    }

    // 현재 원소의 부모 가져오기
    const [p1, p2] = familyMap.get(x);

    const res = (dfs(p1) + dfs(p2)) / 2;

    // 현재 x의 결과 저장
    bloodMap.set(x, res);

    return res;
};

let max = -1;
let answer = "";

for (let p of person) {
    // bloodMap을 일단 0으로 다 초기화하기
    for (let k of bloodMap.keys()) {
        bloodMap.set(k, 0);
    }

    // 나라를 세운 사람은 1
    bloodMap.set(root, 1);

    // dfs 돌리기
    const res = dfs(p);

    if (res > max) {
        max = res;
        answer = p;
    }
}

console.log(answer);
