function solution(numbers) {
    var answer = 0;
    const numArr = numbers.split('').map(Number);
    
    const result = [];
    const visited = Array.from({length: numArr.length}, ()=>0);
    
    function isPrime() {
        const num = +result.join('');
        if(num === 1) return false;
        
        for(let i=2; i<=Math.sqrt(num); i++) {
            if(num % i === 0) return false;
        }
        return true;
    }
    
    const primeSet = new Set();
    
    function permutation(depth) {
        if(depth === numArr.length+1) {
            return;
        }
        
        if(result.length && isPrime()) {
            primeSet.add(result.join(''));
        }
        
        for(let i=0; i<numArr.length; i++) {
            if(visited[i]) continue;
            if(!numArr[i] && !depth) continue;
            visited[i] = 1;
            result.push(numArr[i]);
            permutation(depth+1);
            result.pop();
            visited[i] = 0;
        }
    }
    
    permutation(0);
    answer = primeSet.size;
    
    return answer;
}