package BOJ;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;

public class boj_2239 {
    static int[][] board = new int[9][9]; // 전체 스도쿠 보드의 수를 저장하는 2차원 배열
    static int zeroCnt = 0; // 0의 개수
    static StringBuilder sb = new StringBuilder();

    // 현재 위치에 놓는 것이 가능한지 판단하는 함수
    static boolean isPossible(int cnt, int num) {
        int row = cnt / 9; // 현재 행
        int col = cnt % 9; // 현재 열

        // 만약 같은 행에 num 있으면 false
        for (int i = 0; i < 9; i++) {
            if (board[row][i] == num)
                return false;
        }

        // 만약 같은 열에 num 있으면 false
        for (int i = 0; i < 9; i++) {
            if (board[i][col] == num)
                return false;
        }

        // 같은 3*3에 num 있으면 false
        int areaX;
        int areaY;

        if (row < 3)
            areaX = 0;
        else if (row < 6)
            areaX = 3;
        else
            areaX = 6;

        if (col < 3)
            areaY = 0;
        else if (col < 6)
            areaY = 3;
        else
            areaY = 6;

        for (int i = areaX; i < areaX + 3; i++) {
            for (int j = areaY; j < areaY + 3; j++) {
                if (board[i][j] == num)
                    return false;
            }
        }

        return true;
    }

    // 백트래킹을 수행하는 함수
    static void solve(int idx, int zero) {
        // 그 전에 0의 개수가 1개도 없으면 종료
        if (zero == 0) {
            for (int i = 0; i < 9; i++) {
                for (int j = 0; j < 9; j++) {
                    sb.append(board[i][j]);
                }
                sb.append("\n");
            }
            System.out.println(sb.toString());
            System.exit(0);
        }

        if (board[idx / 9][idx % 9] != 0) {
            solve(idx + 1, zero);
        } else {
            // 현재 보드의 위치가 0일 때
            for (int i = 1; i <= 9; i++) {
                // 현재 위치에 i를 놓는 것이 가능하면
                if (!isPossible(idx, i))
                    continue;
                board[idx / 9][idx % 9] = i;
                solve(idx + 1, zero - 1);
                board[idx / 9][idx % 9] = 0;
            }
        }

    }

    public static void main(String[] args) throws IOException {
        System.setIn(new FileInputStream("src/BOJ/input.txt"));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        for (int i = 0; i < 9; i++) {
            String[] temp = br.readLine().split("");

            for (int j = 0; j < 9; j++) {
                board[i][j] = Integer.parseInt(temp[j]);

                if (board[i][j] == 0)
                    zeroCnt++;
            }
        }

        // 0인 숫자를 만났을 때 1-9까지 다 넣어보면서 백트래킹 함
        solve(0, zeroCnt);
    }
}
