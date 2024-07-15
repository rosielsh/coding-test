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

// 정규식 풀이 => 성능은 더 느림
function solution(word, pages) {
    var answer = 0;

    const patternWord = /[\d|\W]/; // 숫자와 특수 기호 처리
    const patternURL = /<a href="https:\S*"/gi; // 외부 링크를 찾는 정규식

    // 파싱
    const pageMap = new Map(); // 페이지 정보 저장

    word = word.toLowerCase();

    pages.forEach((page, idx) => {
        const pageArr = page.split("\n");
        const urlIdx = pageArr.findIndex((x) => x.includes("meta property"));
        const pageURL = pageArr[urlIdx].match(/https:\S*/gi)[0].slice(0, -3); // 현재 페이지 url

        const bodyStart = pageArr.findIndex((x) => x.includes("<body>"));
        const bodyEnd = pageArr.findIndex((x) => x.includes("</body>"));

        const body = pageArr.slice(bodyStart + 1, bodyEnd); // body 안의 내용

        const cnt = body
            .flatMap((x) => x.toLowerCase().split(patternWord))
            .filter((x) => x === word).length;
        const outLinks = body
            .flatMap((x) => x.match(patternURL))
            .filter((x) => x)
            .map((x) => x.slice(9, -1));

        pageMap.set(pageURL, { idx, cnt, outLinks, match: 0 });
    });

    // 링크 점수 계산
    for (let [key, value] of pageMap) {
        // a -> b로가는 링크를 계산할 때
        // a의 점수
        const linkScore = value.cnt / value.outLinks.length;

        // a와 연결된 링크 순회하면서 더해주기
        for (let link of value.outLinks) {
            if (!pageMap.has(link)) continue;

            const origin = pageMap.get(link); // a와 연결된 링크의 정보
            const addPoint = origin.match + linkScore;
            pageMap.set(link, { ...origin, match: addPoint });
        }
    }

    for (let [key, value] of pageMap) {
        pageMap.set(key, { ...value, match: value.match + value.cnt });
    }

    let maxVal = -1;
    for (let [_, value] of pageMap) {
        if (value.match > maxVal) {
            maxVal = value.match;
            answer = value.idx;
        }
    }

    return answer;
}

// 정규식 설명
// /[\d|\W]/ : \d는 숫자 문자, \W는 단어 문자가 아닌 문자에 대응
// /<a href="https:\S*"gi/ : \S는 공백 문자가 아닌 하나의 문자에 대응, *는 연속 반복에 대응
