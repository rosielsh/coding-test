// 2048(easy)

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[N, ...board] = require('fs').readFileSync(filePath).toString().trim().split('\n');
N = +N;
board = board.map(x=>x.split(' ').map(Number));
let maxValue = Number.MIN_SAFE_INTEGER;

function moveNext(direction) {
    if(direction === 0) {
        moveLeft();
    } else if(direction === 1) {
        moveRight();
    } else if(direction === 2) {
        moveUp();
    } else {
        moveDown();
    }
}

function moveLeft() {
    for(let i=0; i<N; i++) {
        let pointer = 0;
        for(let j=1; j<N; j++) {
            if(board[i][j]) {
                let cur = board[i][j]; // 현재 값 저장
                board[i][j] = 0;
                if(!board[i][pointer]) { // pointer가 가리키는 값이 0일때 
                    board[i][pointer] = cur;
                } else if(board[i][pointer] === cur) { // pointer과 current가 같을때
                    board[i][pointer] *= 2;
                    pointer += 1;
                } else { // pointer과 current가 다를때
                    pointer += 1;
                    board[i][pointer] = cur;
                }
            }
        }
    }
    return;
}

function moveRight() {
    for(let i=0; i<N; i++) {
        let pointer = N-1;
        for(let j=N-2; j>=0; j--) {
            if(board[i][j]) {
                let cur = board[i][j];
                board[i][j] = 0;

                if(!board[i][pointer]) {
                    board[i][pointer] = cur;
                } else if(board[i][pointer] === cur) {
                    board[i][pointer] *= 2;
                    pointer -= 1;
                } else {
                    pointer -= 1;
                    board[i][pointer] = cur;
                }
            }
        }
    }
    return;
}

function moveUp() {
    for(let j=0; j<N; j++) {
        let pointer = 0;
        for(let i=1; i<N; i++) {
            if(board[i][j]) {
                let cur = board[i][j]; 
                board[i][j] = 0;
                if(!board[pointer][j]) { 
                    board[pointer][j] = cur;
                } else if(board[pointer][j] === cur) { 
                    board[pointer][j] *= 2;
                    pointer += 1;
                } else { 
                    pointer += 1;
                    board[pointer][j] = cur;
                }
            }
        }
    }
    return;
}

function moveDown() {
    for(let j=0; j<N; j++) {
        let pointer = N-1;
        for(let i=N-2; i>=0; i--) {
            if(board[i][j]) {
                let cur = board[i][j]; 
                board[i][j] = 0;
                if(!board[pointer][j]) { 
                    board[pointer][j] = cur;
                } else if(board[pointer][j] === cur) { 
                    board[pointer][j] *= 2;
                    pointer -= 1;
                } else { 
                    pointer -= 1;
                    board[pointer][j] = cur;
                }
            }
        }
    }
    return;
}

function dfs(cnt) {
    if(cnt === 5) { // dfs 5번 다 돌리면 종료
        return;
    }   

    // 현재 cnt에서의 board 상태 저장 
    const copyBoard = board.map(x=>[...x]);

    for(let i=0; i<4; i++) {
        // 움직이고 
        moveNext(i); 
        
        // 최댓값 갱신
        for(let i=0; i<N; i++) {
            for(let j=0; j<N; j++) {
                maxValue = Math.max(maxValue, board[i][j]);
            }
        }

        // 다음 방향
        dfs(cnt+1);

        // board는 전역으로 관리하기 때문에 해당 cnt에서의 상태 유지 
        board = copyBoard.map(x=>[...x]);
    }
    
}

dfs(0);
console.log(maxValue);

