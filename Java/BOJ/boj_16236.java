package BOJ;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Queue;
import java.util.StringTokenizer;



public class boj_16236 {
	static int N;
	static int[][] area;
	static List<int[]> eatableFish;
	
	static int[] dx = {-1, 1, 0, 0};
	static int[] dy = {0, 0, -1, 1};
	
	static int sharkSize = 2;
	static int eatFish = 0;
	static int sharkX = 0;
	static int sharkY = 0;
	static int totalTime = 0;
	
	static void bfs() {
		Queue<int[]> queue = new ArrayDeque<int[]>();
		queue.add(new int[] {sharkX, sharkY, 0});
		
		boolean[][] visited = new boolean[N][N];
		visited[sharkX][sharkY] = true;
		
		while(!queue.isEmpty()) {
			int[] cur = queue.poll();
			
			if(area[cur[0]][cur[1]] < sharkSize && area[cur[0]][cur[1]] > 0 ) {
				eatableFish.add(new int[] {cur[0], cur[1], cur[2]});
			}
			
			for(int i=0; i<4; i++) {
				int nx = cur[0] + dx[i];
				int ny = cur[1] + dy[i];
				
				if(nx < 0 || nx >= N || ny < 0 || ny >= N ) continue;
				if(area[nx][ny] > sharkSize || visited[nx][ny]) continue;
				
				visited[nx][ny] = true;
				queue.add(new int[] {nx, ny, cur[2]+1});
			}
		}
		
	}
	
	static void setNextState() {
		int[] target = eatableFish.get(0);
		sharkX = target[0];
		sharkY = target[1];
		area[sharkX][sharkY] = 0;
		
		eatFish += 1;
		
		if(eatFish == sharkSize) {
			eatFish = 0;
			sharkSize += 1;
		}
		
		totalTime += target[2];
	}
	
	public static void main(String[] args) throws IOException {
		System.setIn(new FileInputStream("src/boj/input.txt"));
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());
		
		N = Integer.parseInt(st.nextToken());
		area = new int[N][N];
		
		for(int i=0; i<N; i++) {
			st = new StringTokenizer(br.readLine());
			for(int j=0; j<N; j++) {
				area[i][j] = Integer.parseInt(st.nextToken());
				
				if(area[i][j] == 9) {
					sharkX = i;
					sharkY = j;
					area[i][j] = 0;
				}
			}
		}
		
		while(true) {
			eatableFish = new ArrayList<int[]>();
			
			bfs();
			
			if(eatableFish.size() == 0) break;
			
			Collections.sort(eatableFish, (int[] o1, int[] o2) -> {
				if(o1[2] == o2[2]) {
					if(o1[0] == o2[0]) {
						return o1[1] - o2[1];
					} return o1[0] - o2[0];
				} else return o1[2] - o2[2]; // 오름차순
			});
			
			setNextState();
			
		}
		
		System.out.println(totalTime);
		
	}

}
