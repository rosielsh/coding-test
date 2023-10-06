import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Queue;
import java.util.StringTokenizer;

public class boj_2623 {
    static int N, M;
    static List<Integer>[] adjList;
    static int[] insertCnt;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        N = Integer.parseInt(st.nextToken());
        M = Integer.parseInt(st.nextToken());

        adjList = new ArrayList[N + 1];
        insertCnt = new int[N + 1];

        Queue<Integer> queue = new ArrayDeque<>();
        List<Integer> res = new ArrayList<>();

        for (int i = 1; i <= N; i++) {
            adjList[i] = new ArrayList<>();
        }

        for (int i = 0; i < M; i++) {
            String[] temp = br.readLine().split(" ");
            int C = Integer.parseInt(temp[0]);

            for (int k = 1; k < C; k++) {
                int from = Integer.parseInt(temp[k]);
                int to = Integer.parseInt(temp[k + 1]);

                adjList[from].add(to);
                insertCnt[to]++;
            }
        }

        boolean[] visited = new boolean[N + 1];

        for (int i = 1; i <= N; i++) {
            if (insertCnt[i] == 0) {
                queue.add(i);
                visited[i] = true;
                res.add(i);
            }
        }

        while (queue.size() > 0) {
            int cur = queue.poll();

            for (int i = 0; i < adjList[cur].size(); i++) {
                int next = adjList[cur].get(i);
                if (visited[next])
                    continue;
                insertCnt[next]--;

                if (insertCnt[next] == 0) {
                    visited[next] = true;
                    queue.add(next);
                    res.add(next);
                }
            }
        }

        boolean isPossible = true;

        for (int i = 1; i <= N; i++) {
            if (insertCnt[i] > 0) {
                isPossible = false;
                break;
            }
        }

        if (isPossible) {
            for (int i = 0; i < res.size(); i++) {
                System.out.println(res.get(i));
            }
        } else {
            System.out.println(0);
        }
    }
}