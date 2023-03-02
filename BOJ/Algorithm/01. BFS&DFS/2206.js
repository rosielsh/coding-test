// 벽 부수고 이동하기

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[NM, ...map] = require('fs').readFileSync(filePath).toString().trim().split('\n');
[N, M] = NM.split(' ').map(Number);
map = map.map(x=>x.replace('\r','').split('').map(Number));

const dy = [0, 0, -1, 1];
const dx = [-1, 1, 0, 0];

// visited[a][b][0/1] => 0:벽을 부수지 않고 방문, 1:벽을 부수고 방문
// ex) visited[a][b][1] = (a, b)까지 벽을 부쉈을 때 이동한 최단거리 저장
const visited = Array.from({length: N}, ()=>Array.from({length: M}, ()=>Array(2).fill(0)));

function bfs(startY, startX) {
    // 인자 : 시작 행, 시작 열, 벽을 깼는지 여부
    const queue = [[startY, startX, 0]];
    visited[startY][startX][0] = 1;
    let idx = 0;

    while(queue.length !== idx) {
        [curY, curX, isBreak] = queue[idx];

        if(curY === N-1 && curX === M-1) {
            return visited[curY][curX][isBreak];
        }

        for(let i=0; i<4; i++) {
            ny = curY + dy[i];
            nx = curX + dx[i];

            if(ny < 0 || ny >= N || nx < 0 || nx >= M) continue;
            
            // 이동할 위치가 벽이 아니고 방문하지 않은 경우 
            if(!map[ny][nx] && !visited[ny][nx][isBreak]) {
                visited[ny][nx][isBreak] = visited[curY][curX][isBreak]+1;
                queue.push([ny, nx, isBreak]);
            }
            // 이동할 위치가 벽이고, 아직 부수지 않았다면  
            else if(map[ny][nx] && !isBreak) {
                visited[ny][nx][1] = visited[curY][curX][0]+1; 
                queue.push([ny, nx, 1]);
            }
            
        }
        idx++;
    }
    return -1;
}

console.log(bfs(0, 0));