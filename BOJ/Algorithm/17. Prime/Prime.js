// 1. 2-N까지 모든 정수로 나누었을 때 나누어 떨어지는지 확인
function isPrime01(n) {
    if(n === 1) return false;
    for(let i=2; i<n; i++) {
        if(n % i === 0) return false;
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
    if(n === 1) return false;
    for(let i=2; i<=Math.floor(Math.sqrt(n)); i++) {
      if(n % i === 0) return false;
    }
    return true;
  }
  
  console.log(isPrime02(1));
  console.log(isPrime02(2));
  console.log(isPrime02(3));
  console.log(isPrime02(4));
  
  console.clear();
  
  // 3. 에라토스테네스의 체
  // 1-N까지의 수 중에서 소수의 갯수를 구하고 싶을 때 사용
  function isPrime03(n) {
    if(n === 1) return false;
    const prime = {};
    
    for(let i=2; i<=Math.floor(Math.sqrt(n)); i++) {
      if(prime[n]) break; // 
      if(prime[i]) continue;
  
    }
  }
  