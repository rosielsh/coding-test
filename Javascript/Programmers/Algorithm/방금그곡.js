function solution(m, musicinfos) {
    var answer = "(None)";

    let mCnt = musicinfos.length;
    let cCnt = m.length;

    const candi = [];

    for (let i = 0; i < mCnt; i++) {
        let [start, end, title, melody] = musicinfos[i].split(",");
        let [sH, sM] = start.split(":").map(Number);
        let [eH, eM] = end.split(":").map(Number);

        let time = (eH - sH) * 60 + (eM - sM);

        let melodyCnt = melody.length;

        let isExist = false;

        for (let i = 0; i < melodyCnt; i++) {
            if (m[0] !== melody[i]) continue;
            if (i > time) break; // 실행시간보다 더 크면 종료

            let ptr = i;
            let mPtr = 0;

            while (mPtr < cCnt) {
                if (melody[ptr] === m[mPtr]) {
                    ptr++;
                    mPtr++;

                    if (ptr >= melodyCnt) ptr = 0;
                    if (mPtr === cCnt) {
                        if (m[mPtr - 1] !== "#" && melody[ptr] === "#") continue;
                        candi.push([time, title]);
                        isExist = true;
                        break;
                    }
                } else break;
            }

            if (isExist) break;
        }
    }

    candi.sort((a, b) => b[0] - a[0]);

    if (candi.length) answer = candi[0][1];

    return answer;
}
