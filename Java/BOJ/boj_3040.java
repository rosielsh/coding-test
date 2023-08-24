package BOJ;

import java.io.*;
import java.util.StringTokenizer;

public class boj_3040 {
    public static void main(String[] args) throws IOException, FileNotFoundException {
        System.setIn(new FileInputStream("src/boj/input.txt"));

        // 입력
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st;

        int[] num = new int[9]; // 아홉개의 숫자를 저장할 배열
        int totalSum = 0; // 전체 합을 저장할 변수
        for(int i=0; i<9; i++) {
            st = new StringTokenizer(br.readLine());
            num[i] = Integer.parseInt(st.nextToken());
            totalSum += num[i]; // 전체 합 구하기
        }

        // 9개의 숫자 중에서 2중 for문을 통해 2명의 난장이 선택
        for(int i=0; i<9; i++) { // 첫 번째 숫자 뽑기
            boolean isExist = false; // 일곱 난장이를 찾았는지 확인하는 flag
            for(int j=0; j<i; j++) { // 두 번째 숫자 뽑기
                int num1 = num[i]; // 첫 번째 숫자를 저장하는 변수
                int num2 = num[j]; // 두 번째 숫자를 저장하는 변수

                // 만약 전체 합에서 2개의 수를 뺀 값이 100이라면 일곱 난장이를 찾은 것이다.
                if(totalSum - num1 - num2 == 100) {
                    // 제외할 두 수의 값을 -1로 변경
                    num[i] = -1;
                    num[j] = -1;
                    isExist = true; // 일곱난장이를 찾았다는 flag 켜기
                    break; // 반복문 종료
                }
            }
            // 내부 for문에서 난장이를 찾았다면 밖의 for문을 탈출해주기 위한 조건
            if(isExist) break;
        }

        // 출력
        for(int i=0; i<9; i++) {
            if(num[i] == -1) continue;
            System.out.println(num[i]);
        }
    }
}
