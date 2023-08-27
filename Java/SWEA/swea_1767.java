package SWEA;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;

public class swea_1767 {
    static int N; // 멕시노스의 크기
    static int[][] mexinos; // 멕시노스의 초기 상태

    static List<int[]> core; // 코어의 위치 정보 저장

    // 좌 우 상 하
    static int[] dx = new int[] {0, 0, -1, 1};
    static int[] dy = new int[] {-1, 1, 0, 0};

    static int maxConnect = Integer.MIN_VALUE; // 연결된 전선의 최대값

    static List<Integer> result; // 최대로 연결된 간선에 대해 결과가 여러개 일 때 전선의 합을 저장할 리스트

    /**
     * 현재 방향으로 전선을 놓는 것이 가능한지 확인하는 함수
     * @param x: 현재 x좌표
     * @param y: 현재 y좌표
     * @param d: 현재 방향
     * @return 전선을 놓을 수 있으면 거리 반환, 없으면 -1 반환
     */
    static int connect(int x, int y, int d) {
        int nx = x;
        int ny = y;
        int dist = 1;

        while(true) {
            // 다음 위치
            nx = x + dist*dx[d];
            ny = y + dist*dy[d];

            // 전선을 놓을 수 있다
            if(nx < 0 || nx >= N || ny < 0 || ny >= N) {
                for(int i=1; i<dist; i++) {
                    mexinos[x + i*dx[d]][y + i*dy[d]] = 2;
                }

                // 전선 놓을 수 있으면 전선 거리를 반환
                return dist-1;
            }

            // 전선을 놓을 수 없으면 -1 반환 (전선을 만나거나, 코어를 만나거나)
            if(mexinos[nx][ny] > 0) return -1;

            dist++;
        }
    }

    /**
     * 코어의 4방향에 대해 전선을 놓아보는 함수
     * @param idx : 현재 코어 인덱스
     * @param cnt : 지금까지 놓은 전선 길이
     * @param selectCnt : 지금까지 연결된 전선의 개수
     */
    static void dfs(int idx, int cnt, int selectCnt) {
        // 만약 모든 코어에 대해 순회했다면 종료
        if(idx == core.size()) {
            // 지금까지 연결된 전선의 개수가 더 많다면 최대값으로 갱신
            if(selectCnt > maxConnect) {
                maxConnect = selectCnt;
                result = new ArrayList<>(); // 새로운 리스트 생성
            }
            // 그 외 동일한 연결 개수라면 결과값 추가
            else if(selectCnt == maxConnect) {
                result.add(cnt);
            }
            return;
        }

        // 전선을 놓기 전으로 돌릴 copy 배열 생성
        int[][] copy = new int[N][N];

        for(int i=0; i<N; i++) {
            for(int j=0; j<N; j++) {
                copy[i][j] = mexinos[i][j];
            }
        }

        // 그냥 다음으로 바로 가기(전선을 놓지 않는 경우)
        dfs(idx+1, cnt, selectCnt);

        // 4방향에 대해 돌려보기
        for(int d=0; d<4; d++) {
            int res = connect(core.get(idx)[0], core.get(idx)[1], d);
            if(res == -1) continue; // 전선을 놓을 수 없음
            dfs(idx+1, cnt+res, selectCnt+1);

            // 원상 복구
            for(int i=0; i<N; i++) {
                for(int j=0; j<N; j++) {
                    mexinos[i][j] = copy[i][j];
                }
            }
        }
    }

    public static void main(String[] args) throws IOException {
        // 입력
        System.setIn(new FileInputStream("src/SWEA/input.txt"));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        int T = Integer.parseInt(st.nextToken());

        // 모든 테스트케이스에 대해 순회
        for(int t=1; t<=T; t++) {
            st = new StringTokenizer(br.readLine());
            N = Integer.parseInt(st.nextToken());

            mexinos = new int[N][N];
            core = new ArrayList<>();

            for(int i=0; i<N; i++) {
                st = new StringTokenizer(br.readLine());
                for(int j=0; j<N; j++) {
                    mexinos[i][j] = Integer.parseInt(st.nextToken());

                    if(mexinos[i][j] == 1) {
                        if(i == 0 || i == N-1 || j == 0 || j == N-1) continue;
                        core.add(new int[] {i, j}); // 코어 추가
                    }
                }
            }

            maxConnect = Integer.MIN_VALUE; // 최대 연결 개수 초기화
            result = new ArrayList<>(); // 결과를 저장할 리스트 초기화

            dfs(0, 0, 0); // 함수 호출

            Collections.sort(result); // 결과를 오름차순으로 정렬 (많은 core에 전원을 연결했을 경우 전선의 합이 최소가 되는 값을 구해야 하므로)

            // 결과 출력
            System.out.printf("#%d %d\n", t, result.get(0));
        }
    }
}
