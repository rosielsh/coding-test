package BOJ;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class boj_1244 {

	public static void main(String[] args) throws IOException {
		// 입출력 코드
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

		int total = Integer.parseInt(br.readLine()); // 스위치의 개수
		
		int[] switches = new int[total];
		StringTokenizer st = new StringTokenizer(br.readLine());
		
		for (int i = 0; i < total; i++) {
			switches[i] = Integer.parseInt(st.nextToken());
		}

		int stuCnt = Integer.parseInt(br.readLine()); // 학생의 명수
		
		for (int i = 0; i < stuCnt; i++) {
			st = new StringTokenizer(br.readLine());
			int gender = Integer.parseInt(st.nextToken());
			int number = Integer.parseInt(st.nextToken());

			// 남학생의 경우
			if (gender == 1) {
				// 뽑은 수의 배수 위치에 있는 스위치의 상태 바꾸기 
				for (int j = 0; j < total; j++) 
					if ((j + 1) % number == 0)
						switches[j] = switches[j] == 0 ? 1 : 0;
			}
			// 여햑생의 경우
			else {
				// 뽑은 수를 중심으로 좌우가 대칭이면 상태 바꾸기 
				switches[number - 1] = switches[number - 1] == 0 ? 1 : 0;
				for (int j = 1; j < total / 2; j++) {
					if (number - 1 + j >= total || number - 1 - j < 0)
						break;
					if (switches[number - 1 - j] != switches[number - 1 + j]) {
						break;
					}
					
					switches[number - 1 - j] = switches[number - 1 - j] == 0 ? 1 : 0;
					switches[number - 1 + j] = switches[number - 1 + j] == 0 ? 1 : 0;
				}
			}
		}

		// 한 줄에 20개씩 출력
		for (int i = 0; i < total; i++) {
			System.out.print(switches[i] + " ");
			if ((i + 1) % 20 == 0)
				System.out.println();
		}
	}

}
