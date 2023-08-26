package BOJ;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class boj_17281 {
    static int N;
    static int[][] result; // 각 이닝에서 얻는 결과

    static int[] lineup; // 타자 순서

    static boolean[] isSelected;

    static int maxValue = Integer.MIN_VALUE;

    // 현재 결과에서 타자를
    static void calcResult() {
        // 아웃 수
        int outCnt = 0;
        // 홈, 1루, 2루, 3루
        boolean[] base = new boolean[3];

        // 현재 이닝 수
        int inning = 0;

        // 현재 타자 순서
        int order = 1;

        // 현재 스코어
        int score = 0;

        // 이닝이 N이 되기 전까지
        while(inning != N) {
            int res = result[inning][lineup[order]];
            // 아웃
            if(res == 0) {
                outCnt++; // 아웃 횟수
                // 아웃을 3번 당하면 다음 이닝으로
                if(outCnt == 3) {
                    outCnt = 0;
                    inning++;
                    base = new boolean[3];
                }
                order++;
                if(order == 10) order = 1;
            }

            // 아웃 x
            else {
                // 안타
                if(res == 1) {
                    // 3루에 사람이 있으면
                    if(base[2]) {
                        score++;
                    }
                    base[2] = base[1];
                    base[1] = base[0];
                    base[0] = true;
                }
                else if(res == 2) {
                    // 2, 3루에 사람이 있으면
                    if(base[2] ) {
                        score++;
                    }
                    if(base[1]) {
                        score++;
                    }
                    base[2] = base[0];
                    base[1] = true;
                    base[0] = false;
                }

                else if(res == 3) {
                    // 1, 2, 3루에 사람이 있으면
                    if(base[2]) {
                        score++;
                    }
                    if(base[1]) {
                        score++;
                    }
                    if(base[0]) {
                        score++;
                    }
                    base[2] = true;
                    base[1] = false;
                    base[0] = false;
                }

                else if(res == 4) {
                    if(base[2] ) {
                        score++;
                    }
                    if(base[1]) {
                        score++;
                    }
                    if(base[0]) {
                        score++;
                    }

                    score++;

                    base[2] = false;
                    base[1] = false;
                    base[0] = false;
                }

                order++;
                if(order == 10) order = 1;
            }
        }

        maxValue = Math.max(maxValue, score);
    }


    // N번 타자를 각 타순에 넣어보는 함수
    static void perm(int hitterNum) {
        // 9개 순서 다 정했다
        if(hitterNum == 10) {
            calcResult();
            return;
        }

        // 전체 타자 순회
        for(int i=1; i<=9; i++) {
            if(isSelected[i]) continue; // 기존에 선택 됐다면 pass
            isSelected[i] = true;
            lineup[i] = hitterNum; // 현재 투수 번호
            perm(hitterNum+1);
            isSelected[i] = false;
        }
    }


    public static void main(String[] args) throws IOException {
        System.setIn(new FileInputStream("src/boj/input.txt"));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        N = Integer.parseInt(st.nextToken());
        result = new int[N][10]; // 1번 - 10번 타수의 이닝 별 결과를 저장

        for(int i=0; i<N; i++) {
            st = new StringTokenizer(br.readLine());

            for(int j=1; j<=9; j++) {
                result[i][j] = Integer.parseInt(st.nextToken());
            }
        }

        lineup = new int[10]; // 타자 저장 배열
        lineup[4] = 1; // 4번 타자는 1번

        isSelected = new boolean[10]; // 선택 여부 저장 배열
        isSelected[4] = true;

        perm(2); // 2번 타자부터 넣어보기

        System.out.println(maxValue);
    }
}
