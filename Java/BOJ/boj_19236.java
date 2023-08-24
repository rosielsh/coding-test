package BOJ;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.StringTokenizer;

class Fish {
    int x;
    int y;
    int dir;

    Fish(int x, int y, int dir) {
        this.x = x;
        this.y = y;
        this.dir = dir;
    }

    @Override
    public String toString() {
        return "Fish [x=" + x + ", y=" + y + ", dir=" + dir + "]";
    }
}

public class boj_19236 {

    static int[][] space = new int[4][4];
    static Fish[] fishes = new Fish[17];

    static int[] dx = new int[] { -1, -1, 0, 1, 1, 1, 0, -1 };
    static int[] dy = new int[] { 0, -1, -1, -1, 0, 1, 1, 1 };

    static int totalEatValue = 0;

    static void swap(int cur, int next) {
        int tempX = fishes[cur].x;
        fishes[cur].x = fishes[next].x;
        fishes[next].x = tempX;

        int tempY = fishes[cur].y;
        fishes[cur].y = fishes[next].y;
        fishes[next].y = tempY;

//		int tempD = fishes[cur].dir;
//		fishes[cur].dir = fishes[next].dir;
//		fishes[next].dir = tempD;
    }

    static void dfs(int sx, int sy, int sd, int eat) {

        int[][]copySpace = new int[4][4];

        for(int i=0; i<4; i++) {
            for(int j=0; j<4; j++) {
                copySpace[i][j] = space[i][j];
            }
        }

        Fish[] copyFishes = new Fish[17];
        for(int i=1; i<=16; i++) {
            copyFishes[i] = new Fish(fishes[i].x, fishes[i].y, fishes[i].dir);
        }

        // 모든 물고기 이동
        for (int i = 1; i <= 16; i++) {
            int x = fishes[i].x;
            int y = fishes[i].y;
            int d = fishes[i].dir;

            if(space[x][y] == 0) continue;

            // 8방향 이동
            int num = 0;
            while (num++ < 8) {
                int nx = x + dx[d];
                int ny = y + dy[d];

                // 범위를 벗어나고, 상어가 있는 위치이면 방향 변경
                if (nx < 0 || nx >= 4 || ny < 0 || ny >= 4 || (sx == nx && sy == ny)) {
                    d = (d + 1) % 8;
                } else {
                    // 이동 가능 -> swap
                    int nextFish = space[nx][ny];

                    if(nextFish == 0) continue;

                    // space 갱신
                    int curFish = space[x][y];
                    space[x][y] = space[nx][ny];
                    space[nx][ny] = curFish;

                    fishes[curFish].dir = d;
                    swap(curFish, nextFish);
                    break;
                }
            }

//			for (int l = 1; l <= 16; l++) {
//				System.out.println(fishes[l].toString());
//			}

            System.out.println(i + "번 물고기 이동" + Arrays.deepToString(space));

        }

        // 상어 이동 후 위치 갱신
        // 현재 상어의 방향 : shark.dir

        List<int[]> possiblePos = new ArrayList<int[]>();

        int dist = 0;
        while (true) {
            int nx = sx + dist * dx[sd];
            int ny = sy + dist * dy[sd];

            // 다음 위치가 이동 할 수없는 위치이면
            if (nx < 0 || nx >= 4 || ny < 0 || ny >= 4) {
                break;
            }

            // 만약 그 위치가 물고기가 없는 위치이면
            else if (space[nx][ny] == 0) {
                dist++;
                continue;
            }

            else {
                possiblePos.add(new int[] { nx, ny, space[nx][ny] });
                dist++;
            }
        }

        // 상어가 이동할 위치가 없으면 종료
        if(possiblePos.isEmpty()) {
            System.out.println(eat);
            return;
        }

        // 이동할 수 있으면 모두 이동해주기
        for(int p=0; p<possiblePos.size(); p++) {
            // 물고기 먹은것으로 설정
            space[possiblePos.get(p)[0]][possiblePos.get(p)[1]] = 0;
            dfs(possiblePos.get(p)[0], possiblePos.get(p)[1], fishes[possiblePos.get(p)[2]].dir, eat+possiblePos.get(p)[2]);

            for(int i=0; i<4; i++) {
                for(int j=0; j<4; j++) {
                    space[i][j] = copySpace[i][j];
                }
            }

            for(int i=1; i<=16; i++) {
                fishes[i].x = copyFishes[i].x;
                fishes[i].y = copyFishes[i].y;
                fishes[i].dir = copyFishes[i].dir;
            }
        }
    }

    public static void main(String[] args) throws IOException {
        System.setIn(new FileInputStream("src/boj/input.txt"));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st;

        for (int i = 0; i < 4; i++) {
            st = new StringTokenizer(br.readLine());
            for (int j = 0; j < 4; j++) {
                int val = Integer.parseInt(st.nextToken());
                int dir = Integer.parseInt(st.nextToken()) - 1;

                space[i][j] = val;
                fishes[val] = new Fish(i, j, dir);
            }
        }

        int startFish = space[0][0];
        space[0][0] = 0;

        dfs(0, 0, fishes[startFish].dir, startFish);

    }

}
