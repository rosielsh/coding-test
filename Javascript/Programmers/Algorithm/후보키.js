function solution(relation) {
    var answer = 0;

    const tupleCnt = relation.length; // 전체 데이터 개수
    const attrNum = relation[0].length; // 속성 개수
    const attrCombi = new Array(0); // 지금까지의 후보키 조합

    // 유일성 검사
    const checkUnique = (result) => {
        const set = new Set();
        const resultCnt = result.length;

        for (let i = 0; i < tupleCnt; i++) {
            const data = [];
            for (let j = 0; j < resultCnt; j++) {
                data.push(relation[i][result[j]]);
            }

            set.add(data.join(" "));
        }

        if (set.size === tupleCnt) {
            return true;
        }

        return false;
    };

    // 최소성 검사
    const checkMin = (result) => {
        for (let i = 0; i < attrCombi.length; i++) {
            const combi = attrCombi[i];

            let includeCnt = 0;
            for (let j = 0; j < combi.length; j++) {
                if (result.includes(combi[j])) {
                    includeCnt++;
                }
            }

            if (includeCnt === combi.length) return false;
        }

        return true;
    };

    const subset = (depth, result) => {
        if (depth === attrNum) {
            if (!result.length) return;

            const isUnique = checkUnique(result);

            if (!isUnique) return;

            const isMinimality = checkMin(result);

            if (!isMinimality) return;

            attrCombi.push([...result]);

            return;
        }

        subset(depth + 1, result);
        result.push(depth);
        subset(depth + 1, result);
        result.pop();
    };

    subset(0, []);

    answer = attrCombi.length;

    return answer;
}
