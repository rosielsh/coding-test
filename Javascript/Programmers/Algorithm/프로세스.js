function solution(priorities, location) {
    var answer = 0;

    const N = priorities.length;
    const queue = [];
    const run = [];

    for (let i = 0; i < N; i++) {
        queue.push([i, priorities[i]]);
    }

    while (queue.length > 0) {
        const [idx, priority] = queue.shift();
        const hasBigger = queue.some((ele) => ele[1] > priority);

        if (hasBigger) {
            queue.push([idx, priority]);
            continue;
        }

        run.push(idx);
    }

    answer = run.indexOf(location) + 1;
    return answer;
}
