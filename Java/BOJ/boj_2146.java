import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayDeque;
import java.util.Queue;
import java.util.StringTokenizer;

public class boj_2146 {
    static int N;
    static int[][] map;
    static boolean[][] isNumbered;
    static int minDist = Integer.MAX_VALUE;

    static int[] dx = new int[] { -1, 1, 0, 0 };
    static int[] dy = new int[] { 0, 0, -1, 1 };

    static int checkStart(int x, int y) {
        for (int i = 0; i < 4; i++) {
            int nx = x + dx[i];
            int ny = y + dy[i];

            if (nx < 0 || nx >= N || ny < 0 || ny >= N)
                continue;

            if (map[nx][ny] > 0)
                return map[nx][ny];
        }

        return -1;
    }

    static void bfs(int x, int y, int num) {
        Queue<int[]> queue = new ArrayDeque<>();
        queue.add(new int[] { x, y });

        isNumbered[x][y] = true;
        map[x][y] = num;

        while (queue.size() > 0) {
            int[] cur = queue.poll();

            for (int i = 0; i < 4; i++) {
                int nx = cur[0] + dx[i];
                int ny = cur[1] + dy[i];

                if (nx < 0 || nx >= N || ny < 0 || ny >= N || map[nx][ny] == 0 || isNumbered[nx][ny])
                    continue;

                isNumbered[nx][ny] = true;
                map[nx][ny] = num;
                queue.add(new int[] { nx, ny });
            }
        }
    }

    static int calcMinDist(int x, int y, int islandNum) {
        Queue<int[]> queue = new ArrayDeque<>();
        queue.add(new int[] { x, y, 1 });

        boolean[][] visited = new boolean[N][N];
        visited[x][y] = true;

        while (queue.size() > 0) {
            int[] cur = queue.poll();

            for (int i = 0; i < 4; i++) {
                int nx = cur[0] + dx[i];
                int ny = cur[1] + dy[i];

                if (nx < 0 || nx >= N || ny < 0 || ny >= N || visited[nx][ny])
                    continue;

                if (map[nx][ny] == islandNum)
                    continue;

                if (map[nx][ny] > 0 && map[nx][ny] != islandNum) {
                    return cur[2];
                }

                visited[nx][ny] = true;
                queue.add(new int[] { nx, ny, cur[2] + 1 });
            }
        }

        return -1;
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        N = Integer.parseInt(st.nextToken());

        map = new int[N][N];

        for (int i = 0; i < N; i++) {
            st = new StringTokenizer(br.readLine());
            for (int j = 0; j < N; j++) {
                map[i][j] = Integer.parseInt(st.nextToken());
            }
        }

        int num = 1;
        isNumbered = new boolean[N][N];
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                if (map[i][j] == 1 && !isNumbered[i][j]) {
                    bfs(i, j, num);
                    num++;
                }
            }
        }

        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                int islandNum = checkStart(i, j);
                if (map[i][j] == 0 && islandNum != -1) {
                    int res = calcMinDist(i, j, islandNum);
                    if (res == -1)
                        continue;
                    minDist = Math.min(res, minDist);
                }
            }
        }

        System.out.println(minDist);
    }

}