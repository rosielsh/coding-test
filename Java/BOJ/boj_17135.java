import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.StringTokenizer;

public class boj_17135 {
	static int N, M, D;
	static int[][] map; 
	static int maxValue; 
	static int[][] gungSu;
	static List<int[]> enemy;
	
	static void simulation() {
		enemy = new ArrayList<>();
		for (int i = 0; i < N; i++) {
			for (int j = 0; j < M; j++) {
				if (map[i][j] == 1) {
					enemy.add(new int[] { i, j });
				}
			}
		}
		
		int killCnt = 0;
		while (!enemy.isEmpty()) {
			Set<Integer> kill = new HashSet<>();

			for (int i = 0; i < 3; i++) {
				List<int[]> candidate = new ArrayList<>();

				for (int j = 0; j < enemy.size(); j++) {
					int dist = Math.abs(enemy.get(j)[0] - gungSu[i][0]) + Math.abs(enemy.get(j)[1] - gungSu[i][1]);
					if (dist <= D) {
						candidate.add(new int[] { enemy.get(j)[0], enemy.get(j)[1], dist, j }); // j : enemy의 인덱스
					}
				}

				Collections.sort(candidate, (int[] a, int[] b) -> {
					if (a[2] == b[2]) {
						return a[1] - b[1]; 
					}
					return a[2] - b[2];
				});

				if(candidate.isEmpty()) continue;
				kill.add(candidate.get(0)[3]);
			}

			Iterator<Integer> iter = kill.iterator();
			while (iter.hasNext()) {
				enemy.set(iter.next(), null);
				killCnt++;
			}
			
			for(int i=0; i< enemy.size(); i++) {
				if(enemy.get(i) == null) {
					enemy.remove(i);
					i--;
				}
			}
        
			for (int j = 0; j < enemy.size(); j++) {
				if (enemy.get(j)[0] + 1 == N) {
					enemy.remove(j);
					j--;
				} else {
					enemy.set(j, new int[] { enemy.get(j)[0] + 1, enemy.get(j)[1] });
				}
			}
		}
		
		maxValue = Math.max(maxValue, killCnt);
	}

	static void combi(int depth, int index) {
		if (depth == 3) {
			simulation();
			return;
		}

		for (int i = index; i < M; i++) {
			gungSu[depth][1] = i;
			combi(depth + 1, i + 1);
			gungSu[depth][1] = 0;
		}
	}

	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());

		N = Integer.parseInt(st.nextToken());
		M = Integer.parseInt(st.nextToken());
		D = Integer.parseInt(st.nextToken());

		map = new int[N + 1][M];

		for (int i = 0; i < N; i++) {
			st = new StringTokenizer(br.readLine());
			for (int j = 0; j < M; j++) {
				map[i][j] = Integer.parseInt(st.nextToken());
			}
		}

		gungSu = new int[3][2];

		for (int i = 0; i < 3; i++) {
			gungSu[i][0] = N;
		}

		combi(0, 0);
		
		System.out.println(maxValue);
	}

}
