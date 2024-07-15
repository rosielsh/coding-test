function solution(word, pages) {
    var answer = 0;
    const N = word.length;
    const P = pages.length;

    const cntMap = new Map(); // 각 페이지 별 [인덱스, 기본 점수, 외부 링크 수]
    const linkMap = new Map(); // 외부 링크들

    const pattern = /[a-zA-Z]/;

    for (let p = 0; p < P; p++) {
        const page = pages[p];

        const site = page.split("meta")[2].split('"')[3];
        const body = page.split("body")[1].slice(1, -2);

        if (!linkMap.has(site)) {
            linkMap.set(site, []);
        }

        for (let i = 0; i < body.length; i++) {
            if (body.slice(i, i + 7) === "<a href") {
                let start = i + 9;
                let ptr = start;

                while (body[ptr] !== '"') ptr++;

                const outLink = body.slice(start, ptr);

                linkMap.set(outLink, [...(linkMap.get(outLink) || []), site]);

                const [idx, score, cnt] = [...(cntMap.get(site) || [p, 0, 0])];
                cntMap.set(site, [idx, score, cnt + 1]);

                i = ptr - 1;
            }

            if (body.slice(i, i + N).toLowerCase() === word.toLowerCase()) {
                if (pattern.test(body[i + N])) {
                    i = i + N;
                    continue;
                }

                const [idx, score, cnt] = [...(cntMap.get(site) || [p, 0, 0])];
                cntMap.set(site, [idx, score + 1, cnt]);

                i = i + N;
            }
        }
    }

    const score = Array.from({ length: P }, () => 0);

    for (let [key, value] of [...cntMap]) {
        for (let link of linkMap.get(key)) {
            if (!cntMap.has(link)) continue;

            const basic = cntMap.get(link)[1];
            const linkCnt = cntMap.get(link)[2];

            score[value[0]] += basic / linkCnt;
        }

        score[value[0]] += value[1];
    }

    let maxVal = -1;
    for (let i = 0; i < P; i++) {
        if (score[i] > maxVal) {
            answer = i;
            maxVal = score[i];
        }
    }

    return answer;
}
