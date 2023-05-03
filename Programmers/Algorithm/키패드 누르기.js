// 키패드 누르기

function solution(numbers, hand) {
    // 0 1 2 3 4 5 6 7 8 9 *(10) #(11)
    const pos = [[3, 1], [0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2], [3, 0], [3, 2]];

    var answer = '';
    
    let leftPos = pos[10];
    let rightPos = pos[11];
    
    const leftNum = [1, 4, 7];
    const rightNum = [3, 6, 9];
    
    numbers.forEach((number) => {
        if(leftNum.includes(number)) {
            answer += 'L';
            leftPos = pos[number];
        }
        else if(rightNum.includes(number)) {
            answer += 'R';
            rightPos = pos[number];
        }
        // 중간 열을 눌러야 할 때
        else {
            // 왼/오른쪽 손과의 거리 구하기 
            const leftLen = Math.abs(pos[number][0] - leftPos[0]) + Math.abs(pos[number][1] - leftPos[1]);
            const rightLen = Math.abs(pos[number][0] - rightPos[0]) + Math.abs(pos[number][1] - rightPos[1]);
            
            // 두 손까지의 거리가 같으면
            if(leftLen === rightLen) {
                if(hand === 'left') {
                    answer += 'L';
                    leftPos = pos[number];
                } else {
                    answer += 'R';
                    rightPos = pos[number];
                }
            } 
            else {
                if(leftLen < rightLen) {
                    answer += 'L';
                    leftPos = pos[number];
                } else {
                   answer += 'R';
                   rightPos = pos[number]; 
                }
            }
        }
    })
    return answer;
}