function solution(k, dungeons) {
    
    // XX 게임
    
    // 피로도 시스템
    // - 최소 필요 피로도 : 탐험을 시작하기 위해 필요한 최소한의 피로도
    // - 소모 피로도 : 던전을 탐험한 후 소모되는 피로도
    
    // ex) 최소 필요 피로도 : 80, 소모 피로도가 20인 던전을 탐험 => 유저의 남은 피로도가 80이상이어야 한다
    
    // 입력
    // k : 유저의 현재 피로도
    // dungeons : 각 던전별 [최소 필요 피로도, 소모 피로도]
    
    // 완탐
    
    var answer = -1;
    let maxCnt = Number.MIN_SAFE_INTEGER;   
    let visited = Array.from({length: dungeons.length}, ()=>0);
    
    // index: 던전 포인터, cnt: 탐험 횟수, K: 현재 피로도
    function search(index, k, cnt) {
        maxCnt = Math.max(maxCnt, cnt);
        if(index === dungeons.length) {
            return;
        }
        
        for(let i=0; i<dungeons.length; i++) {
            if(visited[i] || dungeons[i][0] > k) continue;
            visited[i] = 1;
            search(index+1, k-dungeons[i][1], cnt+1);
            visited[i] = 0;
        }
    }
    
    search(0, k, 0);
    answer = maxCnt;
    return answer;
}