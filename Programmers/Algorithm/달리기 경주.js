function solution(players, callings) {
  var answer = [];

  const rankObj = {}; // (선수, 등수)
  const playerObj = {}; // (등수, 선수)

  players.forEach((player, rank) => {
    rankObj[`${player}`] = `${rank + 1}`;
    playerObj[`${rank + 1}`] = player;
  });

  callings.forEach((call) => {
    const calledPlayerRank = rankObj[`${call}`];

    const frontPlayer = playerObj[`${calledPlayerRank - 1}`];

    rankObj[`${call}`] = String(calledPlayerRank - 1);
    rankObj[`${frontPlayer}`] = String(calledPlayerRank);

    playerObj[`${calledPlayerRank}`] = frontPlayer;
    playerObj[`${calledPlayerRank - 1}`] = call;
  });

  Object.values(playerObj).forEach((value) => {
    answer.push(value);
  });

  return answer;
}
