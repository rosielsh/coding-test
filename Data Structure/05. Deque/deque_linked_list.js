// 덱 양방향 연결리스트 구현
// 참조 : https://takeu.tistory.com/90

//  노드 하나 단위

class Node {
    constructor(data) {
        this.data = data; // 현재 노드의 데이터
        this.next = null; // 다음 노드
        this.prev = null; // 이전 노드
    }
}

// 덱
class Deque {
    constructor() {
        this.count = 0; // 노드의 갯수
        this.front = null; // 덱의 시작포인터
        this.rear = null; // 덱의 끝포인터
    }

    // put front
    // 데이터가 없을 때 -> front, rear에 모두 새로운 노드 삽입
    // 데이터가 있을 때 -> front를 한 칸 밀고 그 자리에 새로운 노드를 넣어 prev, next를 연결
    put_front(value) {
        const newNode = new Node(value); // 1. 노드 생성
        if(!this.front) { // 2-1. 데이터가 없을 때
            this.front = newNode; // 덱의 앞부분에 노드 대입
            this.rear = newNode; // 덱의 뒷부분에 노드 대입
        } else { // 2-2. 데이터가 존재할 때
            newNode.next = this.front; // 새로운 노드의 다음 노드 <- 현재 덱의 시작 노드
            this.front.prev = newNode; // 현재 덱의 시작 노드의 이전 노드 <- 새로운 노드
            this.front = newNode; // 덱의 시작 포인터 <- 새로운 노드
        }
        this.count++; // 노드 갯수 추가
    }

    // get_front
    // 데이터가 없을 때 -> -1을 반환
    // 데이터가 있을 때 -> 가장 앞에있는 노드 삭제 후 반환 
    get_front() {
        if(!this.front) { // 1. 데이터가 없으면
            return -1; // -1 반환
        }
        // 2. 데이터가 있을 때
        const data = this.front.data; // 현재 가장 앞에있는 노드의 데이터 받기
        this.front.prev = null; // 가장 앞에 있는 노드의 이전 정보를 없애고
        this.front = this.front.next; // 덱의 가장 앞에있는 노드의 다음 노드와 덱의 앞부분을 연결
        this.count--; // 노드 갯수 감소
        return data; // 삭제된 노드 데이터 반환
    }

    // put_rear
    // 데이터가 없을 때 -> front, rear에 모두 새로운 노드 삽입
    // 데이터가 있을 때 -> 덱의 끝 포인터에 있던 노드와 새로운 노드 연결 후, 새 노드와 덱의 끝 포인터 연결
    put_rear(value) {
        const newNode = new Node(value); // 1. 노드 생성
        if(!this.front) { // 2-1. 데이터가 없을 때
            this.front = newNode; // 덱의 front에 삽입
            this.rear = newNode; // 덱의 rear에 삽입
        } else { // 2-2. 데이터가 있을 때
            newNode.prev = this.rear; // 새로운 노드의 이전 노드 <- 현재 덱의 끝 포인터
            this.rear.next = newNode; // 현재 덱의 끝 포인터의 다음 노드 <- 새로운 노드
            this.rear = newNode; // 덱의 끝 포인터를 새로운 노드와 연결
        }
        this.count++;
    }

    // get_rear
    // 데이터가 없을 때 -> -1반환
    // 데이터가 있을 때 -> 가장 뒤에 있는 노드 삭제 후 반환
    get_rear() {
        if(!this.front) {
            return -1;
        }
        let data = this.rear.data;
        this.rear.next = null;
        this.rear = this.rear.prev;
        this.count--;
        return data;
    }

    // front()
    // 현재 시작포인터에 요소가 있으면 데이터 반환
    front_print() {
        return this.front && this.front.data;
    }

    // rear()
    // 현재 끝포인터에 요소가 있으면 데이터 반환
    rear_print() {
        return this.rear && this.rear.data;
    }

    size() {
        return this.count;
    }
}

const deque = new Deque();
deque.put_front(3);
deque.put_front(6);

// 현재 노드 상태
// front   rear
//   |      |   
//   6  ->  3 
console.log(deque.size()); // 2
console.log(deque.get_front()); // 6
console.log(deque.get_rear()); // 3

console.clear();

const deque2 = new Deque();
deque2.put_front(3);
deque2.put_front(6);
deque2.put_rear(9);
deque2.put_rear(1);

// 현재 노드 상태
// front                 rear
//   |                    |   
//   6  ->  3  ->  9  ->  1  
console.log(deque2.size()); // 4
console.log(deque2.front_print()); // 6
console.log(deque2.rear_print()); // 1

console.clear();

// --------------------------------------
deque2.get_front(); // front가 가리키는 노드 삭제
deque2.get_rear();  // rear가 가리키는 노드 삭제

// 현재 노드 상태
// front   rear
//   |      |   
//   3  ->  9 
console.log(deque2.size()); // 2
console.log(deque2.front_print()); // 3
console.log(deque2.rear_print()); // 9