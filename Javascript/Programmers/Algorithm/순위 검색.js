function solution(info, query) {
    // query마다 info를 필터링하면 시간 초과 => 지원자들을 그룹별로 미리 분류(미리 map를 만들어 저장해서 info를 전체 순회하지 않는 것이 시간초과를 줄이는 방법)
    // key: 나올 수 있는 지원자 조합, value: 그 지원자의 점수들을 배열로 저장하고 query에서 찾고자 하는 점수 이상의 지원자가 몇 명있는지 구하기 => 이때 순차탐색이 아닌 이분탐색으로 수행(배열에서 X이상인 숫자가 처음 나타나는 위치 => lower bound)

    var answer = [];
    const map = {}; // map 객체로 하면 시간 초과

    const combi = (idx, infos, score) => {
        const key = infos.join("");

        if (Array.isArray(map[key])) map[key].push(score);
        else map[key] = [score];

        for (let i = idx; i < infos.length; i++) {
            let combiArr = [...infos];
            combiArr[i] = "-";

            combi(i + 1, combiArr, score);
        }
    };

    const binarySearch = (score, arr) => {
        if (!arr) return 0;

        let left = 0;
        let right = arr.length;

        while (left < right) {
            const mid = parseInt((left + right) / 2);

            if (arr[mid] < score) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        return arr.length - right;
    };

    for (let i = 0; i < info.length; i++) {
        const arr = info[i].split(" ");
        const select = arr.slice(0, 4);
        const score = arr.slice(4, 5);

        combi(0, select, +score);
    }

    for (let key in map) {
        map[key].sort((a, b) => a - b);
    }

    for (let q = 0; q < query.length; q++) {
        const arr = query[q].replace(/ and /g, "").split(" ");
        const score = Number(arr.pop());
        const key = arr.join("");

        if (map[key]) {
            answer.push(binarySearch(score, map[key]));
        } else answer.push(0);
    }

    return answer;
}
