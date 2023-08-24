function solution(n, times) {
  var answer = 0;
  // 이분탐색
  let left = 1;
  let right = Math.max(...times) * n;

  while (left <= right) {
    mid = Math.floor((left + right) / 2);

    let people = 0;
    for (let i = 0; i < times.length; i++) {
      people += Math.floor(mid / times[i]);

      if (people > n) break;
    }

    if (people < n) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  answer = left;
  return answer;
}
