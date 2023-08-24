package BOJ;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class boj_2931 {

    static int R, C;
    static String[][] map;
    static int[] sPos = new int[] { 0, 0 };
    static int[] ePos = new int[] { 0, 0 };
    static int[] dx = new int[] { -1, 1, 0, 0 }; // 상 하 좌 우
    static int[] dy = new int[] { 0, 0, -1, 1 };

    static int[] simulation() {
        // M에서 출발
        int x = sPos[0];
        int y = sPos[1];
        int d = -1; // 기존 방향

        // 초기 방향 설정
        for (int i = 0; i < 4; i++) {
            int nx = x + dx[i];
            int ny = y + dy[i];

            if (nx < 0 || nx >= R || ny < 0 || ny >= C)
                continue;

            if (!map[nx][ny].equals(".")) {
                d = i;
                break;
            }
        }

        while (true) {
            // 도착지에 도착하면 종료
            if (x == ePos[0] && y == ePos[1]) {
                break;
            }

            // 다음 위치 갱신
            int nx  = x + dx[d];
            int ny = y + dy[d];

            // 현재 d는 왼쪽
            switch (map[nx][ny]) {
                // 빈 칸이면
                case ".": {
                    // 빈 칸 요소를 선택
                    // + 가 와야하는 경우

                    if(!map[nx + dx[d]][ny + dy[d]].equals(".") && !map[nx + dx[(d+2) % 4]][ny + dy[(d+2) % 4]].equals(".")) {
                        return new int[] {nx, ny, 2};
                    }

                    if(d < 2 &&  map[nx + dx[d]][ny + dy[d]].equals("|") || map[nx + dx[d]][ny + dy[d]].equals("2") || map[nx + dx[d]][ny + dy[d]].equals("3")) {
                        return new int[] {nx, ny, 0};
                    }

                    if(d >= 2 && map[nx + dx[d]][ny + dy[d]].equals("-") || map[nx + dx[d]][ny + dy[d]].equals("2") || map[nx + dx[d]][ny + dy[d]].equals("3")) {
//                        return new int[] {nx, ny, |};
                    }

                    break;
                }
                case "|": {
                    if(d == 0 || d == 1) {
                        x = nx;
                        y = ny;
                    }
                    break;
                }
                case "-": {
                    if(d == 2 || d == 3) {
                        x = nx;
                        y = ny;
                    }
                    break;
                }
                case "+": {
                    //
                    break;
                }
                case "1": {
                    // 왼쪽 이동
                    if(d == 2) {
                        x = nx;
                        y = ny;
                        d = 1;
                    }
                    // 위로 이동
                    else if(d == 0) {
                        x = nx;
                        y = ny;
                        d = 3;
                    }
                    break;
                }
                case "2": {
                    if(d == 1) {
                        x = nx;
                        y = ny;
                        d = 3;
                    }

                    else if(d == 2) {
                        x = nx;
                        y = ny;
                        d = 1;
                    }
                    break;
                }
                case "3": {
                    if(d == 1) {
                        x = nx;
                        y = ny;
                        d = 2;
                    }

                    else if(d == 3) {
                        x = nx;
                        y = ny;
                        d = 0;
                    }
                    break;
                }
                case "4": {
                    if(d == 3) {
                        x = nx;
                        y = ny;
                        d = 1;
                    }

                    else if(d == 0) {
                        x = nx;
                        y = ny;
                        d = 2;
                    }
                    break;
                }

            }
        }

        return null;
    }

    public static void main(String[] args) throws IOException {
        System.setIn(new FileInputStream("src/boj/input.txt"));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        R = Integer.parseInt(st.nextToken());
        C = Integer.parseInt(st.nextToken());

        map = new String[R][C];

        for (int i = 0; i < R; i++) {
            st = new StringTokenizer(br.readLine());
            for (int j = 0; j < C; j++) {
                map[i][j] = st.nextToken();

                if (map[i][j].equals("M")) {
                    sPos[0] = i;
                    sPos[1] = j;
                }

                if (map[i][j].equals("Z")) {
                    ePos[0] = i;
                    ePos[1] = j;
                }
            }
        }

        // M에서 Z까지 이동
        simulation();
    }

}