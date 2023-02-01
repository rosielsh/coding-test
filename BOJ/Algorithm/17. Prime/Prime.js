// 1. 2-N까지 모든 정수로 나누었을 때 나누어 떨어지는지 확인
function isPrime01(n) {
  if (n === 1) return false;
  for (let i = 2; i < n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

console.log(isPrime01(1));
console.log(isPrime01(2));
console.log(isPrime01(3));
console.log(isPrime01(4));

console.clear();

// 2. n의 제곱근까지만 계산하기
function isPrime02(n) {
  if (n === 1) return false;
  for (let i = 2; i <= Math.floor(Math.sqrt(n)); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

console.log(isPrime02(1));
console.log(isPrime02(2));
console.log(isPrime02(3));
console.log(isPrime02(4));

console.clear();

// 3. 에라토스테네스의 체
// 1-N까지의 수 중에서 여러개의 소수를 한꺼번에 판별하고자 할 때 사용
// 2부터 시작해서 특정 숫자의 배수를 모두 지우는 방식(자기 자신은 지우지 않는다.)

function primeSieve(n) {
  let answer = 0;
  const arr = Array.from({length: n+1}, (_, idx)=>idx);
  
  for(let i=2;i<=n; i++) {
    if(arr[i] === 0) continue; // 소수 아님

    for(let j=i+i; j<=n; j+=i) { // 2부터 n까지 순회하면서 배수부터 방문체크
      arr[j] = 0;
    }
  }

  for(let i=2; i<=n; i++) { // 소수인것 개수 세기
    if(arr[i]) answer++;
  }

  return answer;
}