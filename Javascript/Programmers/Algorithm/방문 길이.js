function solution(dirs) {
    var answer = 0;

    let r = 0;
    let c = 0;

    const set = new Set();

    for (let i = 0; i < dirs.length; i++) {
        const dir = dirs[i];

        let nr = r;
        let nc = c;
        switch (dir) {
            case "L": {
                nc -= 1;
                break;
            }
            case "R": {
                nc += 1;
                break;
            }
            case "U": {
                nr -= 1;
                break;
            }
            case "D": {
                nr += 1;
                break;
            }
        }

        // 범위 벗어났으면 pass
        if (nr + 5 < 0 || nr + 5 > 10 || nc + 5 < 0 || nc + 5 > 10) {
            r = r;
            c = c;
            continue;
        }

        const road = `${r} ${c} ${nr} ${nc}`;
        const reverseRoad = `${nr} ${nc} ${r} ${c}`;

        if (!set.has(road) && !set.has(reverseRoad)) {
            set.add(road);
            answer++;
        }

        r = nr;
        c = nc;
    }

    return answer;
}
