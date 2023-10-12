import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class boj_17069 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        int N = Integer.parseInt(st.nextToken());

        int[][] state = new int[N + 1][N + 1];

        for (int i = 1; i <= N; i++) {
            st = new StringTokenizer(br.readLine());
            for (int j = 1; j <= N; j++) {
                state[i][j] = Integer.parseInt(st.nextToken());
            }
        }

        long[][][] dp = new long[3][N + 1][N + 1];

        dp[0][1][2] = 1;

        for (int i = 1; i <= N; i++) {
            for (int j = 1; j <= N; j++) {
                if (i == 1 && j == 1 || i == 1 && j == 2)
                    continue;

                if (state[i][j - 1] == 0) {
                    dp[0][i][j] = dp[0][i][j - 1] + dp[1][i][j - 1];
                }

                if (state[i - 1][j] == 0) {
                    dp[2][i][j] = dp[1][i - 1][j] + dp[2][i - 1][j];
                }

                if (state[i - 1][j - 1] == 0 && state[i - 1][j] == 0 && state[i][j - 1] == 0) {
                    dp[1][i][j] = dp[1][i - 1][j - 1] + dp[2][i - 1][j - 1] + dp[0][i - 1][j - 1];
                }
            }
        }

        long sum = 0;
        for (int i = 0; i < 3; i++) {
            sum += dp[i][N][N];
        }

        if (state[N][N] == 1)
            System.out.println(0);
        else
            System.out.println(sum);
    }
}