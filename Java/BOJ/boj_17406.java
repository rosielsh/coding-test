package BOJ;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class boj_17406 {
	static int N, M, K; // 배열의 크기 N, M, 연산 횟수 K
	static int[][] arr; // 입력받은 배열을 저장하는 2차원 배열
	static int[][] oper; // 연산 정보를 저장하는 2차원 배열

	static boolean[] isUsed; // 순열을 뽑으면서 이전에 연산을 진행했는지의 여부를 저장하는 배열
	static int minSum = Integer.MAX_VALUE; // 배열의 행 중 최소값을 저장하는 배열 (결과값)
	static int[] dx = new int[] {1, 0, -1, 0}; // 행 방향 벡터
	static int[] dy = new int[] {0, 1, 0, -1}; // 열 방향 벡터

	// 배열의 값을 갱신하는 메서드
	static void calcResult() {
		for(int i=0; i<N; i++) { // 결과 배열의 전체 행에 대해 반복
			int sum = 0; // 각 행의 합을 저장할 변수
			for(int j=0; j<M; j++) { // 모든 열에 대해 반복
				sum += arr[i][j]; // 현재 행에 대한 합을 합산
			}
			minSum = Math.min(minSum, sum); // 최소값 갱신
		}
	}

	// 회전을 진행하는 함수
	static void rotate(int index) { // index: 현재 연산을 진행할 배열의 인덱스
		int mx = oper[index][0] - 1; // 연산을 진행할 중심 행 인덱스
		int my = oper[index][1] - 1; // 연산을 진행할 중심 열 인덱스

		int z = oper[index][2]; // 연산을 진행할 depth

		// depth만큼 반복
		for(int i=1; i<=z; i++) {
			int dir = 0; // 방향을 나타내는 인덱스
			int x = mx-i; // 회전을 시작할 행 위치
			int y = my-i; // 회전을 시작할 열 위치
			int first = arr[x][y]; // 첫 번째 위치의 값

			// 4방향에 대해 모두 회전을 진행하는 동안 반복
			while(dir < 4) {
				int nx = x + dx[dir]; // 다음 행 좌표 계산
				int ny = y + dy[dir]; // 다음 열 좌표 계산

				// 만약에 현재 진행중인 사각형의 범위에서 벗어나면 방향을 변경
				if(nx < mx - i || nx > mx + i || ny < my - i || ny > my + i) {
					dir++;
				}
				// 범위에 벗어나지 않는다면 배열의 다음 좌표에 있는 값을 현재 값으로 갱신하고, 좌표도 갱신
				else {
					arr[x][y] = arr[nx][ny];
					x = nx;
					y = ny;
				}
			}

			// 첫 위치 기준 오른쪽에 있는 값을 넣어줌
			arr[mx-i][my-i+1] = first;
		}
	}

	// 2차원 배열 복사
	static int[][] arrayCopy(int[][] array) {
		int[][] res = new int[array.length][array[0].length];

		for(int i=0; i<array.length; i++) {
			for(int j=0; j<array[0].length; j++) {
				res[i][j] = array[i][j];
			}
		}

		return res;
	}

	// 연산에 대해 순열을 뽑는 함수
	static void perm(int depth) {
		// K번을 뽑았을 때, 결과를 계산
		if(depth == K) {
			calcResult();
			return;
		}

		// 다음 연산 뽑기
		// 모든 연산자에 대해 순회
		for(int i=0; i<K; i++) {
			if(isUsed[i]) continue; // 기존에 사용했으면 pass
			isUsed[i] = true; // 사용하지 않았으면 사용 flag on
			int[][] copy = arrayCopy(arr); // 현재 depth에 대해 배열을 copy해놓기(추후 복원시키기 위한 작업)
			rotate(i); // 회전 진행
			perm(depth+1);
			isUsed[i] = false; // 사용 flag off
			arr = arrayCopy(copy); // 기존에 동일 depth에 대해 복사해놓았던 배열을 현재 arr에 다시 복사(복원시키는 작업)
		}
	}
	
	public static void main(String[] args) throws IOException {
		// TODO Auto-generated method stub
		System.setIn(new FileInputStream("src/boj/input.txt"));

		// 입력
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());
		
		N = Integer.parseInt(st.nextToken());
		M = Integer.parseInt(st.nextToken());
		K = Integer.parseInt(st.nextToken());
		
		arr = new int[N][M];
		
		for(int i=0; i<N; i++) {
			st = new StringTokenizer(br.readLine());
			for(int j=0; j<M; j++) {
				arr[i][j] = Integer.parseInt(st.nextToken()); 
			}
		}
		
		oper = new int[K][3];
		
		for(int i=0; i<K; i++) {
			st = new StringTokenizer(br.readLine());
			for(int j=0; j<3; j++) {
				oper[i][j] = Integer.parseInt(st.nextToken());
			}
		}

		isUsed = new boolean[K];

		// 로직
		perm(0);

		// 출력
		System.out.println(minSum);
	}

}
