function solution(s) {
    var answer = true;

    const stack = [];
    for (let i = 0; i < s.length; i++) {
        const cur = s[i];

        if (cur === "(") {
            stack.push("(");
        } else {
            if (stack.length === 0) return false;

            if (stack[stack.length - 1] === "(") {
                stack.pop();
            }
        }
    }

    if (stack.length > 0) return false;

    return answer;
}
