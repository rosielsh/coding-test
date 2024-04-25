function solution(rectangle, characterX, characterY, itemX, itemY) {
    var answer = 0;

    // rectangle : 사각형의 각 원소(왼쪽x, y / 오른쪽 x, y)
    // characterX, characterY : 캐릭터 좌표
    // itemX, itemY : 아이템의 좌표

    const map = Array.from({ length: 102 }, () => Array(102).fill(-1)); // 전체 2차원 좌표

    for (let i = 0; i < rectangle.length; i++) {
        const [x1, y1, x2, y2] = rectangle[i].map((x) => x * 2);

        for (let i = x1; i <= x2; i++) {
            for (let j = y1; j <= y2; j++) {
                if (i > x1 && i < x2 && j > y1 && j < y2) {
                    map[i][j] = 0;
                } else if (map[i][j] != 0) {
                    map[i][j] = 1;
                }
            }
        }
    }

    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];

    const bfs = () => {
        const queue = [[characterX * 2, characterY * 2, 0]];
        const visited = Array.from({ length: 102 }, () => Array(102).fill(false));

        visited[characterX * 2][characterY * 2] = true;

        while (queue.length > 0) {
            const [cx, cy, dist] = queue.shift();

            if (cx === itemX * 2 && cy === itemY * 2) {
                return parseInt(dist / 2);
            }

            for (let i = 0; i < 4; i++) {
                const nx = cx + dx[i];
                const ny = cy + dy[i];

                if (
                    nx < 0 ||
                    nx >= 102 ||
                    ny < 0 ||
                    ny >= 102 ||
                    visited[nx][ny] ||
                    map[nx][ny] < 1
                )
                    continue;

                visited[nx][ny] = true;
                queue.push([nx, ny, dist + 1]);
            }
        }
    };

    answer = bfs();

    return answer;
}
