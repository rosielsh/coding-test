function solution(word) {
    var answer = 0;

    const arr = ["A", "E", "I", "O", "U"];

    let cnt = 0;
    let find = false;
    const dfs = (depth, res) => {
        if (res === word) {
            find = true;
            answer = cnt;
            return;
        }

        cnt++;

        if (find || depth === 5) {
            return;
        }

        for (let i = 0; i < 5; i++) {
            dfs(depth + 1, res + arr[i]);
        }
    };

    dfs(0, "");

    return answer;
}
