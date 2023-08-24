// 텀 프로젝트

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [T, ...input] = require("fs").readFileSync(filePath).toString().trim().split("\n");

let studentNum;
let visited;

function dfs(x) {
  const stack = [[x, 0]];
  const team = [x];

  while (stack.length) {
    const [curNode, stdCnt] = stack.pop();
    const nextNode = studentNum[curNode];

    // 이미 방문한 노드 중에 사이클인지 검사
    if (visited[nextNode]) {
      if (team.includes(nextNode)) {
        const headIndex = team.indexOf(nextNode);
        return team.length - headIndex;
      }
      continue;
    }

    visited[nextNode] = 1;
    team.push(nextNode);
    stack.push([nextNode, stdCnt + 1]);
  }

  return 0;
}

function solution() {
  let answer = [];
  let includeTeamCnt;
  for (let i = 0; i < T * 2; i += 2) {
    includeTeamCnt = 0;
    const n = Number(input[i]);
    studentNum = input[i + 1].split(" ").map(Number);
    studentNum.unshift(0);

    visited = Array.from({ length: n + 1 }, () => 0);

    // 혼자 팀하는 경우
    for (let j = 1; j <= n; j++) {
      if (studentNum[j] === j) {
        includeTeamCnt += 1;
        visited[j] = 1;
      }
    }

    for (let std = 1; std <= n; std++) {
      if (visited[std]) continue;
      visited[std] = 1;
      const result = dfs(std);
      includeTeamCnt += result;
    }

    answer.push(n - includeTeamCnt);
  }
  return answer.join("\n");
}

console.log(solution());
