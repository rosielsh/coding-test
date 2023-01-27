// class로 queue 구현

class Queue {

    // 초기 큐의 값 선언
    constructor() {
        this.storage = {}; // 값을 저장할 객체
        this.front = 0; // 첫 원소를 가리키는 포인터
        this.rear = 0; // 마지막 원소를 가리키는 포인터
    }

    // 크기 구하기
    // -> 투 포인터를 사용하는 방식
    size() {
        // rear이 가리키는 값이 없을 때가 아무 데이터가 없는 경우임.
        if(this.storage[this.rear] === undefined) return 0;
        else return this.rear + 1 - this.front;  
    }

    // push
    push(item) {
        // 원소가 없으면 key를 '0'으로하는 프로퍼티 추가
        if(!this.size()) this.storage['0'] = item;
        // 원소가 존재하면
        else this.storage[++this.rear] = item;
    }

    // shift
    shift() {
        let temp; // 가장 앞의 원소 저장
        
        // 데이터가 1개 남은 경우 
        // shift를 하면 데이터가 없게 되므로 front, shift 둘다 0으로 초기화
        if(this.front === this.rear) {
            temp = this.storage[this.front];
            delete this.storage[this.front];
            this.front = 0;
            this.rear = 0;
        } 
        // 
        else {
            temp = this.storage[this.front];
            delete this.storage[this.front];
            this.front += 1;
        }
        return temp;
    }

    get() {
        return this.storage;
    }
}

const queue = new Queue();
queue.push(3);
queue.push(2);
queue.push(5);
queue.shift();
console.log(queue.get());