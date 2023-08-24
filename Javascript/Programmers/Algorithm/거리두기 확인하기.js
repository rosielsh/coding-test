function solution(places) {
    // 맨해튼 거리 : 행, 열 차이의 합
    // 앉는 조건 : 맨해튼 거리가 2보다 커야함, 파티션으로 막힌 경우는 상관 x
    
    // 입력 
    // P : 응시자
    // 0 : 빈 테이블
    // X : 파티션 
    // places : 대기실 5개 정보 
    // places[0] : 0번 대기실 (5x5 크기)
    
    // 출력
    // 1 : 모두 거리두기를 지키고 있다
    // 0 : 한 명이라도 지키고 있지 않다
    
    var answer = [];
    answer = Array.from({length: 5}, ()=>1);
    
    function getCandidatePos(i) {
        const pos = [];
        const curPlace = places[i];
        for(let i=0; i<5; i++) {
            for(let j=0; j<5; j++) {
                if(curPlace[i][j] === 'P') pos.push([i, j]);
            }
        }
        return pos;
    }
    
    const dy = [0, 0, -1, 1];
    const dx = [-1, 1, 0, 0];
    
    function bfs(startY, startX, placeIdx) {
        const curPlace = places[placeIdx];
        const queue = [[startY, startX, 0]];
        const visited = Array.from({length: 5}, ()=>Array(5).fill(0));
        visited[startY][startX] = 1;
        
        while(queue.length) {
            [curY, curX, distance] = queue.shift();
            
            // 이동 조건 : O일때만 경로를 체크해준다
            for(let i=0; i<4; i++) {
                ny = curY + dy[i];
                nx = curX + dx[i];
                
                if(ny < 0 || ny >= 5 || nx < 0 || nx >= 5 || visited[ny][nx]) continue;
                if(curPlace[ny][nx] === 'X') continue;
                
                // 다음 좌표가 P일 때 지금까지 온 거리가 2 이하이면 -1
                if(curPlace[ny][nx] === 'P' && distance+1 <= 2) return -1;
                
                visited[ny][nx] = 1;
                queue.push([ny, nx, distance+1]);
            }
        }
        return 0;
    }
    
    
    // 5개의 대기실에 대해 진행
    for(let i=0; i<5; i++) {
        // 0-4번 대기실 응시자 좌표 계산
        const candiPos = getCandidatePos(i);
        // 현재 대기실의 j번 응시자 검사
        for(let j=0; j<candiPos.length; j++) {
            const keepDistance = bfs(candiPos[j][0], candiPos[j][1], i);
            // 거리두기를 지키지 않으면 -1반환
            if(keepDistance === -1) {
                answer[i] = 0;
                break;
            } 
        }
    }
    
    return answer;
}