function solution(edges) {
    var answer = [];

    const map = new Map(); // 나가는 갯수
    const rmap = new Map(); // 들어오는 갯수

    let max = 0;

    for (let [from, to] of edges) {
        map.set(from, (map.get(from) || 0) + 1);
        rmap.set(to, (rmap.get(to) || 0) + 1);

        max = Math.max(max, from, to);
    }

    const arr = [...map];

    let maxCnt = 0;
    let tNode = 0;

    for (let [node, cnt] of arr) {
        if (!rmap.has(node) && maxCnt < cnt) {
            maxCnt = cnt;
            tNode = node;
        }
    }

    let gCnt = [0, 0, 0];

    for (let i = 1; i <= max; i++) {
        if (!map.has(i) && rmap.get(i) >= 1) {
            gCnt[1]++;
        } else if (map.get(i) === 2 && rmap.get(i) >= 2) {
            gCnt[2]++;
        }
    }

    gCnt[0] = map.get(tNode) - (gCnt[1] + gCnt[2]);

    answer = [tNode, ...gCnt];

    return answer;
}
