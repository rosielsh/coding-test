function solution(numbers) {
    var answer = [];
    
    // f(x) : x보다 크고 x와 비트가 1-2개 다른 수 중 제일 작은 수

    // f(2) = 0010 => 0011(3)
    // f(3) = 0011 => 0101(5) 
    // f(4) = 0100 => 0101(5)
    // f(5) = 0101 => 0110(6)
    // f(6) = 0110 => 0111(7)
    // f(7) = 0111 => 1011(11)
    // f(8) = 1000 => 1001(9)
    
    function calcFx(number) {
        // 짝수인 경우
        if(number % 2 === 0) return number+1;
        
        // 홀수인 경우
        // 끝에서부터 가장 먼저 나오는 0을 찾고
        // 1로 변경 후 뒷자리를 0으로 변경
        const binary = number.toString(2);
        const len = binary.length;
        let idx = 0;
        let zeroIdx = 0;
        const newBinary = [...binary];
        while(1) {
            if(len-1-idx < 0) {
                zeroIdx = -1;
                break;
            }
            if(binary[len-1-idx] === '0') {
                zeroIdx = len-1-idx;
                break;
            }
            idx++;
        }
        
        if(zeroIdx === -1) {
            newBinary.shift();
            newBinary.unshift('0');
            newBinary.unshift('1');
        }
        else {
            newBinary[zeroIdx] = '1';
            newBinary[zeroIdx+1] = '0';
        }
        
        return parseInt(newBinary.join(''), 2);
    }
    
    for(let i=0; i<numbers.length; i++) {
        currentNumber = numbers[i];
        answer.push(calcFx(currentNumber));
    }
    return answer;
}