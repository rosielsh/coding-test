function solution(n, stations, w) {
  var answer = 0;

  const passedApart = [];
  stations.forEach((station) => {
    passedApart.push([station - w, station + w]);
  });

  const tempLenArr = [];
  if (passedApart[0][0] > 1) {
    let firstLen = passedApart[0][0] - 1;
    tempLenArr.push(firstLen);
  }

  for (let i = 0; i < passedApart.length - 1; i++) {
    let midLen = passedApart[i + 1][0] - 1 - passedApart[i][1];
    tempLenArr.push(midLen);
  }

  if (passedApart.at(-1)[1] <= n) {
    let lastLen = n - passedApart.at(-1)[1];
    tempLenArr.push(lastLen);
  }

  tempLenArr.forEach((len) => {
    answer += Math.ceil(len / (w * 2 + 1));
  });

  return answer;
}
