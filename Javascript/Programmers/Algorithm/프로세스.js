function solution(priorities, location) {
    var answer = 0;

    const queue = [];

    for (let i = 0; i < priorities.length; i++) {
        queue.push([i, priorities[i]]);
    }

    let flag = true;
    while (flag) {
        const fP = queue[0][1];

        let hasBig = false;
        for (let i = 1; i < queue.length; i++) {
            if (fP < queue[i][1]) {
                hasBig = true;
                break;
            }
        }

        // 더 큰게 없음
        if (!hasBig) {
            const [idx, val] = queue.shift();

            if (idx === location) {
                return answer + 1;
            }

            answer++;
        } else {
            queue.push(queue.shift());
        }
    }

    return answer;
}
