function solution(plans) {
    var answer = [];

    const N = plans.length; // 과제 개수
    const stack = []; // 진행 중

    const planInfo = plans
        .map((x) => {
            const [h, m] = x[1].split(":").map(Number);
            return [x[0], 60 * h + m, +x[2]];
        })
        .sort((a, b) => a[1] - b[1]);

    for (let i = 0; i < N; i++) {
        const [name, start, play] = planInfo[i];

        if (i === N - 1) {
            answer.push(name);
            break;
        }

        const nextStart = planInfo[i + 1][1];
        const expectEnd = start + play;

        if (expectEnd > nextStart) {
            stack.push([name, expectEnd - nextStart]);
        } else if (expectEnd === nextStart) {
            answer.push(name);
        } else if (expectEnd < nextStart) {
            answer.push(name);

            let rest = nextStart - expectEnd;

            while (stack.length > 0 && rest > 0) {
                const [name, time] = stack.pop();

                if (rest < time) {
                    stack.push([name, time - rest]);
                    break;
                } else {
                    answer.push(name);
                    rest -= time;
                }
            }
        }
    }

    while (stack.length > 0) {
        answer.push(stack.pop()[0]);
    }

    return answer;
}
