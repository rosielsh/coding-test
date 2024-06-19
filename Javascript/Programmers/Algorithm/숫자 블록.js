function solution(begin, end) {
    var answer = [];

    const divisor = (num) => {
        let result = 1;

        if (num === 1) return 0;

        // 자신 제외 가장 큰 약수 구하기
        for (let i = 2; i <= Math.sqrt(num); i++) {
            // i로 나눠떨어질때
            if (num % i === 0) {
                result = i;
                // 사용한 블럭이 1000000보다 작음
                if (num / i <= 10000000) {
                    result = num / i;
                    break;
                }
            }
        }

        return result;
    };

    for (let i = begin; i <= end; i++) {
        answer.push(divisor(i));
    }

    return answer;
}
