import sys
input = sys.stdin.readline

from collections import deque

dx = [0, 0, -1, 1]
dy = [-1, 1, 0, 0]

selected = [[0] * 5 for _ in range(5)]

def isConnected(arr):
    totalCnt = 0
    queue = deque([(arr[0][0], arr[0][1])])
    visited = [[0]*5 for _ in range(5)]

    while queue:
        cx, cy = queue.popleft()

        for i in range(4):
            nx = cx + dx[i]
            ny = cy + dy[i]

            if nx < 0 or nx >= 5 or ny < 0 or ny >= 5 or visited[nx][ny] or selected[nx][ny] == 0:
                continue

            visited[nx][ny] = 1
            totalCnt += 1
            queue.append((nx, ny))

    if totalCnt == 7:
        return True
    else:
        return False

def combination(depth, start, result, sCnt):
    global answer

    if depth == 7:
        if sCnt >= 4:
            if isConnected(result):
                answer += 1
        return

    for i in range(start, 25):
        row = i // 5
        col = i % 5
        result.append([row, col])
        selected[row][col] = 1
        if seat[row][col] == 'S':
            combination(depth+1, i+1, result, sCnt+1)
        else:
            combination(depth+1, i+1, result, sCnt)
        selected[row][col] = 0
        result.pop()

answer = 0
seat = [list(input()) for _ in range(5)]
combination(0, 0, [], 0)

print(answer)