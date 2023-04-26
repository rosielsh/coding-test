function solution(s) {
  var answer = 0;

  let minLen = Number.MAX_SAFE_INTEGER;
  let arr = [];

  if (s.length === 1) return 1;

  for (let len = 1; len < s.length; len++) {
    arr = [];
    for (let i = 0; i < s.length; i += len) {
      const subStr = s.substr(i, len);
      if (arr.length === 0) arr.push([subStr, 1]);
      else {
        if (arr.at(-1)[0] === subStr) {
          arr.push([subStr, arr.pop()[1] + 1]);
        } else {
          arr.push([subStr, 1]);
        }
      }
    }

    let resultStr = "";
    arr.forEach(([str, cnt]) => {
      if (cnt === 1) resultStr += `${str}`;
      else resultStr += `${cnt}${str}`;
    });
    minLen = Math.min(minLen, resultStr.length);
  }

  answer = minLen;
  return answer;
}
