function solution(park, routes) {
  var answer = [];

  const h = park.length;
  const w = park[0].length;

  let dogX = -1;
  let dogY = -1;

  park.forEach((row, i) => {
    row.split("").forEach((ele, j) => {
      if (ele === "S") {
        dogX = i;
        dogY = j;
      }
    });
  });

  let nextX = dogX; // 행
  let nextY = dogY; // 열

  for (let i = 0; i < routes.length; i++) {
    let [direction, distance] = routes[i].split(" ");
    distance = Number(distance);

    let isContinue = true;
    nextX = dogX;
    nextY = dogY;

    while (distance > 0) {
      if (direction === "E") nextY += 1;
      else if (direction === "W") nextY -= 1;
      else if (direction === "S") nextX += 1;
      else if (direction === "N") nextX -= 1;

      if (nextX < 0 || nextX >= h || nextY < 0 || nextY >= w || park[nextX][nextY] === "X") {
        isContinue = false;
        break;
      }

      distance--;
    }

    if (isContinue) {
      dogX = nextX;
      dogY = nextY;
    }
  }

  answer = [dogX, dogY];
  return answer;
}
