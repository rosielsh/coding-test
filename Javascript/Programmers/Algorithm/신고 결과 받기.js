function solution(id_list, report, k) {
    var answer = [];

    const smap = new Map();
    const rsmap = new Map();

    for (let i = 0; i < id_list.length; i++) {
        smap.set(id_list[i], []);
        rsmap.set(id_list[i], []);
    }

    for (let i = 0; i < report.length; i++) {
        const [from, to] = report[i].split(" ");

        if (![...smap.get(to)].includes(from)) {
            smap.set(to, [...smap.get(to), from]);
        }

        if (![...rsmap.get(from)].includes(to)) {
            rsmap.set(from, [...rsmap.get(from), to]);
        }
    }

    const stopId = new Set();

    for (let [key, value] of smap.entries()) {
        if (value.length >= k) {
            stopId.add(key);
        }
    }

    let idx = 0;
    for (let [key, value] of rsmap.entries()) {
        let cnt = 0;
        for (let name of value) {
            if (stopId.has(name)) cnt++;
        }

        answer[idx++] = cnt;
    }

    return answer;
}
