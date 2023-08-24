package BOJ;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.Scanner;
import java.util.StringTokenizer;

public class boj_2346 {

	public static void main(String[] args) throws Exception {
		// TODO Auto-generated method stub
		
		System.setIn(new FileInputStream("src/boj/input.txt"));
		Scanner sc = new Scanner(System.in);

		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());

		int N = Integer.parseInt(st.nextToken());
		
		st = new StringTokenizer(br.readLine());
		
		int[] balloon = new int[N];
		
		for(int i=0; i<N; i++) {
			balloon[i] = Integer.parseInt(st.nextToken());
		}
		
		StringBuilder sb = new StringBuilder();
		sb.append("1 ");
		
		int totalCnt = N-1;
		int index = 0;
		
		int[] visited = new int[N];
		
		for(int i=0; i<N; i++) {
			visited[i] = 0;
		}
		
		while(totalCnt > 0) {
			visited[index] = 1;
			
			int move = balloon[index];
			
			if(move > 0) {
				int leftMove = move;
				while(leftMove > 0) {
					index = (index + 1) % N;
					if(visited[index] == 0) {
						leftMove--;
					}
				}
			}
			else {
				int leftMove = Math.abs(move);
				while(leftMove > 0) {
					index = index-1;
					if(index == -1) index = N-1;
					
					if(visited[index] == 0) {
						leftMove--;
					}
				}
			}
			
			totalCnt--;
			sb.append(index+1);
			sb.append(" ");
		}
		
		System.out.println(sb);
	}
}
