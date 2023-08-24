function solution(fees, records) {
    var answer = [];
    
    // 시간을 분단위로 계산하는 함수
    function calcTime(timeA, timeB) {
        const [aHour, aMin] = timeA.split(':').map(Number);
        const [bHour, bMin] = timeB.split(':').map(Number);
        
        // B시간이 더 크면 
        if(aHour < bHour || aHour === bHour && aMin < bMin) return;
        
        // 같은 시간이면 분 return
        if(aHour === bHour) {
            return aMin - bMin;
        } else {
            return (aHour - bHour)*60 + (aMin-bMin);
        }
    }
    
    // 전체 시간을 계산하는 함수
    function calcTotalTime(history) {
        let totalTime = 0;
        // 내역이 홀수개이면 마지막에 입차기록 하나까지 포함
        if(history.length % 2 === 1) {
            for(let i=0; i<history.length-1; i+=2) {
                totalTime += calcTime(history[i+1][0], history[i][0]);
            }
            totalTime += calcTime('23:59', history[history.length-1][0]);
        } 
        // 내역이 짝수개이면 2씩 더하면서 시간 카운트
        else {
            for(let i=0; i<history.length; i+=2) {
                totalTime += calcTime(history[i+1][0], history[i][0]);
            }
        }
        return totalTime;
    }
    
    // 기본 시간, 기본 요금, 단위 시간, 단위 요금
    [basicTime, basicFee, unitTime, unitFee] = fees;
    
    // 전체 요금을 계산하는 함수
    function calcTotalFee(time) {
        // 기본 시간보다 적게 썼으면
        if(time < basicTime) {
            return basicFee;
        } 
        // 기본 시간보다 많이 썼으면 
        else {
            let sub = time - basicTime;
            return basicFee + Math.ceil(sub/unitTime) * unitFee;
        }
    }

    // ---------------- record 정렬 및 가공 --------------------------
    
    // records를 차량 번호가 작은 순으로 정렬
    records.sort((a, b) => {
        const carA = a.split(' ')[1];
        const carB = b.split(' ')[1];
        
        return carA - carB;
    })
    
    // 배열로 split
    records = records.map(x=>x.split(' '));
    
    // ---------------------------------------------------------------
    
    // ----------------- 전체 기록을 차량끼리 분리 -------------------

    // 스택에 계속해서 담으면서 같은 차량끼리 분리
    let stack = [records[0]];
    // 현재 기준 차량 번호
    let stdCar = records[0][1];
    // 기록을 가리키는 인덱스
    let idx = 1;
    // 전체 기록을 담는 변수 
    const totalHistory = [];
    
    while(idx < records.length) {
        // 현재 기준 입출력기록과 차량번호가 다르면
        if(records[idx][1] !== stdCar) {
            stdCar = records[idx][1];
            totalHistory.push(stack);
            stack = [records[idx]];
        } else {
            stack.push(records[idx]);
        }
        idx++;
    }
    
    // 남은 기록은 전체 스택에 push
    totalHistory.push(stack);
    
    // -------------------------------------------------------------
    
    // ---------------------- 전체 차량 순회 -----------------------

    for(let i=0; i<totalHistory.length; i++) {
        // 하나의 차량 순회
        history = totalHistory[i];
        // 하나의 차량 요금 계산
        let time = calcTotalTime(history);
        // 해당 시간 별 요금 계산
        let fee = calcTotalFee(time);
        answer.push(fee);
    }
    // -------------------------------------------------------------
    
    return answer;
}