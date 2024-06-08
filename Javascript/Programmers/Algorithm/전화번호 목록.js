function solution(phone_book) {
    var answer = true;

    phone_book.sort();

    for (let i = 0; i < phone_book.length; i++) {
        const num = phone_book[i]; // 현재 번호

        for (let j = i + 1; j < phone_book.length; j++) {
            const pre = phone_book[j].slice(0, num.length); // 비교대상 앞부분 자르기

            if (pre === num) {
                return false;
            } else break;
        }
    }

    return answer;
}
