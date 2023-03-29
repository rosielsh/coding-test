function solution(x, y, n) {
  // y -> x로의 연산
  // 1. y에 n을 빼기
  // 2. y에 2를 나누기
  // 3, y에 3을 나누기

  let minValue = Number.MAX_SAFE_INTEGER;

  function bfs() {
    const queue = [[y, 0]];
    const visited = Array.from({ length: y + 1 }, () => 0);
    visited[y] = 0;

    while (queue.length) {
      [current, cnt] = queue.shift();

      if (current === x) {
        minValue = Math.min(minValue, cnt);
      }

      if (current % 3 === 0 && current / 3 >= x && !visited[current / 3]) {
        queue.push([current / 3, cnt + 1]);
        visited[current / 3] = 1;
      }

      if (current % 2 === 0 && current / 2 >= x && !visited[current / 2]) {
        queue.push([current / 2, cnt + 1]);
        visited[current / 2] = 1;
      }

      if (current - n >= x && !visited[current - n]) {
        queue.push([current - n, cnt + 1]);
        visited[current - n] = 1;
      }
    }
  }

  var answer = -1;
  bfs();
  answer = minValue === Number.MAX_SAFE_INTEGER ? -1 : minValue;
  return answer;
}
