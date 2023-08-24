package BOJ;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class boj_1992 {
    static int[][] quadTree; // 영상을 저장할 2차원 배열
    static StringBuilder sb = new StringBuilder(); // 문자열 출력을 위한 클래스 생성

    /**
     * 현재 구역의 값이 모두 같은지 확인하는 메서드 (모두 0이거나 모두 1이면 true를 반환)
     * @param x : 현재 구역 시작지점의 행
     * @param y : 현재 구역 시작지점의 열
     * @param len : 현재 구역의 길이
     * @return : 모두 동일한 값을 가지는지의 여부를  true/false로 반환
     */
    static boolean checkSame(int x, int y, int len) {
        int std = quadTree[x][y]; // 기준이 되는 첫 번재 원소
        for(int i=x; i<x+len; i++) { // 현재 구역의 x좌표
            for(int j=y; j<y+len; j++) { // 현재 구역의 y좌표
                if(quadTree[i][j] != std) return false; // 만약에 첫 번째 원소와 다르면 false 반환
            }
        }
        return true; // 그 외에는 동일하므로 true 반환
    }

    /**
     * 압축을 진행하는 재귀함수
     * @param x : 압축을 진행할 영역의 행
     * @param y : 압축을 진행할 영역의 열
     * @param len : 압축을 진행할 영역의 길이
     */
    static void recursion(int x, int y, int len)  {
        // 현재 영역의 길이가 1이면 더이상 쪼갤 수 없으므로 종료
        if(len == 1) {
            sb.append(quadTree[x][y] + ""); // 현재 값을 결과값으로 추가
            return; // 종료
        }

        // 만약 현재 공간에 있는 원소의 값이 모두 동일하다면
        if(checkSame(x, y, len)) {
            sb.append(quadTree[x][y] + ""); // 현재 가장 첫 번재 있는 값을 문자열 형태로 결과에 추가
            return; // 종료
        }

        int nLen = len/2; // 다음 공간의 크기
        sb.append("("); // 다음 공간으로 이동하기 전에 ( 추가
        // 4분할 하여 재귀함수 호출 (분할정복)
        recursion(x, y, nLen); // 왼쪽 위를 시작점으로 호출
        recursion(x, y+nLen, nLen); // 오른쪽 위를 시작점으로 호출
        recursion(x+nLen, y, nLen); // 왼쪽 아래를 시작점으로 호출
        recursion(x+nLen, y+nLen, nLen); // 오른쪽 아래를 시작점으로 호출
        sb.append(")"); // 현재 공간이 끝나면 ) 추가
    }

    public static void main(String[] args) throws IOException {
        // 입력
        System.setIn(new FileInputStream("src/BOJ/input.txt"));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        // 전체 영상의 크기  N
        int N = Integer.parseInt(st.nextToken());
        quadTree = new int[N][N]; // 영상을 받기 위한 2차원 배열 선언

        for(int i=0; i<N; i++) {
            st = new StringTokenizer(br.readLine());
            String[] temp = st.nextToken().split("");
            for(int j=0; j<N; j++) {
                quadTree[i][j] = Integer.parseInt(temp[j]);
            }
        }

        // 압축을 진행하기 위한 재귀함수 호출
        recursion(0, 0, N);

        // 압축 결과 출력
        System.out.println(sb.toString());
    }
}
