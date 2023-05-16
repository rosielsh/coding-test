# 동전 2

import sys
input = sys.stdin.readline

n, k = map(int, input().split(' '))
values = [int(input()) for _ in range(n)]

dp = [1e9 for _ in range(k+1)]

for value in values:
    if value <= k:
        dp[value] = 1

for i in range(1, k+1):
    for value in values:
         if i - value > 0:
            dp[i] = min(dp[i-value] + 1, dp[i])

if dp[k] == 1e9:
    print(-1)
else:
    print(dp[k])