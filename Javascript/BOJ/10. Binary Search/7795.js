// 먹을 것인가 먹힐 것인가

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[T, ...input] = require("fs").readFileSync(filePath).toString().trim().split("\n");

function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let mid;

  let result = 0;
  while (left <= right) {
    mid = parseInt((left + right) / 2);

    // 타겟이 현재 배열보다 클때
    if (target > arr[mid]) {
      left = mid + 1;
      result = mid;
    } else {
      right = mid - 1;
    }
  }
  return result + 1;
}

function solution() {
  let answer = [];
  for (let i = 0; i < T * 3; i += 3) {
    let totalCnt = 0;
    [aLen, bLen] = input[i].split(" ").map(Number);
    A = input[i + 1]
      .split(" ")
      .map(Number)
      .sort((a, b) => a - b);
    B = input[i + 2]
      .split(" ")
      .map(Number)
      .sort((a, b) => a - b);

    // A 전체 순회
    for (let i = 0; i < aLen; i++) {
      // B의 부분집합 중 가장 큰 것보다 A의 현재 원소가 더 클때 -> B의 모든 원소를 먹을 수 있다
      if (A[i] > B.at(-1)) {
        totalCnt += bLen;
        continue;
      }
      // B의 가장 작은 원소보다 현재 A의 원소가 같거나 작을 때 -> 그냥 반환
      else if (A[i] <= B[0]) {
        continue;
      }

      // A의 현재 원소가 B의 가장 큰 원소와 같거나 더 작을 때 -> 이분탐색을 하여 자신보다 작은 크기의 생명체가 몇 개인지 반환받기
      else {
        const result = binarySearch(B, A[i]);
        totalCnt += result;
      }
    }

    answer.push(totalCnt);
  }
  return answer.join("\n");
}

console.log(solution());
