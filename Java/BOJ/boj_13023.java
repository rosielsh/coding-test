package BOJ;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;

public class boj_13023 {
    static int N, M;
    static List<Integer>[] graph;
    static int[] visited;
    static int isExist = 0;
    static void dfs(int depth, int x) {
        if(depth == 4) {
            isExist = 1;
            return;
        }

        for(int i=0; i<graph[x].size(); i++) {
            int next = graph[x].get(i);
            if(visited[next] == 1) continue;
            visited[next] = 1;
            dfs(depth+1, next);
            visited[next] = 0;
        }
    }

    public static void main(String[] args) throws IOException {
        System.setIn(new FileInputStream("src/boj/input.txt"));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        N = Integer.parseInt(st.nextToken());
        M = Integer.parseInt(st.nextToken());

        graph = new List[N];

        for(int i=0; i<N; i++) {
            graph[i] = new ArrayList<>();
        }

        for(int i=0; i<M; i++) {
            st = new StringTokenizer(br.readLine());
            int from = Integer.parseInt(st.nextToken());
            int to = Integer.parseInt(st.nextToken());

            graph[from].add(to);
            graph[to].add(from);
        }

        for(int i=0; i<N; i++) {
            visited = new int[N];

            visited[i] = 1;
            dfs(0, i);

            if(isExist == 1) break;
        }

        System.out.println(isExist);

    }

}