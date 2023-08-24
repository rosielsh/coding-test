function solution(n, t, m, p) {
  // n진수 게임
  // 튜브가 n진수 게임을 진행할 때 결과값 출력

  // 1부터 커지면서 숫자를 주어진 진법으로 변환한다.
  // 전체 결과를 뒤에 이어 붙이면서 길ㅇ이가 t x m이 되면 종료한다.

  var answer = "";
  let result = "";

  let num = 0;
  while (result.length < t * m + p) {
    result += (num++).toString(n);
  }

  let tubeResult = "";
  let index = 0;
  for (let i = p - 1; i < result.length; i += m) {
    tubeResult += result[i].toUpperCase();
    if (tubeResult.length === t) break;
  }

  answer = tubeResult;
  return answer;
}
