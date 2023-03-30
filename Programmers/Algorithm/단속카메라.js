function solution(routes) {
  var answer = 0;
  routes.sort((a, b) => a[1] - b[1]);
  // console.log(routes);

  let cameraLoc = -30001;
  // 모든 차량 순회
  for (let i = 0; i < routes.length; i++) {
    let [inLoc, outLoc] = routes[i];
    // 현재 카메라 위치가 현재 차량의 진입 지점보다 좌표가 작을 때
    if (cameraLoc < inLoc) {
      // 카메라를 현재 차량의 진출 지점으로 설정
      cameraLoc = outLoc;
      // 카메라 개수 추가
      answer++;
    }
  }
  return answer;
}
