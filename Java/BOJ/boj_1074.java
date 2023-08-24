package BOJ;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.Scanner;
import java.util.StringTokenizer;

public class boj_1074 {
	static int N;
	static int r; // 탐색할 행
	static int c; // 탐색할 열

	static int order = 0;

	public static void search(int x, int y, int size) {
		if (size == 1) {
			System.out.println(order);
			return;
		}

		int nextSize = size / 2;

		// 왼쪽 위
		if (r < x + nextSize && c < y + nextSize) {
			search(x, y, nextSize);
		}
		// 오른쪽 위
		else if (r < x + nextSize && c >= y + nextSize) {
			order += nextSize * nextSize;
			search(x, y + nextSize, nextSize);
		}
		// 왼쪽 아래
		else if (r >= x + nextSize && c < y + nextSize) {
			order += nextSize * nextSize * 2;
			search(x + nextSize, y, nextSize);
		}
		// 오른쪽 아래
		else {
			order += nextSize * nextSize * 3;
			search(x + nextSize, y + nextSize, nextSize);
		}
	}

	public static void main(String[] args) throws Exception {
		// TODO Auto-generated method stub
		System.setIn(new FileInputStream("src/boj/input.txt"));
		Scanner sc = new Scanner(System.in);

		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());

		N = Integer.parseInt(st.nextToken());
		r = Integer.parseInt(st.nextToken());
		c = Integer.parseInt(st.nextToken());

		search(0, 0, (int) Math.pow(2, N));
	}
}
