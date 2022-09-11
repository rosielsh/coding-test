// 문제 : 괄호의 값 (2504)

// 입력 : 괄호열을 나타내는 문자열 (1 이상 30 이하)
// 출력 : 괄호열을 나타내는 정수 / 입력이 올바르지 못하면 0 출력

// 과정
// 1. 입력값을 하나씩 끊어서 스택에 저장하고 비교하면서 로직 수행
// 2. [ , ( 일때는 무조건 스택에 저장하고
// 3. ] , ) 일때는 스택의 최상단에 어떤 원소가 있는지에 따라서 다른 로직 수행
// 4. 출력하기 전에 테스트 케이스에 따른 예외처리 

// str : (()[[]])([])
const { exit } = require('process');
const input = require('fs').readFileSync('input.txt').toString().split('\n');
const str = input[0].split('');

// logic
function solution(str) {
    const stack = [];

    for(let i = 0; i<str.length; i++) {
        if (stack.length === 0 && (str[i] === ']' || str[i] === ')')) {
            console.log(0);
            exit();
        }
        
        if(str[i] === '(' || str[i] === '[') {
            stack.push(str[i]);
        }
        else if(str[i] === ')'){
            const p = stack.at(-1);
            if(p === '(') {
                stack.pop();
                stack.push(2);
            }
            else if(stack.at(-2) === '(' && p !== '[') {
                stack.pop();
                stack.pop();
                stack.push(p*2);
            }
            else {
                console.log(0);
                exit();
            }
        }
        else if(str[i] === ']'){
            const p = stack.at(-1);
            if(p === '[') {
                stack.pop();
                stack.push(3);
            }
            else if(stack.at(-2) === '[' && p !== '(') {
                stack.pop();
                stack.pop();
                stack.push(p*3);
            }
            else {
                console.log(0);
                exit();
            }
        } 

        if(typeof stack.at(-1) === 'number' && typeof stack.at(-2) === 'number') {
            stack.push(stack.pop()+stack.pop());
        }
    }

    if(stack.length !== 1 || typeof stack[0] !== 'number') {
        console.log(0);
        exit();
    }
    console.log(+stack);
}


solution(str);