function solution(today, terms, privacies) {
  var answer = [];

  const todayArr = today.split(".").map(Number);
  const Today = todayArr[0] * 12 * 28 + todayArr[1] * 28 + todayArr[2];

  const termObj = {};
  terms.forEach((term) => {
    const [type, month] = term.split(" ");

    termObj[`${type}`] = month;
  });

  privacies.forEach((privacy, idx) => {
    let [end, type] = privacy.split(" ");

    end = end.split(".").map(Number);

    const endDate = end[0] * 12 * 28 + end[1] * 28 + end[2] + termObj[`${type}`] * 28;

    if (Today >= endDate) answer.push(idx + 1);
  });

  return answer;
}
