import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayDeque;
import java.util.Queue;
import java.util.StringTokenizer;
 
public class swea_8382 {
    static int[] start = new int[] {0, 0};
    static int[] end = new int[] {0, 0};
     
    static int[] dx = new int[] {-1, 1, 0, 0};
    static int[] dy = new int[] {0, 0, -1, 1};
     
    static boolean[][][] visited;
     
    static int bfs() {
        Queue<int[]> queue = new ArrayDeque<>();
         
        // type : 0이면 가로, 1이면 세로 
        queue.offer(new int[] {start[0], start[1], 0, 0});
        visited[start[0]][start[1]][0] = true;
        queue.offer(new int[] {start[0], start[1], 1, 0});
        visited[start[0]][start[1]][1] = true;
         
        while(!queue.isEmpty()) {
            int[] cur = queue.poll();
             
            if(cur[0] == end[0] && cur[1] == end[1]) {
                return cur[3];
            }
             
            for(int i=0; i<4; i++) {
                int nx = cur[0] + dx[i];
                int ny = cur[1] + dy[i];
                 
                if(nx < 0 || nx > 200 || ny < 0 || ny > 200) continue;
                 
                // 이전 타입이 가로 타입이었다면 세로로만 이동 
                if(cur[2] == 0) {
                    if(visited[nx][ny][1]) continue;
                    if(i < 2) {
                        visited[nx][ny][1] = true;
                        queue.offer(new int[] {nx, ny, 1, cur[3]+1});
                    }
                }
                 
                // 이전 타입이 세로 타입이었다면 가로로만 이동 
                if(cur[2] == 1) {
                    if(visited[nx][ny][0]) continue;
                    if(i >= 2) {
                        visited[nx][ny][0] = true;
                        queue.offer(new int[] {nx, ny, 0, cur[3]+1});
                    }
                }
            }
        }
        return 0;
    }
     
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        StringBuilder sb = new StringBuilder();
         
        int T = Integer.parseInt(st.nextToken());
         
        for(int t=0; t<T; t++) {
            st = new StringTokenizer(br.readLine());
            start[0] = Integer.parseInt(st.nextToken())+100;
            start[1] = Integer.parseInt(st.nextToken())+100;
            end[0] = Integer.parseInt(st.nextToken())+100;
            end[1] = Integer.parseInt(st.nextToken())+100;
             
            visited = new boolean[201][201][2];
             
            int res = bfs();
            sb.append("#").append(t+1).append(" ").append(res).append("\n");
        }
         
        System.out.print(sb.toString());
    }
}