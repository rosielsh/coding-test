// 신규 아이디 추천

function solution(new_id) {
  var answer = "";
  let newIdArr = new_id.split("");

  // 1단계
  let replacedStr = new_id.replace(/./g, (str) =>
    str === str.toUpperCase() ? str.toLowerCase() : str
  );

  // 2단계
  replacedStr = replacedStr.replace(/[^\w-._]+/g, "");

  // 3단계
  replacedStr = replacedStr.replaceAll(/\.+/g, ".");

  // 4단계
  if (replacedStr[0] === ".") replacedStr = replacedStr.substr(1);
  if (replacedStr.at(-1) === ".") replacedStr = replacedStr.substr(0, replacedStr.length - 1);

  // 5단계
  if (!replacedStr.length) replacedStr = "a";

  // 6단계
  if (replacedStr.length >= 16) replacedStr = replacedStr.substr(0, 15);
  if (replacedStr.at(-1) === ".") replacedStr = replacedStr.substr(0, replacedStr.length - 1);

  // 7단계
  if (replacedStr.length <= 2) {
    let addStr = replacedStr.at(-1);
    while (replacedStr.length < 3) {
      replacedStr += addStr;
    }
  }
  answer = replacedStr;

  return answer;
}
