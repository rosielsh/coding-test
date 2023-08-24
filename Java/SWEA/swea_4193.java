package SWEA;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Scanner;
import java.util.StringTokenizer;

public class swea_4193 {
	
	static int N;
	static int[][] sea;
	static int[] start;
	static int[] end;
	static int[][] visited;
	static int[] dx = { 0, 0, -1, 1 };
	static int[] dy = { -1, 1, 0, 0 };

	static int bfs() {
		Queue<int[]> queue = new LinkedList<>();
		queue.add(new int[] { start[0], start[1], 0 });

		while (queue.size() != 0) {
			int[] info = queue.poll();
			int x = info[0];
			int y = info[1];
			int time = info[2];

			if (x == end[0] && y == end[1]) {
				return time;
			}

			for (int i = 0; i < 4; i++) {
				int nx = x + dx[i];
				int ny = y + dy[i];

				if (nx < 0 || nx >= N || ny < 0 || ny >= N || sea[nx][ny] == 1 || visited[nx][ny] == 1)continue;
				
				// 소용돌이를 만났을 때
				if(sea[nx][ny] == 2) {
					if(time % 3 == 2) {
						visited[nx][ny] = 1;
						queue.add(new int[] {nx, ny, time+1});
					}
					else {
						visited[x][y] = 1;
						queue.add(new int[] {x, y, time+1});
					}
				}
				
				else {
					visited[nx][ny] = 1;
					queue.add(new int[] { nx, ny, time+1 });
				}
			}
		}

		return -1;
	}

	public static void main(String[] args) throws IOException {
		// TODO Auto-generated method stub
		System.setIn(new FileInputStream("src/swea/input.txt"));
		Scanner sc = new Scanner(System.in);

		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());

		int T = Integer.parseInt(st.nextToken());

		for (int i = 1; i <= T; i++) {
			st = new StringTokenizer(br.readLine());
			N = Integer.parseInt(st.nextToken());

			sea = new int[N][N];

			for (int j = 0; j < N; j++) {
				st = new StringTokenizer(br.readLine());
				for (int k = 0; k < N; k++) {
					sea[j][k] = Integer.parseInt(st.nextToken());
				}
			}

			start = new int[2];
			end = new int[2];

			st = new StringTokenizer(br.readLine());
			start[0] = Integer.parseInt(st.nextToken());
			start[1] = Integer.parseInt(st.nextToken());

			st = new StringTokenizer(br.readLine());
			end[0] = Integer.parseInt(st.nextToken());
			end[1] = Integer.parseInt(st.nextToken());

			visited = new int[N][N];

			int minTime = bfs();
			System.out.printf("#%d %d\n", i, minTime);
		}
	}

}