package BOJ;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class boj_14890 {
    static int N, L;
    static int[][] map;

    static boolean checkRow(int row){
        boolean[] isExist = new boolean[N];

        int s = map[row][0];
        for(int i=1; i<L; i++) {
            if(map[row][i] != s) return false;
        }

        int e = map[row][N-1];
        for(int i=N-1; i>=N-L; i--) {
            if(map[row][i] != e) return false;
        }

        for(int i=0; i<N-L; i++) {
            if(map[row][i] == map[row][i+L]) continue;
            if(Math.abs(map[row][i] - map[row][i+L]) > 1) return false;

            // 위로 올라가야하는 형태
            if(map[row][i+L] - map[row][i] == 1) {
                for(int j=i+1; j<i+L; j++) {
                    if(map[row][j] != map[row][i]) return false;
                }

                // 경사로 설치 가능
                for(int j=i; j<=i+L-1; j++) {
                    if(isExist[j]) return false;
                    isExist[j] = true;
                }

                i+=(L-1);
            }
        }

        for(int i=N-1-L; i>=0; i--) {
            if(map[row][i] == map[row][i+L]) continue;
            if(Math.abs(map[row][i] - map[row][i+L]) > 1) return false;

            // 아래로 내려가는 형태
            if(map[row][i] - map[row][i+L] == 1) {
                for(int j=i+1; j<i+L; j++) {
                    if(map[row][j] != map[row][i+L]) return false;
                }

                for(int j=i+1; j<= i+L; j++) {
                    if(isExist[j]) return false;
                    isExist[j] = true;
                }

                i-=(L-1);
            }
        }

        return true;
    }

    static boolean checkCol(int col){
        boolean[] isExist = new boolean[N];

        int s = map[0][col];
        for(int i=1; i<L; i++) {
            if(map[i][col] != s) return false;
        }

        int e = map[N-1][col];
        for(int i=N-1; i>=N-L; i--) {
            if(map[i][col] != e) return false;
        }

        for(int i=0; i<N-L; i++) {
            if(map[i][col] == map[i+L][col]) continue;
            if(Math.abs(map[i][col] - map[i+L][col]) > 1) return false;

            // 위로 올라가야하는 형태
            if(map[i+L][col] - map[i][col] == 1) {
                for(int j=i+1; j<i+L; j++) {
                    if(map[j][col] != map[i][col]) return false;
                }

                // 경사로 설치 가능
                for(int j=i; j<=i+L-1; j++) {
                    if(isExist[j]) return false;
                    isExist[j] = true;
                }

                i+=(L-1);
            }

//            System.out.println(col + "열");
//            System.out.println(i);
        }

        for(int i=N-1-L; i>=0; i--) {
            if(map[i][col] == map[i+L][col]) continue;
            if(Math.abs(map[i][col] - map[i+L][col]) > 1) return false;

            // 아래로 내려가는 형태
            if(map[i][col] - map[i+L][col] == 1) {
                for(int j=i+1; j<i+L; j++) {
                    if(map[j][col] != map[i+L][col]) return false;
                }

                for(int j=i+1; j<= i+L; j++) {
                    if(isExist[j]) return false;
                    isExist[j] = true;
                }

                i-=(L-1);
            }

            System.out.println(col + "열");
            System.out.println(i);
        }

        return true;
    }

    public static void main(String[] args) throws IOException {
        System.setIn(new FileInputStream("src/BOJ/input.txt"));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        N = Integer.parseInt(st.nextToken());
        L = Integer.parseInt(st.nextToken());

        map = new int[N][N];
        for(int i=0; i<N; i++) {
            st = new StringTokenizer(br.readLine());
            for(int j=0; j<N; j++) {
               map[i][j] = Integer.parseInt(st.nextToken());
            }
        }

        int cnt = 0;
        // 2차원 배열 검사
        for(int i=0; i<N; i++) {
            if(checkRow(i)) {
                System.out.println(i + "행 가능");
            }
        }

        for(int i=0; i<N; i++) {
            if(checkCol(i)) {
                System.out.println(i + "열 가능");
            }
        }
    }
}
