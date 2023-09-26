package SWEA;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class swea_9229 {
	static int N, weight; // 과자 봉지 개수, 무게의 합 제한
	static int[] snacks; // 과자들의 무게를 저장하는 배열
	static int maxValue; // 결과값인 최대값 저장하는 변수

	/**
	 * 2개의 조합을 구하는 함수
	 * 
	 * @param depth : 뽑은 개수
	 * @param index : 뽑는 것을 시작하는 인덱스
	 * @param sum   : 지금까지의 합
	 */

	static void combi(int depth, int index, int sum) {
		// 종료 조건
		if (depth == 2) {
			// 지금까지의 과자의 합이 제한 무게보다 작을 때
			if (sum <= weight) {
				maxValue = Math.max(maxValue, sum); // 최대값 갱신
			}
			return;
		}

		// 다음 과자 뽑기
		for (int i = index; i < N; i++) {
			if (sum + snacks[i] > weight)
				continue; // 현재 과자를 뽑았을 때 제한 무게보다 무거우면 pass
			combi(depth + 1, i + 1, sum + snacks[i]);
		}
	}

	public static void main(String[] args) throws IOException {
		System.setIn(new FileInputStream("src/swea/input.txt"));
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());

		int T = Integer.parseInt(st.nextToken());

		for (int i = 0; i < T; i++) {
			// 입력
			st = new StringTokenizer(br.readLine());

			N = Integer.parseInt(st.nextToken());
			weight = Integer.parseInt(st.nextToken());

			snacks = new int[N];
			st = new StringTokenizer(br.readLine());

			for (int j = 0; j < N; j++) {
				snacks[j] = Integer.parseInt(st.nextToken());
			}

			// 로직
			maxValue = Integer.MIN_VALUE;
			combi(0, 0, 0);

			// 출력
			System.out.printf("#%d %d\n", i + 1, maxValue == Integer.MIN_VALUE ? -1 : maxValue);
		}
	}

}
