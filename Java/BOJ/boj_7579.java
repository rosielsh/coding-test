package boj;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class boj_7579 {
    static int N, M;
    static int[] A; // 현재 활성화 된 앱 A1 - AN이 사용중인 메모리의 바이트 수 m1 - mN
    static int[] C; // 현재 앱을 비활성화 했을 경우의 비용 
    
    public static void main(String[] args) throws IOException {
        System.setIn(new FileInputStream("src/boj/input.txt"));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        
        N = Integer.parseInt(st.nextToken());
        M = Integer.parseInt(st.nextToken());
        
        st = new StringTokenizer(br.readLine());
        
        A = new int[N+1];
        for(int i=1; i<=N; i++) {
            A[i] = Integer.parseInt(st.nextToken());
        }
        

        st = new StringTokenizer(br.readLine());
        
        C = new int[N+1];
        for(int i=1; i<=N; i++) {
            C[i] = Integer.parseInt(st.nextToken());
        }
        
        // 구하는 것 : 필요한 메모리 M 바이트를 확보하기 이한 앱 비활성화의 최소 비용
        int[][] dp = new int[N+1][10001];
        
        for(int i=0; i<=100; i++) {
            dp[0][i] = 0;
        }
        
        int minCost = Integer.MAX_VALUE;
        
        for(int i=1; i<=N; i++) {
            for(int j=0; j<=10000; j++) {
                // 최대 비활성화 비용 : j, 현재 비활성화 비용 : C[i]
                // 현재 최대 비활성화 비용보다 비활성화 하려는 앱의 추가 비용이 더 적으면 비활성화 
                if(C[i] <= j) {
                    dp[i][j] = Math.max(dp[i-1][j], dp[i-1][j-C[i]] + A[i]);
                }
                // 비활성화 하지 않음
                else {
                    dp[i][j] = dp[i-1][j];
                }
            }
        }
        
        for(int i=1; i<=N; i++) {
            for(int j=1; j<=10000; j++) {
                if(dp[i][j] >= M) {
                    minCost = Math.min(minCost, j);
                    break;
                }
            }
        }
        
        System.out.println(minCost);
    }
}