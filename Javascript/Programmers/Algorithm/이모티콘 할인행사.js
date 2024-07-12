function solution(users, emoticons) {
    var answer = [];

    const N = users.length;
    const M = emoticons.length;

    const calc = (sum) => {
        let plusCnt = 0;
        let sale = 0;

        for (let i = 0; i < N; i++) {
            if (sum[i] >= users[i][1]) plusCnt++;
            else sale += sum[i];
        }

        return [plusCnt, sale];
    };

    let maxPlus = -1;
    let maxSale = -1;

    const dfs = (depth, sum) => {
        if (depth === M) {
            const [plus, sale] = calc(sum);

            if (maxPlus === plus) {
                if (maxSale < sale) {
                    maxSale = sale;
                }
            } else if (maxPlus < plus) {
                maxPlus = plus;
                maxSale = sale;
            }

            return;
        }

        for (let i = 10; i <= 40; i += 10) {
            const discount = emoticons[depth] - (emoticons[depth] * i) / 100;

            for (let j = 0; j < N; j++) {
                if (users[j][0] > i) continue;

                sum[j] += discount;
            }

            dfs(depth + 1, sum);

            for (let j = 0; j < N; j++) {
                if (users[j][0] > i) continue;

                sum[j] -= discount;
            }
        }
    };

    const sumArr = Array.from({ length: N }, () => 0);
    dfs(0, sumArr);

    answer = [maxPlus, maxSale];

    return answer;
}
