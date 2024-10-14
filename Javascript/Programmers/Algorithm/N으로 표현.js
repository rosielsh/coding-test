function solution(N, number) {
    var answer = -1;
    const dp = Array.from({ length: 9 }, () => new Set()); // N의 개수 별 만들 수 있는 조합의 수를 저장
    
    dp[1].add(N);
    
    if(N === number) return 1;
    
    for(let i=2; i<=8; i++) {
        for(let j=1; j<=i-1; j++) {
            const setA = dp[j];
            const setB = dp[i-j];
            
            for(let a of setA) {
                for(let b of setB) {
                    dp[i].add(a+b);
                    dp[i].add(a-b);
                    dp[i].add(a*b);
                    dp[i].add(parseInt(a/b));
                }
            }
        }
        
        dp[i].add(+String(N).repeat(i));
        
        if(dp[i].has(number)) return i;
    }
    
    return answer;
}