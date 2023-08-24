package BOJ;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.Scanner;
import java.util.StringTokenizer;

public class boj_11055 {

	public static void main(String[] args) throws IOException {
		// TODO Auto-generated method stub
		System.setIn(new FileInputStream("src/boj/input.txt"));
		Scanner sc = new Scanner(System.in);

		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());
		
		int N = Integer.parseInt(st.nextToken());
		
		int[] A = new int[N];
		
		st = new StringTokenizer(br.readLine());
		for(int i=0; i<N; i++) {
			A[i] = Integer.parseInt(st.nextToken());
		}
		
		int[] dp = new int[N];
		dp[0] = A[0];
		
		for(int i=1; i<N; i++) { // 모든 dp의 원소를 갱신
			dp[i] = A[i];
			for(int j=0; j<i; j++) { // 처음부터 지금 원소 전까지 
				// 앞에있는 숫자보다 크면 (증가)
				if(A[j] < A[i]) {
					dp[i] = Math.max(dp[i], dp[j] + A[i]);
				}
			}
		}
		
		int maxValue = Integer.MIN_VALUE;
		for(int i=0; i<N; i++) {
			maxValue = Math.max(maxValue, dp[i]);
		}
		
		System.out.println(maxValue);
	}

}
