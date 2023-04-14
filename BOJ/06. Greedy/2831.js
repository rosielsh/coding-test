// 댄스 파티 => 실패

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[N, male, female] = require("fs").readFileSync(filePath).toString().trim().split("\n");
N = +N;
male = male
  .split(" ")
  .map(Number)
  .sort((a, b) => Math.abs(a) - Math.abs(b));
female = female
  .split(" ")
  .map(Number)
  .sort((a, b) => Math.abs(a) - Math.abs(b));

// 남자 N명, 여자 N명이서 파티 진행
// 남자 - 여자 서로 같은 키는 춤을 출 수 없다

// 입력
// N : 남 녀의 수
// 남자의 키 (mm 단위)
// 여자의 키 (mm 단위)

// 키가 양수 : 자신보다 키 큰 사람을 선호
// 키가 음수 : 자신보다 키가 작은 사람을 선호

// O(n^2)까지 안갈려면 dp나 그리디로 풀어야하는디...

function searchPositive(maleHeight) {
  let left = 0;
  let right = N - 1;
  let mid;

  // target : 절댓값이 maleHeight보다 크고, 음수인 여자
  while (left <= right) {
    mid = parseInt((left + right) / 2);

    if (Math.abs(female[mid]) < maleHeight) {
      right = mid - 1;
    } else if (Math.abs(female[mid]) > maleHeight) {
      left = mid + 1;
    }
  }

  console.log("키", maleHeight, left, mid, right);
}

function searchNegative(maleHeight) {
  let left = 0;
  let right = N - 1;
  let mid;

  // target : 절댓값이 maleHeight보다 크고, 음수인 여자
  while (left <= right) {
    mid = parseInt((left + right) / 2);

    if (Math.abs(female[mid]) < maleHeight) {
      right = mid - 1;
    } else if (Math.abs(female[mid]) > maleHeight) {
      left = mid + 1;
    }
  }

  console.log("키", maleHeight, left, mid, right);
}

function solution() {
  let answer;

  for (let i = 0; i < N; i++) {
    maleHeight = male[i];

    if (maleHeight > 0) searchPositive(maleHeight);
    else if (maleHeight < 0) searchNegative(maleHeight);
  }

  return answer;
}

console.log(solution());
