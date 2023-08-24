package BOJ;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.Scanner;
import java.util.StringTokenizer;

public class boj_2023 {
	static int N;
	static StringBuilder sb = new StringBuilder();
	
	static boolean isPrime(int num) {
		
		for(int i=2; i<=Math.sqrt(num); i++) {
			if(num % i == 0) return false;
		}
		
		return true;
	}
	
	static void search(int depth, int num) {
		
		if(!isPrime(num)) return;
		
		if(depth == N) {
			// num 확인 
			if(isPrime(num)) {
				sb.append(num).append("\n");
			}
			return;
		}
		
		// 다음 수 결정 
		for(int i=1; i<=9; i+=2) {
			search(depth+1, num*10+i);
		}
	}
	
	public static void main(String[] args) throws Exception {
		// TODO Auto-generated method stub
		System.setIn(new FileInputStream("src/boj/input.txt"));
		Scanner sc = new Scanner(System.in);

		N = sc.nextInt();
		
		search(1, 2);
		search(1, 3);
		search(1, 5);
		search(1, 7);
		
		System.out.println(sb.toString().trim());
	}

}
