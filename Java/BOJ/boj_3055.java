package BOJ;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;

public class boj_3055 {
    static int N, M; // 지도의 크기 (행, 열)
    static String[][] map; // 현재 지도
    static int[] dPos = new int[2]; // 비버의 위치
    static int[] sPos = new int[2]; // 고슴도치의 위치

    static List<int[]> water = new ArrayList<>(); // 물의 위치

    // 방향 벡터
    static int[] dx = new int[] { -1, 1, 0, 0 };
    static int[] dy = new int[] { 0, 0, -1, 1 };

    public static int bfs() {
        int time = 0; // 시간

        int[][] sVisited = new int[N][M]; // 고슴도치 방문배열
        int[][] wVisited = new int[N][M]; // 물 방문배열

        sVisited[sPos[0]][sPos[1]] = 1;

        for (int i = 0; i < water.size(); i++) {
            // 현재 물의 위치 : water.get(i)[0]
            wVisited[water.get(i)[0]][water.get(i)[1]] = 1;
        }

        Queue<int[]> sQueue = new ArrayDeque<>(); // 고슴도치 위치를 관리하는 큐
        Queue<int[]> wQueue = new ArrayDeque<>(); // 물 위치를 관리하는 큐

        sQueue.add(new int[] { sPos[0], sPos[1] });

        for (int i = 0; i < water.size(); i++) {
            wQueue.add(new int[] { water.get(i)[0], water.get(i)[1] });
        }

        while (true) {
            int sLen = sQueue.size(); // 고슴도치 큐의 길이
            int wLen = wQueue.size(); // 물 큐의 길이

            // 고슴도치가 이동할 수 없으면 종료
            if (sLen == 0)
                break;

            // 물 먼저 이동
            for (int c = 0; c < wLen; c++) {
                int[] cur = wQueue.poll(); // 현재 물의 좌표

                for (int i = 0; i < 4; i++) {
                    int nx = cur[0] + dx[i];
                    int ny = cur[1] + dy[i];

                    if (nx < 0 || nx >= N || ny < 0 || ny >= M)
                        continue;

                    if (map[nx][ny].equals("X") || map[nx][ny].equals("D") || wVisited[nx][ny] == 1)
                        continue;

                    wVisited[nx][ny] = 1;
                    wQueue.add(new int[] { nx, ny });
                }
            }

            // 고슴도치 이동
            for (int c = 0; c < sLen; c++) {
                int[] cur = sQueue.poll(); // 현재 고슴도치 좌표

                for (int i = 0; i < 4; i++) {
                    int nx = cur[0] + dx[i];
                    int ny = cur[1] + dy[i];

                    if (nx < 0 || nx >= N || ny < 0 || ny >= M)
                        continue;

                    // 고슴도치가 비버의 굴로 들어가면 최소 시간 반환 후 종료
                    if (map[nx][ny].equals("D")) {
                        return time + 1;
                    }

                    if (map[nx][ny].equals("*") || map[nx][ny].equals("X") || wVisited[nx][ny] == 1
                            || sVisited[nx][ny] == 1)
                        continue;

                    sVisited[nx][ny] = 1;
                    sQueue.add(new int[] { nx, ny });
                }
            }
            time++;
        }

        // 비버의 굴로 못들어가면 -1 반환
        return -1;
    }

    public static void main(String[] args) throws IOException {
        System.setIn(new FileInputStream("src/BOJ/input.txt"));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        N = Integer.parseInt(st.nextToken());
        M = Integer.parseInt(st.nextToken());

        map = new String[N][M];

        for (int i = 0; i < N; i++) {
            map[i] = br.readLine().split("");
        }

        for (int i = 0; i < N; i++) {
            for (int j = 0; j < M; j++) {
                if (map[i][j].equals("D")) {
                    dPos[0] = i;
                    dPos[1] = j;
                }

                if (map[i][j].equals("S")) {
                    sPos[0] = i;
                    sPos[1] = j;
                }

                if (map[i][j].equals("*")) {
                    water.add(new int[] { i, j });
                }
            }
        }

        // 최소 시간 구하기
        int res = bfs();

        System.out.println(res == -1 ? "KAKTUS" : res);
    }

}