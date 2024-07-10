function solution(w, h) {
    var answer = 1;
    let max = -1;

    for (let i = Math.min(w, h); i >= 1; i--) {
        if (w % i === 0 && h % i === 0) {
            max = i;
            break;
        }
    }

    const nw = w / max;
    const nh = h / max;

    answer = w * h - (nw + nh - 1) * max;

    return answer;
}
