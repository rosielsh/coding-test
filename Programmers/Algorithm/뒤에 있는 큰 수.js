function solution(numbers) {
  // 뒷 큰수 : 자신보다 뒤에 있는 숫자 중에서 자신보다 크면서 가장 가까이 있는 수

  const answer = Array.from({ length: numbers.length }, () => -1);
  const stack = [];

  for (let i = 0; i < numbers.length; i++) {
    // 현재 스택에 저장되어 있는 수 중 제일 최근에 넣은 수보다 현재 수가 더 크면
    while (stack.length && numbers[stack.at(-1)] < numbers[i]) {
      answer[stack.pop()] = numbers[i]; // numbers[i]는 stack에서 pop한 원소의 뒷 큰수
    }
    stack.push(i);
  }

  return answer;
}
