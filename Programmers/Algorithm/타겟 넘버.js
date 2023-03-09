function solution(numbers, target) {
    var answer = 0;
    
    function dfs(idx, sum) {
        if(idx === numbers.length) {
            if(sum === target) answer++;
            return;
        }
        
        dfs(idx+1, sum + numbers[idx]); // +연산
        dfs(idx+1, sum - numbers[idx]); // -연산
    }
    
    dfs(0, 0);
    return answer;
}