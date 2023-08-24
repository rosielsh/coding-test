package BOJ;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;
import java.util.StringTokenizer;

public class boj_2961 {
	static int N;
	static List<int[]> food;
	static int minSub = Integer.MAX_VALUE;
	
	static void makeFood(int cnt, int depth, int s, int b) {
		// 모두 선택했으면 
		if(depth == N) {
			if(cnt == 0) return;
			// 최소의 차를 가지는지 확인
			minSub = Math.min(minSub, Math.abs(s-b));
			return;
		}
		
		makeFood(cnt+1, depth+1, s*food.get(depth)[0], b+food.get(depth)[1]);
		makeFood(cnt, depth+1, s, b);
	}

	public static void main(String[] args) throws Exception {
		// TODO Auto-generated method stub
		System.setIn(new FileInputStream("src/boj/input.txt"));
		Scanner sc = new Scanner(System.in);

		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine()); 
		
		N = Integer.parseInt(st.nextToken());
		
		food = new ArrayList<int[]>();
		
		for(int i=0; i<N; i++) {
			st = new StringTokenizer(br.readLine()); 
			int a = Integer.parseInt(st.nextToken());
			int b = Integer.parseInt(st.nextToken());
			
			food.add(new int[] {a, b});
		}
		
		makeFood(0, 0, 1, 0);
		
		System.out.println(minSub);
	}

}
