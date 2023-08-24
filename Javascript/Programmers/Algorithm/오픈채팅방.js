function solution(record) {
    var answer = [];
    
    // userId nickname을 따로 관리하는 테이블 
    let nicknameMap = new Map();
    
    // 유저별 기록 저장
    let history = Array.from({length: record.length-1}, ()=>0);
    
    for(let i=0; i<record.length; i++) {
        [status, userId, nickname] = record[i].split(' ');
        
        // 1. Enter일 때 => [enter, userId 추가]
        if(status === 'Enter') {
            history[i] = [status, userId];
            nicknameMap.set(userId, nickname);
        }
        // 2. Leave일 때
        else if(status === 'Leave') {
            history[i] = [status, userId];
        }
        // 3. Change일 때
        else {
            nicknameMap.set(userId, nickname);
            history[i] = [status, userId];
        }
    }

    for(let i=0; i<history.length; i++) {
        if(history[i][0] === 'Change') continue;
        let text = history[i][0] === 'Enter' ? '들어왔습니다.' : '나갔습니다.';
        answer.push(`${nicknameMap.get(history[i][1])}님이 ${text}`);
    }
    
    return answer;
}