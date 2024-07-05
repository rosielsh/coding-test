function solution(key, lock) {
    var answer = false;

    const N = key.length;
    const M = lock.length;

    let offset = N - 1;

    const sum = (arr, k, r, c) => {
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                if (k === 0) {
                    arr[r + i][c + j] += key[i][j];
                } else if (k === 1) {
                    arr[r + i][c + j] += key[j][N - 1 - i];
                } else if (k === 2) {
                    arr[r + i][c + j] += key[N - 1 - i][N - 1 - j];
                } else {
                    arr[r + i][c + j] += key[N - 1 - j][i];
                }
            }
        }
    };

    const check = (arr) => {
        for (let i = 0; i < M; i++) {
            for (let j = 0; j < M; j++) {
                if (arr[offset + i][offset + j] !== 1) return false;
            }
        }

        return true;
    };

    for (let i = 0; i < offset + M; i++) {
        for (let j = 0; j < offset + M; j++) {
            for (let k = 0; k < 4; k++) {
                // 현재 작업하는 배열
                const arr = Array.from({ length: 2 * N + M }, () => Array(2 * N + M).fill(0));

                // 배열에 자물쇠 정보 복사
                for (let a = 0; a < M; a++) {
                    for (let b = 0; b < M; b++) {
                        arr[offset + a][offset + b] = lock[a][b];
                    }
                }

                sum(arr, k, i, j);

                if (check(arr)) {
                    return true;
                }
            }
        }
    }

    return answer;
}
