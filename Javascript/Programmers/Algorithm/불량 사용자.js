function solution(user_id, banned_id) {
    var answer = 0;
    const userCnt = user_id.length; // 사용자수
    const banUserCnt = banned_id.length; // 제재 아이디 개수
    const isSelected = Array.from({ length: userCnt }, () => false); // 현재 유저가 선택됐는지 여부

    // 현재 사용자가 banId에 들어갈 수 있는지 확인
    const checkPossible = (banIdx, userIdx) => {
        if (banned_id[banIdx].length !== user_id[userIdx].length) return false;

        for (let i = 0; i < banned_id[banIdx].length; i++) {
            if (banned_id[banIdx][i] === "*") continue;
            if (banned_id[banIdx][i] !== user_id[userIdx][i]) return false;
        }

        return true;
    };

    const set = new Set();

    const perm = (depth, result) => {
        if (depth === banUserCnt) {
            result.sort();
            set.add(result.join(" "));
            return;
        }

        // 기존 유저 모두 순회
        for (let i = 0; i < userCnt; i++) {
            if (isSelected[i]) continue;

            if (checkPossible(depth, i)) {
                isSelected[i] = true;
                perm(depth + 1, [...result, i]);
                isSelected[i] = false;
            }
        }
    };

    perm(0, []);

    answer = set.size;

    return answer;
}
