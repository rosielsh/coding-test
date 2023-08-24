package BOJ;

import java.io.*;
import java.util.*;

public class boj_15686 {
    static int N, M;
    static int[][] city;
    static ArrayList<int[]> chickenPos;
    static int minCityDistance = Integer.MAX_VALUE;
    static int[] closed;

    public static void main(String[] args) throws IOException {
    	System.setIn(new FileInputStream("src/boj/input.txt"));
		Scanner sc = new Scanner(System.in);

		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		
    	String NM = br.readLine();
        String[] cityStr = br.readLine().split(" ");
        N = Integer.parseInt(NM.split(" ")[0]);
        M = Integer.parseInt(NM.split(" ")[1]);

        city = new int[N][N];
        chickenPos = new ArrayList<>();
        closed = new int[M];

        for (int i = 0; i < N; i++) {
            String[] row = cityStr[i].split(" ");
            for (int j = 0; j < N; j++) {
                city[i][j] = Integer.parseInt(row[j]);
                if (city[i][j] == 2) {
                    chickenPos.add(new int[]{i, j});
                }
            }
        }

        combination(0, 0);
        System.out.println(minCityDistance);
    }

    public static int[][] calcChickenPos() {
        ArrayList<int[]> pos = new ArrayList<>();
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                if (city[i][j] == 2) {
                    pos.add(new int[]{i, j});
                }
            }
        }
        return pos.toArray(new int[0][]);
    }

    public static void calcCityDistance() {
        int cityDistance = 0;

        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                if (city[i][j] == 1) {
                    int minDistance = Integer.MAX_VALUE;
                    for (int pos = 0; pos < chickenPos.size(); pos++) {
                        if (closed[pos] == 1) continue;
                        int curChickenDistance =
                                Math.abs(i - chickenPos.get(pos)[0]) + Math.abs(j - chickenPos.get(pos)[1]);
                        minDistance = Math.min(minDistance, curChickenDistance);
                    }
                    cityDistance += minDistance;
                }
            }
        }
        minCityDistance = Math.min(cityDistance, minCityDistance);
    }

    public static void combination(int depth, int idx) {
        if (depth == M) {
            calcCityDistance();
            return;
        }

        for (int i = idx; i < chickenPos.size(); i++) {
            closed[i] = 0;
            combination(depth + 1, i + 1);
            closed[i] = 1;
        }
    }

}