function solution(n, s, a, b, fares) {
    // n: 지점의 개수
    // s: 출발 지점 번호
    // a, b: a, b의 도착 지점
    // fares: 지점 사이의 예상 택시 요금 [c, d, f]: c, d사이의 요금이 f원
    
    let answer = Infinity;
    
    const dp = Array.from({length: n+1}, () => Array(n+1).fill(Infinity));
    
    for(let i=1; i<=n; i++) {
        dp[i][i] = 0;
    }
    
    for(let [c, d, f] of fares) {
        dp[c][d] = f;
        dp[d][c] = f;
    }
    
    for(let k=1; k<=n; k++) {
        for(let i=1; i<=n; i++) {
            for(let j=1; j<=n; j++) {
                dp[i][j] = Math.min(dp[i][k] + dp[k][j], dp[i][j]);
            }
        }
    }
    
    for(let i=1; i<=n; i++) {
        if(dp[s][i] === Infinity) answer = Math.min(dp[i][a] + dp[i][b], answer);
        else answer = Math.min(dp[s][i] + dp[i][a] + dp[i][b], answer);
    }

    return answer;
}