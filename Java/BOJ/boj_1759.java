package BOJ;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class boj_1759 {
    static int L, C; // 암호 자리 L, 암호 후보인 C개의 문자
    static String[] str; // 암호 후보를 저장할 문자열 1차원 배열
    static String[] res; // 암호 결과를 저장할 1차원 배열
    static StringBuilder sb = new StringBuilder();
    static String[] vowel = new String[] {"a", "e", "i", "o", "u"}; // 모음을 저장하는 배열

    // 모음인지 확인하는 함수
    static boolean isVowel(String x) {
        // 모음 전체를 순회
        for(int i=0; i<5; i++) {
            // 만약 모음과 동일하면
            if(x.equals(vowel[i])) {
                return true; // true를 반환
            }
        }
        return false;
    }

    /**
     * L개의 조합을 뽑는 함수
     * @param depth : 지금까지 뽑은 개수
     * @param index : 다음 조합의 시작 인덱스
     * @param cCnt : 지금까지의 자음 개수
     * @param mCnt : 지금까지의 모음 개수
     */
    static void combi(int depth, int index, int cCnt, int mCnt) {
        // 전체 L개를 뽑으면 종료
        if(depth == L) {
            // 만약 전체 모음과 자음 개수 조건을 만족 못하면 그냥 return
            if(cCnt < 2 || mCnt < 1) return;
            // 만약에 개수를 만족하면 출력에 추가
            for(int i=0; i<L; i++) {
                sb.append(res[i]);
            }
            sb.append("\n");
            return;
        }

        // 모든 인덱스에 대해 순회
        for(int i=index; i<C; i++) {
            // 모음을 포함하는 경우
            if(isVowel(str[i])) {
                res[depth] = str[i]; // 현재 자리에 모음 저장
                combi(depth+1, i+1, cCnt, mCnt+1); // 다음 자리 문자 뽑기
                res[depth] = null; // 현재 자리에 모음 삭제
            } else {
                res[depth] = str[i]; // 현재 자리에 자음 저장
                combi(depth+1, i+1, cCnt+1, mCnt); // 다음 자리 문자 뽑기
                res[depth] = null; // 현재 자리에 자음 삭제
            }
        }
    }

    public static void main(String[] args) throws IOException {
        // 입력
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        L = Integer.parseInt(st.nextToken());
        C = Integer.parseInt(st.nextToken());

        str = new String[C];
        st = new StringTokenizer(br.readLine());
        for(int i=0; i<C; i++) {
            str[i] = st.nextToken();
        }

        res = new String[L];
        Arrays.sort(str); // 사전 순으로 정렬

        combi(0, 0, 0, 0); // 모든 조합을 뽑기 위해 함수 호출
        System.out.print(sb.toString()); // 결과 출력
    }
}
