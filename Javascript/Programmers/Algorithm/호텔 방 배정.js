function solution(k, room_number) {
    // k: ~10^12임 => 이걸 배열로 만들면 당연히 메모리 초과 => HashMap 사용
    // room_num: 1~200,000

    // 방법1) 무지성 완탐 O(k * room_num) => 효율성 실패
    // 방법2) 채워진 방을 HashMap으로 관리하고 {방번호 : 다음방 번호} 상태로 저장

    // 풀이 참고(https://hy-ung.tistory.com/55)

    var answer = [];
    const map = new Map();

    const solve = (num) => {
        // 비어있다면
        if (!map.has(num)) {
            map.set(num, num + 1);
            return num;
        }
        // 차있다면
        else {
            const empty = solve(map.get(num));
            map.set(num, empty + 1);
            return empty;
        }
    };

    for (let num of room_number) {
        answer.push(solve(num));
    }

    return answer;
}
