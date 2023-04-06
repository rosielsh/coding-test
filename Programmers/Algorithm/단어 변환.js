function solution(begin, target, words) {
  var answer = 0;

  function bfs() {
    const queue = [[target, 0]];
    const visited = Array.from({ length: words.length }, () => 0);
    visited[words.indexOf(target)] = 1;

    while (queue.length) {
      [currentWord, cnt] = queue.shift();

      let beginSameCnt = 0;
      for (let k = 0; k < currentWord.length; k++) {
        if (currentWord[k] === begin[k]) beginSameCnt++;
      }

      if (beginSameCnt === currentWord.length - 1) return cnt + 1;

      for (let i = 0; i < words.length; i++) {
        let sameCnt = 0;
        for (let j = 0; j < currentWord.length; j++) {
          if (currentWord[j] === words[i][j]) sameCnt++;
        }

        if (!visited[i] && sameCnt === currentWord.length - 1) {
          visited[i] = 1;
          queue.push([words[i], cnt + 1]);
        }
      }
    }
  }

  if (!words.includes(target)) return 0;
  answer = bfs();
  return answer;
}
