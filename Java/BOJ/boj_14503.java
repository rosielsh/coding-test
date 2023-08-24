package BOJ;

import java.util.*;
import java.io.*;

public class boj_14503 {
	static int N, M;
	static int R, C, D;
	static int[][] room;
	static int[] dx = { -1, 0, 1, 0 };
	static int[] dy = { 0, 1, 0, -1 };
	static int cnt = 1;

	public static void dfs(int x, int y, int d) {
		room[x][y] = -1;
		
		// 반시계로 탐색하면서 청소 안한 곳 있는지 탐색  
		for(int i=0; i<4; i++) {
			d = (d+3) % 4; // 반시계 이동 
			
			int nx = x + dx[d];
			int ny = y + dy[d];
			
			if(nx < 0 || nx >= N || ny < 0 || ny >= M) continue;
			
			if(room[nx][ny] == 0) {
				cnt++;
				dfs(nx, ny, d);
				return;
			}
		}
		
		// 여기까지 왔다는 건 청소 안된 곳이 없다는 의미
		int nx = x + dx[(d + 2) % 4];
		int ny = y + dy[(d + 2) % 4];
		
		if(nx >= 0 && nx < N && ny >= 0 && ny < M && room[nx][ny] != 1) {
			dfs(nx, ny, d);
		}
		
	}

	public static void main(String[] args) throws Exception {
		// TODO Auto-generated method stub
		System.setIn(new FileInputStream("src/boj/input.txt"));
		Scanner sc = new Scanner(System.in);

		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());

		N = Integer.parseInt(st.nextToken());
		M = Integer.parseInt(st.nextToken());

		st = new StringTokenizer(br.readLine());

		R = Integer.parseInt(st.nextToken());
		C = Integer.parseInt(st.nextToken());
		D = Integer.parseInt(st.nextToken());

		room = new int[N][M];

		for (int i = 0; i < N; i++) {
			st = new StringTokenizer(br.readLine());

			for (int j = 0; j < M; j++) {
				room[i][j] = Integer.parseInt(st.nextToken());
			}
		}

		dfs(R, C, D);
		System.out.println(cnt);

	}
}