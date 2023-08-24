package BOJ;

import java.util.*;
import java.io.*;

public class boj_1012 {

	static int M, N, K;
	static int[][] land;
	static int cnt;
	static int[] dx = {-1, 0, 1, 0};
	static int[] dy = {0, -1, 0, 1};
	
	public static void bfs(int x, int y) {
		Queue<int[]> q = new LinkedList<int[]>();
		q.add(new int[] {x, y});
		
		while(!q.isEmpty()) {
			int[] cur = q.poll();
			
			for(int i=0; i<4; i++) {
				int nx = cur[0] + dx[i];
				int ny = cur[1] + dy[i];
				
				if(nx < 0 || nx >= N || ny < 0 || ny >= M) continue;
				if(land[nx][ny] == 0) continue;
				
				land[nx][ny] = 0;
				q.add(new int[] {nx, ny});
			}
		}
	}
	
	public static void main(String[] args) throws Exception {
		// TODO Auto-generated method stub
		System.setIn(new FileInputStream("src/boj/input.txt"));
		Scanner sc = new Scanner(System.in);

		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());

		int T = Integer.parseInt(st.nextToken());
		
		for(int t=0; t<T; t++) {
			cnt = 0;
			st = new StringTokenizer(br.readLine());
			
			M = Integer.parseInt(st.nextToken());
			N = Integer.parseInt(st.nextToken());
			K = Integer.parseInt(st.nextToken());
			
			land = new int[N][M];
			
			for(int i=0; i<K; i++) {
				st = new StringTokenizer(br.readLine());
				int x = Integer.parseInt(st.nextToken());
				int y = Integer.parseInt(st.nextToken());
				
				land[y][x] = 1;
			}
			
			for(int i=0; i<N; i++) {
				for(int j=0; j<M; j++) {
					if(land[i][j] == 1) {
						bfs(i, j);
						cnt++;
					}
				}
			}
			
			System.out.println(cnt);
		}
		
	}
}