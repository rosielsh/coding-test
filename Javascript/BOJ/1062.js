// 가르침

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [NK, ...words] = require("fs").readFileSync(filePath).toString().trim().split("\n");
let [N, K] = NK.split(" ").map(Number);
words = words.map((x) => x.replace(/a|n|t|i|c|\r/g, ""));

const set = new Set();
words.forEach((word) => {
  word.split("").forEach((alphabet) => {
    set.add(alphabet);
  });
});

const possibleAlphabet = [...set];
const readableAlp = Array.from({ length: 26 }, () => 0);

function calcReadableWord() {
  let readableWordCnt = 0;
  let isReadable;
  words.forEach((word) => {
    isReadable = true;
    for (let i = 0; i < word.length; i++) {
      if (!readableAlp[word[i].charCodeAt(0) - 97]) {
        isReadable = false;
        break;
      }
    }

    if (isReadable) readableWordCnt++;
  });
  return readableWordCnt;
}

let maxCnt = Number.MIN_SAFE_INTEGER;

// K개의 조합을 찾아 쓸 수 있는 알파벳으로 체크
function combination(depth, index) {
  if (depth === K) {
    maxCnt = Math.max(maxCnt, calcReadableWord());
    return;
  }

  for (let i = index; i < possibleAlphabet.length; i++) {
    const currentAlphaAscii = possibleAlphabet[i].charCodeAt(0) - 97;
    readableAlp[currentAlphaAscii] = 1;
    combination(depth + 1, i + 1);
    readableAlp[currentAlphaAscii] = 0;
  }
}

function solution() {
  let answer;
  if (K < 5) return 0;
  if (K === 26) return N;

  K -= 5;

  if (K > possibleAlphabet.length) K = possibleAlphabet.length;

  if (possibleAlphabet.length === 0) return N;

  combination(0, 0);

  answer = maxCnt;
  return answer;
}

console.log(solution());
