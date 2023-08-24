function solution(maps) {
    var answer = 0;
    const R = maps.length;
    const C = maps[0].length;
    const dy = [0, 0, -1, 1];
    const dx = [-1, 1, 0, 0];
    
    function bfs(startY, startX) {
        const queue = [[startY, startX, 1]];
        const visited = Array.from({length: R}, ()=>Array(C).fill(0)); 
        visited[startY][startX] = 1;
        
        while(queue.length) {
            [curY, curX, route] = queue.shift();
            
            for(let i=0; i<4; i++) {
                ny = curY + dy[i];
                nx = curX + dx[i];
                
                if(ny < 0 || ny >= R || nx < 0 || nx >= C || visited[ny][nx] || !maps[ny][nx]) continue;
                
				// 이 부분을 위로 옮기면 테케 1개에서 시간초과 발생
				// => 상하좌우 큐에 넣으면서 바로 목적지인지 검사
                if(ny === R-1 && nx === C-1) {
                    return route+1;
                }
                    
                visited[ny][nx] = 1;
                queue.push([ny, nx, route+1]);
            }
        }                          
        return -1;
    }
    
    answer = bfs(0, 0);
    return answer;
}