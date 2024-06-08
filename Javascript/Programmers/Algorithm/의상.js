function solution(clothes) {
    // 매일 다른 옷 착용. 각 종류별로 최대 1가지 의상만 착용
    // 서로 다른 옷의 조합의 수 구하기

    var answer = 1;

    const map = new Map();

    for (let [name, type] of clothes) {
        if (!map.has(type)) map.set(type, [name]);
        else map.set(type, [...map.get(type), name]);
    }

    const mapArr = [...map];

    for (let i = 0; i < mapArr.length; i++) {
        const [type, clothesArr] = mapArr[i];

        answer *= clothesArr.length + 1;
    }

    answer -= 1;

    return answer;
}
