package SWEA;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class swea_1873 {
    static int H, W; // 맵의 높이, 넓이
    static String[][] map; // 맵 2차원 배열
    static int N; // 사용자의 입력 개수
    static String[] command; // 사용자의 입력
    static int dir = 0; // 현재 전차의 방향, 0: 상, 1: 우, 2: 하, 3: 좌
    static int[] pos = new int[] {0, 0}; // 전차의 위치

    static int[] dx = new int[] {-1, 0, 1, 0};
    static int[] dy = new int[] {0, 1, 0, -1};

    // 포탄을 쏘는 함수
    static void shoot() {
        int dist = 0; // 거리를 0부터 시작
        while(true) {
            int nx = pos[0] + dist*dx[dir]; // 다음 포탄이 위치하게 될 행
            int ny = pos[1] + dist*dy[dir]; // 다음 포탄이 위치하게 될 열

            if(nx < 0 || nx >= H || ny < 0 || ny >= W) break; // 만약 범위가 벗어나면 아무일도 일어나지 않음
            if(map[nx][ny].equals("#")) break; // 포탄이 강철에 부딫히면 아무일도 일어나지 않음

            if(map[nx][ny].equals("*")) { // 현재 포탄이 벽돌에 부딫혔다면
                map[nx][ny] = "."; // 해당 위치의 벽은 부숴짐
                break; // 종료
            }

            dist++; // 거리 + 1
        }
    }

    public static void main(String[] args) throws IOException {
        // 입력
        System.setIn(new FileInputStream("src/swea/input.txt"));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        int T = Integer.parseInt(st.nextToken()); // 전체 테스트케이스 개수

        // 전체 테스트케이스에 대해 반복
        for (int t = 1; t <= T; t++) {
            st = new StringTokenizer(br.readLine());
            H = Integer.parseInt(st.nextToken());
            W = Integer.parseInt(st.nextToken());

            map = new String[H][W];

            // 2차원 맵 입력 받기
            for (int i = 0; i < H; i++) {
                st = new StringTokenizer(br.readLine());
                String[] temp = st.nextToken().split("");
                for (int j = 0; j < W; j++) {
                    map[i][j] = temp[j];

                    // ^, <, >, v 중 하나일 때 전차의 위치와 방향 저장
                    if(map[i][j].equals("^")) {
                        dir = 0;
                        pos[0] = i;
                        pos[1] = j;
                    } else if(map[i][j].equals(">")) {
                        dir = 1;
                        pos[0] = i;
                        pos[1] = j;
                    } else if(map[i][j].equals("v")) {
                        dir = 2;
                        pos[0] = i;
                        pos[1] = j;
                    } else if(map[i][j].equals("<")) {
                        dir = 3;
                        pos[0] = i;
                        pos[1] = j;
                    }
                }
            }

            st = new StringTokenizer(br.readLine());
            N = Integer.parseInt(st.nextToken()); // 사용자의 입력의 개수

            st = new StringTokenizer(br.readLine());
            String[] temp1 = st.nextToken().split("");

            command = new String[N];

            // 사용자 입력 저장
            for (int i = 0; i < N; i++) {
                command[i] = temp1[i];
            }

            // 사용자의 입력 만큼 순회
            for (int i = 0; i < N; i++) {
                String cmd = command[i];

                // 현재 명령에 대해서 명령 수행
                switch (cmd) {
                    case "U": { // U 일때
                        // 방향과 값 변경
                        map[pos[0]][pos[1]] = "^";
                        dir = 0;
                        // 만약 위로 이동할 수 있고, 평지라면
                        if(pos[0]-1 >= 0 && map[pos[0]-1][pos[1]].equals(".")) {
                            map[pos[0]][pos[1]] = ".";
                            map[pos[0]-1][pos[1]] = "^";
                            pos[0] -= 1;
                        }
                        break;
                    }
                    case "D": { // D 일때
                        // 방향과 값 변경
                        map[pos[0]][pos[1]] = "v";
                        dir = 2;
                        // 만약 아래로 이동할 수 있고, 평지라면
                        if(pos[0]+1 < H && map[pos[0]+1][pos[1]].equals(".")) {
                            map[pos[0]][pos[1]] = ".";
                            map[pos[0]+1][pos[1]] = "v";
                            pos[0] += 1;
                        }
                        break;
                    }
                    case "L": { // L 일때
                        // 방향과 값 변경
                        map[pos[0]][pos[1]] = "<";
                        dir = 3;
                        // 만약 왼쪽으로 이동할 수 있고, 평지라면
                        if(pos[1]-1 >= 0 && map[pos[0]][pos[1]-1].equals(".")) {
                            map[pos[0]][pos[1]] = ".";
                            map[pos[0]][pos[1]-1] = "<";
                            pos[1] -= 1;
                        }
                        break;
                    }
                    case "R": { // R 일때
                        // 방향과 값 변경
                        map[pos[0]][pos[1]] = ">";
                        dir = 1;
                        // 만약 오른쪽으로 이동할 수 있고, 평지라면
                        if(pos[1]+1 < W && map[pos[0]][pos[1]+1].equals(".")) {
                            map[pos[0]][pos[1]] = ".";
                            map[pos[0]][pos[1]+1] = ">";
                            pos[1] += 1;
                        }
                        break;
                    }
                    // shoot
                    case "S": {
                        shoot();
                        break;
                    }
                }
            }

            StringBuilder sb = new StringBuilder();

            sb.append("#").append(t).append(" ");
            for(int i=0; i<H; i++) {
                for(int j=0; j<W; j++) {
                    sb.append(map[i][j]);
                }
                if(i != H-1) {
                    sb.append("\n");
                }
            }

            System.out.println(sb.toString());
        }
    }
}