function solution(p) {
    var answer = '';
    
    // 자르는 인덱스 구하는 함수 
    function calcSplitIndex(p) {
        let leftCnt = 0;
        let rightCnt = 0;
        let index = 0;

        for(let i=0; i<p.length; i++) {
            if(p[i] === '(') leftCnt++;
            else if(p[i] === ')') rightCnt++;

            if(leftCnt && leftCnt === rightCnt) {
                index = i;
                break;
            }
        }
        
        return index;
    }
    
    // 재귀
    function recursion(p, index)   {
        
        // 1. 빈 문자열이면 빈 문자열 반환
        if(!p.length) return '';
        
        // 2. u, v로 분리
        let u = p.slice(0, index+1);
        let v = p.slice(index+1);
        
        // u가 올바른 문자열인지 검사
        let stack = [];
        for(let i=0; i<u.length; i++) {
            if(u[i] === '(') stack.push('(');
            else if(u[i] === ')') stack.pop();
        }
        
        // 3. u가 올바른 괄호 문자열인 경우 
        if(!stack.length) {
            let index = calcSplitIndex(v);
            // v에 대해서 1단계부터 수행 후 수행 결과를 u에 붙이고 반환
            return u + recursion(v, index); 
        }
        
        // 4. u가 올바른 괄호 문자열이 아닌 경우 
        else {
            let index = calcSplitIndex(v);
            // 4-1 ~ 4-3
            let temp = '(' + recursion(v, index) + ')';
            
            // u의 첫, 마지막 문자 제거 후 뒤집기
            let copyU = u.slice(1, u.length-1).split('');
            for(let i=0; i<copyU.length; i++) {
                if(copyU[i] === '(') copyU[i] = ')';
                else if(copyU[i] === ')') copyU[i] = '(';
            }
            
            return temp + copyU.join('');
        }
    }

    
    let index = calcSplitIndex(p);
    answer = recursion(p, index);
    return answer;
}