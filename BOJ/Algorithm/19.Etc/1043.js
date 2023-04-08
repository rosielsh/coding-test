const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[NM, truePerson, ...participant] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");
[N, M] = NM.split(" ").map(Number);
truePerson = truePerson.split(" ").map(Number);
participant = participant.map((x) => x.split(" ").map(Number));

// 진실을 아는 사람이 없으면 -> 모든 파티 참여 가능
if (!truePerson[0]) {
  console.log(M);
  return;
}

let parent = Array.from({ length: N + 1 }, (_, idx) => idx);

function find(x) {
  if (parent[x] === x) return x;
  return (parent[x] = find(parent[x]));
}

function union(currentParticipant) {
  const p1 = find(currentParticipant[0]);
  for (let i = 1; i < currentParticipant.length; i++) {
    const p2 = find(currentParticipant[i]);
    if (p1 < p2) parent[p2] = p1;
    else parent[p1] = p2;
  }
}

function solution() {
  let answer = 0;

  // 전체 순회하면서 부모값 갱신
  for (let i = 0; i < M; i++) {
    currentParticipant = participant[i].slice(1);
    if (currentParticipant.length === 1) continue;
    union(currentParticipant); // 파티에 2명이상 참가한 경우
  }

  for (let i = 0; i < M; i++) {
    let hasTruePerson = false;
    currentParticipant = participant[i].slice(1);

    // currentParticipant : 한 파티당 참석자 번호
    for (let j = 0; j < currentParticipant.length; j++) {
      for (let k = 1; k <= truePerson[0]; k++) {
        if (find(truePerson[k]) === find(currentParticipant[j])) {
          hasTruePerson = true;
          break;
        }
      }
    }

    if (!hasTruePerson) answer++;
  }

  return answer;
}

console.log(solution());
