package SWEA;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class swea_1954 {

	static int[] dx = {0, 1, 0, -1};
	static int[] dy = {1, 0, -1, 0};
	
	public static void main(String[] args) throws IOException {
		// TODO Auto-generated method stub
		System.setIn(new FileInputStream("src/algorithm/input.txt"));
		
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());
		
		int T = Integer.parseInt(st.nextToken());
		
		for(int i=0; i<T; i++) {
			st = new StringTokenizer(br.readLine());
			int N = Integer.parseInt(st.nextToken());
			
			int[][] result = new int[N][N]; // 결과를 저장할 배열 
			
			int d = 0;
			int x = 0;
			int y = 0;
			
			for(int num=1; num<=N*N; num++) {
				result[x][y] = num;
				
				x += dx[d];
				y += dy[d];
				
				// 다음 범위에 벗어나거나 이미 채워진 원소를 만나면 
				if(x < 0 || x >= N || y < 0 || y >= N  || result[x][y] != 0) {
					x -= dx[d];
					y -= dy[d];
					d = (d+1) % 4;
					x += dx[d];
					y += dy[d];
				}
			}
			

			StringBuilder sb = new StringBuilder();
			sb.append("#").append(i+1).append("\n");
			
			for(int j=0; j<N; j++) {
				for(int k=0; k<N; k++) {
					sb.append(result[j][k]);
					if(k != N-1) {
						sb.append(" ");
					}
				}
				if(j != N-1) {
					sb.append("\n");
				}
			}
			
			System.out.println(sb.toString());
		}
	}

}
