import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Queue;
import java.util.StringTokenizer;

public class Main {
	static int N, M, K;
	static int[][] map;
	static int[] dx = new int[] {-1, 1, 0, 0};
	static int[] dy = new int[] {0, 0, -1, 1};
	
	public static int bfs() {
		Queue<int[]> queue = new ArrayDeque<>();
		queue.add(new int[] {0, 0, 0, 1, 0});
		
		int[][][] visited = new int[K+1][N][M];
		visited[0][0][0]= 1;
		
		while(queue.size() > 0) {
			int[] cur = queue.poll();
			int x = cur[0];
			int y = cur[1];
			int breakCnt = cur[2];
			int isNight = cur[3];
			int stay = cur[4];
			
			if(x == N-1 && y == M-1) {
				return visited[breakCnt][N-1][M-1];
			}
			
			for(int i=0; i<4; i++) {
				int nx = x + dx[i];
				int ny = y + dy[i];
				
				if(nx < 0 || nx >= N || ny < 0 || ny >= M) continue;

				if(map[nx][ny] == 1) {
					if(isNight == 1) {
						if(breakCnt >= K || visited[breakCnt+1][nx][ny] > 0) continue;
						visited[breakCnt+1][nx][ny] = visited[breakCnt][x][y] + 1 + stay;
						queue.add(new int[] {nx, ny, breakCnt+1, 0, 0});
					}
					else {
						queue.add(new int[] {x, y, breakCnt, 1, stay+1});
					}
				}
				else {
					if(visited[breakCnt][nx][ny] > 0) continue;
					visited[breakCnt][nx][ny] = visited[breakCnt][x][y] + 1;
					queue.add(new int[] {nx, ny, breakCnt, isNight == 1 ? 0 : 1, stay}); 
				}
			}
		}
		return -1;
	}

	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());

		N = Integer.parseInt(st.nextToken());
		M = Integer.parseInt(st.nextToken());
		K = Integer.parseInt(st.nextToken());
		
		map = new int[N][M];
		
		for(int i=0; i<N; i++) {
			String[] temp = br.readLine().split("");
			for(int j=0; j<M; j++) {
				map[i][j] = Integer.parseInt(temp[j]);
			}
		}
		
		int res = bfs();
		System.out.println(res);
	}
}