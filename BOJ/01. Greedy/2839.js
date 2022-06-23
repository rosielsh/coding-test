// 문제 : 설탕 배달

// 입력 : 상근이가 배달해야하는 설탕 무게 N
// 출력 : 상근이가 배달해야하는 봉지의 최소 개수

// 과정
// 1. 입력받은 무게 저장
// 2. 5kg로 나눠서 나머지가 0인지 확인
// 3. 안나눠지면 입력값에서 -3씩 해주고 5kg로 나눠지는지 확인
// 4. 입력값이 음수가 되면 나눠질수 없다는 의미이므로 -1 출력

let input = +require('fs').readFileSync('input.txt').toString();
let fiveCnt = 0;
let threeCnt = 0;

while (1) {
    fiveCnt = parseInt(input / 5);
    if (input % 5 === 0) { // 바로 5로 나눠짐
        console.log(fiveCnt+threeCnt);
        break;
    } 
    input -= 3;
    if(input < 0){
        console.log(-1);
        break;
    }
    threeCnt++;
}
    