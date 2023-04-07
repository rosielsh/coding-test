// 골드바흐의 추측

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[T, ...numbers] = require("fs").readFileSync(filePath).toString().trim().split("\n");
T = +T;
numbers = numbers.map(Number);

function thieve(num) {
  const isPrime = Array.from({ length: num + 1 }, () => true);

  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (!isPrime[i]) continue;

    for (let j = i * 2; j <= num; j += i) {
      if (isPrime[j]) isPrime[j] = false;
    }
  }

  return isPrime;
}

function solution() {
  let answer = [];

  const maxNum = Math.max(...numbers);
  const prime = thieve(maxNum);

  for (let i = 0; i < T; i++) {
    const currentNum = numbers[i];
    for (let j = parseInt(currentNum / 2); j >= 2; j--) {
      if (prime[j] && prime[currentNum - j]) {
        // 두 수 모두 소수이면
        answer.push([j, currentNum - j]);
        break;
      }
    }
  }

  return answer.map((x) => x.join(" ")).join("\n");
}

console.log(solution());
