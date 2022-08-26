// 문제 : 보석 도둑

// 입력 : 보석 개수, 가방 개수 + 각각의 정보
// 출력 : 보석 가격의 합의 최댓값

// 과정
// 1. 입력받기 
// 2. 보석은 가격 기준으로 내림차순, 가방은 최대무게 기준 오름차순 정렬
// 3. 첫 번째 보석 선택 후 가방을 순차적으로 탐색하며 넣을 수 있는지 확인
// 4. 안넣어지면 다음 보석 선택
// 5. 넣어진 보석의 가격의 합 출력

const input = require('fs').readFileSync("input.txt").toString().split('\n');

const [cnt, ...val] = input;
const [N, K] = cnt.split(' ');
let jewel = [];
let bag = [];

// 입력 정제
for (let i = 0; i<val.length; i++) {
    if(i>=N){
        bag.push(Number(val[i]));
    }else{
        jewel.push(val[i].split(' ').map((e) => Number(e)));
    }
}

// N_val은 2번 인덱스 기준으로 내림차순 정렬
// K_val은 오름차순 정렬
jewel.sort((a, b) => {
    if (a[1] === b[1]) {
        return a[0] - b[0] // 가격이 같으면 무게 오름차순
    } else {
        return b[1] - a[1];
    }
});
bag.sort((a, b) => a - b);

const delBag = (arr, val) => {
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] === val) {
            arr.splice(i, 1);
            i--;
            break;
        }
    }
}

// 만약 첫번째 선택한 보석의 무게가 첫번째 가방에 들어간다면
let sum = 0;
outerFor : for(let i = 0; i<jewel.length; i++) {
    innerFor : for (let j = 0; j<bag.length; j++) {
        if(jewel[i][0] > bag[j]) continue;
        else {
            sum += jewel[i][1];
            delBag(bag, bag[j]);
            break innerFor;
        }
    }
}

console.log(sum);