// 토마토

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[MNH, ...tomato] = require("fs").readFileSync(filePath).toString().trim().split("\n");
[M, N, H] = MNH.split(" ").map(Number);
tomato = tomato.map((x) => x.split(" ").map(Number));

const tomatoMatrix = [];
for (let i = 0; i < H; i++) {
  tomatoMatrix.push(tomato.splice(0, N));
}

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.rear = null;
    this.length = 0;
  }

  enqueue(data) {
    const node = new Node(data);
    if (!this.head) this.head = node;
    else this.rear.next = node;

    this.rear = node;
    this.length++;
  }

  dequeue() {
    if (!this.head) return;
    const data = this.head.data;
    this.head = this.head.next;
    this.length--;
    return data;
  }

  getLength() {
    return this.length;
  }

  getQueue() {
    return this.head;
  }
}

function isAllRipe() {
  for (let k = 0; k < H; k++) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (tomatoMatrix[k][i][j] === 0) return false;
      }
    }
  }
  return true;
}

const posY = [0, 0, -1, 1, 0, 0];
const posX = [-1, 1, 0, 0, 0, 0];
const posZ = [0, 0, 0, 0, 1, -1];
let maxDay = Number.MIN_SAFE_INTEGER;

function bfs(ripeTomato) {
  const needVisit = new Queue();
  for (let i = 0; i < ripeTomato.length; i++) {
    needVisit.enqueue(ripeTomato[i]);
  }

  while (needVisit.getLength()) {
    [curZ, curY, curX, day] = needVisit.dequeue();

    for (let i = 0; i < 6; i++) {
      adjY = curY + posY[i];
      adjX = curX + posX[i];
      adjZ = curZ + posZ[i];

      if (adjY < 0 || adjY >= N || adjX < 0 || adjX >= M || adjZ < 0 || adjZ >= H) continue;

      if (!tomatoMatrix[adjZ][adjY][adjX]) {
        tomatoMatrix[adjZ][adjY][adjX] = day + 1;
        needVisit.enqueue([adjZ, adjY, adjX, day + 1]);
        maxDay = Math.max(day + 1, maxDay);
      }
    }
  }
}

function solution() {
  if (isAllRipe()) return 0;

  let ripeTomato = [];

  for (let k = 0; k < H; k++) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (tomatoMatrix[k][i][j] === 1) ripeTomato.push([k, i, j, 0]);
      }
    }
  }

  bfs(ripeTomato);
  if (!isAllRipe()) return -1;

  return maxDay;
}

console.log(solution());
