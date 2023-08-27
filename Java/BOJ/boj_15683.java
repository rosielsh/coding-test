package BOJ;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

public class boj_15683 {
    static int N, M; // 사무실의 크기
    static int[][] space; // 사무실의 상태

    static int minValue = Integer.MAX_VALUE; // 사각지대의 최소값

    static List<int[]> camera;

    static int[][][] cameraDir = {
            {{0}, {1}, {2}, {3}},
            {{0, 2}, {1, 3}},
            {{0,1}, {1, 2}, {2, 3}, {3, 0}},
            {{0, 1, 2}, {1, 2, 3}, {2, 3, 0}, {3, 0, 1}},
            {{0, 1, 2, 3}}
    };

    static int[] dx = new int[] {-1, 0, 1, 0};
    static int[] dy = new int[] {0, 1, 0, -1};


    static void spread(int x, int y, int[] dir) {
        // 모든 방향에 대해 감시할 수 있는 영역을 #으로 퍼트리기
        int nx;
        int ny;
        for(int i=0; i<dir.length; i++) {
            // 현재 방향 dir[i]
            int dist = 1;
            while(true) {
                nx = x + dist*dx[dir[i]];
                ny = y + dist*dy[dir[i]];

                if(nx < 0 || nx >= N || ny < 0 || ny >= M || space[nx][ny] == 6) break;

                dist++;
                if(space[nx][ny] >= 1 && space[nx][ny] <= 5) continue;
                if(space[nx][ny] == -1) continue; // 이미 감시했으면

                space[nx][ny] = -1; // 감시 된 구역 체크
            }
        }
    }

    static void calcLeft() {
        int cnt = 0;
        for(int i=0; i<N; i++) {
            for(int j=0; j<M; j++) {
                if(space[i][j] == 0) cnt++;
            }
        }

        minValue = Math.min(minValue, cnt);
    }
    static void combi(int cnt) {
        if(cnt == camera.size()) {
            // 사각지대 구하기
            calcLeft();
            return;
        }

        // 현재 카메라 번호 -> camera.get(cnt)[0]
        int cameraNum = camera.get(cnt)[0];

        int[][] copySpace = new int[N][M];

        for(int i=0; i<N; i++) {
            for(int j=0; j<M; j++) {
                copySpace[i][j] = space[i][j];
            }
        }

        for(int c=0; c<cameraDir[cameraNum-1].length; c++) {
            // 각각의 방향 접근 cameraDir[cameraNum-1][i]
            spread(camera.get(cnt)[1], camera.get(cnt)[2], cameraDir[cameraNum-1][c]);
            combi(cnt+1);

            for(int i=0; i<N; i++) {
                for(int j=0; j<M; j++) {
                    space[i][j] = copySpace[i][j];
                }
            }
        }
    }


    public static void main(String[] args) throws IOException {
        System.setIn(new FileInputStream("src/BOJ/input.txt"));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        N = Integer.parseInt(st.nextToken());
        M = Integer.parseInt(st.nextToken());

        space = new int[N][M];

        camera = new ArrayList<>();

        for(int i=0; i<N; i++) {
            st = new StringTokenizer(br.readLine());
            for(int j=0; j<M; j++) {
                space[i][j] = Integer.parseInt(st.nextToken());

                if(space[i][j] != 0 && space[i][j] != 6) {
                    camera.add(new int[] {space[i][j], i, j});
                }
            }
        }

        combi(0);

        System.out.println(minValue);
    }
}
