import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Scanner;
import java.util.StringTokenizer;

public class Main {
	static int N, M, H;
	static int[][] ladder;
	static ArrayList<int[]> rowPos = new ArrayList<>();
	static int minCnt = Integer.MAX_VALUE;

	public static void calcRowPos() {
		for(int i=0; i<H; i++) {
			for(int j=0; j<N-1; j++) {
				
				if(ladder[i][j] == 1) continue;
				
				if(j == 0) {
					if(ladder[i][j+1] == 0) {
						rowPos.add(new int[] {i, j});
					}
				}
				else if(j == N-2) {
					if(ladder[i][j-1] == 0) {
						rowPos.add(new int[] {i, j});
					}
				}
				else {
					if(ladder[i][j-1] == 0 && ladder[i][j+1] == 0) {
						rowPos.add(new int[] {i, j});
					}
				}
				
			}
		}
	}
	
	public static boolean checkResult() {
		int[] result = new int[N];
		
		for(int i=0; i<N; i++) {
			result[i] = 0;
		}
		
		for(int i=0; i<N; i++) {
			int curCol = i;
			for(int j=0; j<H; j++) {
				if(curCol == 0) {
					if(ladder[j][curCol] == 1) {
						curCol += 1;
					}
				} 
				else if(curCol == N-1) {
					if(ladder[j][curCol-1] == 1) {
						curCol -= 1;
					}
				} else {
					if(ladder[j][curCol-1] == 1) {
						curCol -= 1;
					} else if(ladder[j][curCol] == 1) {
						curCol += 1;
					}
				}
			}

			result[i] = curCol;
		}
		
		for(int i=0; i<N; i++) {
			if(i != result[i]) return false;
		}
		return true;
	}
	
	public static void dfs(int depth, int index) {
		if(depth == 4) {
			return;
		}
		
		boolean isCorrect = false;
		isCorrect = checkResult();
		
		if(isCorrect == true) {
			minCnt = Math.min(depth, minCnt);
			return;
		}
		
		for(int i=index; i<rowPos.size(); i++) {
			int x = rowPos.get(i)[0];
			int y = rowPos.get(i)[1];
			ladder[x][y] = 1; // 가로선 긋기 
			dfs(depth+1, i+1);
			ladder[x][y] = 0; // 가로선 제거 
		}
		
	}
	
	public static void main(String[] args) throws Exception {
				Scanner sc = new Scanner(System.in);
				
				BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
				StringTokenizer st = new StringTokenizer(br.readLine());
				
				N = Integer.parseInt(st.nextToken());
				M = Integer.parseInt(st.nextToken());
				H = Integer.parseInt(st.nextToken());
				
				ladder = new int[H][N];
				
				for(int i=0; i<H; i++) {
					for(int j=0; j<N; j++) {
						ladder[i][j] = 0;
					}
				}
				 
				for(int i=0; i<M; i++) {
					st = new StringTokenizer(br.readLine());
					int x = Integer.parseInt(st.nextToken());
					int y = Integer.parseInt(st.nextToken());
					
					ladder[x-1][y-1] = 1;
				}
        
				calcRowPos();
				dfs(0, 0);	
				System.out.println(minCnt == Integer.MAX_VALUE ? -1 : minCnt);
				
	}

}
