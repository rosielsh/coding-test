function solution(m, n, board) {
    
    // 프렌즈4블록
    // 같은 모양의 블록이 2x2 형태로 붙어있을 경우 사라지면서 점수를 얻는 게임
    
    // 입력
    // m : 행, n : 열, board : 게임 판
    
    // 출력
    // 지워지는 블록의 개수
    
    var answer = 0;
    const copyBoard = board.map(v=>[...v]);
    
    function isSame(y, x) {
        let std = copyBoard[y][x];
        for(let i=y; i<y+2; i++) {
            for(let j=x; j<x+2; j++) {
                // 하나라도 다르면 0 반환
                if(copyBoard[i][j] !== std) return 0;
            }
        }
        
        // 현재 위치에서 2x2 배열이 모두 같으면 1 반환
        return 1;
    }
    
    function removeBlock(pos) {
        for(let i=0; i<pos.length; i++) {
            [y, x] = pos[i];
            
            for(let j=y; j<y+2; j++) {
                for(let k=x; k<x+2; k++) {
                    copyBoard[j][k] = 0;
                }
            }
        }
    }
    
    
    // 블록 재이동 
    function moveBoard() {
        let isContinue = true;
        while(isContinue) {
            isContinue = false;
            for(let i=0; i<m-1; i++) { // 행
                for(let j=0; j<n; j++) { // 열
                    if(!copyBoard[i+1][j] && copyBoard[i][j] !== 0) {
                        isContinue = true;
                        copyBoard[i+1][j] = copyBoard[i][j];
                        copyBoard[i][j] = 0;
                    }
                }
            }
        }
    }
    
    function calcRemovedBlock() {
        let cnt = 0;
        for(let i=0; i<m; i++) {
            for(let j=0; j<n; j++) {
                if(copyBoard[i][j] === 0) cnt++;
            }
        }
        return cnt;
    }
    
    
    while(1) {
        let isContinue = false;
        
        // 사라지는 블록의 시작 좌표들
        let samePos = [];
        // 2x2 틀을 가지고 완탐
        for(let i=0; i<m-1; i++) {
            for(let j=0; j<n-1; j++) {
                if(!copyBoard[i][j]) continue; // board가 0이면: 없는 공간
                
                // 시뮬레이션 결과 성공한 갯수가 1개라도 있으면
                let result = isSame(i, j);
                if(result) {
                    if(copyBoard[i][j].charCodeAt(0) >= 65 && copyBoard[i][j].charCodeAt(0) <= 90) {
                        samePos.push([i, j]);
                        isContinue = true;
                    }
                }
            }
        }

        // 완탐 1번이 끝나고 isContinue가 true이면 계속, false이면 break
        if(isContinue) {
            // 빈 블록으로 만들어주고
            removeBlock(samePos);
            // 블록 재 이동
            moveBoard();
        } else break;
    }
    
    answer = calcRemovedBlock();
    return answer;
}