function solution(number, k) {
    var answer = '';
    const n = number.length;
    const arr = number.split('');
    
    let cnt = 0;
    for(let i=0; i<n-1; i++) {
        if(+arr[i] < +arr[i+1]) {
            let ptr = i;
            while(ptr >= 0 && cnt < k && +arr[ptr] < +arr[i+1]) {
                if(arr[ptr] === '') {
                    ptr--;
                    continue;
                }
                
                cnt++;
                arr[ptr] = '';
                ptr--;
            }
        }
        
        if(cnt >= k) break;
    }
    
    if(cnt < k) {
        // 남은 제거 횟수
        let left = k-cnt;
        
        for(let i=n-1; i>=0; i--) {
            if(arr[i] === '') continue;
            arr[i] = '';
            left--;
            
            if(left === 0) break;
        }
    }
    
    answer = arr.join('');
    return answer;
}