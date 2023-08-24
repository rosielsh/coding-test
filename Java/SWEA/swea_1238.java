package SWEA;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;

public class swea_1238 {
    static List<Integer>[] graph; // 전체 친구 관계를 저장하는 그래프

    // 완전 탐색을 위한 bfs 함수
    // 인자 S: 시작 위치
    static int bfs(int S) {
        int depth = 0; // 마지막 depth를 저장해주기 위한 변수
        List<Integer> result = new ArrayList<>(); // 지금까지의 depth에 대한 숫자를 저장해주기 위한 리스트

        Queue<int[]> queue = new ArrayDeque<>(); // bfs 함수에서 사용할 queue
        queue.add(new int[] {S, 0}); // queue에 현재 원소 추가

        int[] visited = new int[101]; // 방문 처리 배열
        visited[S] = 1; // 시작 위치에 대해 방문 처리

        while(!queue.isEmpty()) { // 큐가 비어있지 않는 동안
            int[] cur = queue.poll(); // 큐의 가장 앞 원소 뽑기

            // 만약 최근에 저장된 depth보다 증가되었다면, list를 바우고 현재 원소 저장
            if(depth < cur[1]) {
                result = new ArrayList<>(); // 새로운 리스트 생성
                depth = cur[1]; // 현재 depth에 대해 깊이 변수에 저장
                result.add(cur[0]); // 결과 리스트에 현재 친구 번호 추가
            }

            // 최근에 저장된 depth와 동일한 depth를 가진 원소라면
            else if(cur[1] == depth){
                result.add(cur[0]); // 결과에 현재 친구 번호를 저장
            }

            // 현재 연결된 친구를 모두 순회하면서 연락
            for(int i=0; i<graph[cur[0]].size(); i++) {
                int next = graph[cur[0]].get(i); // 다음 연락할 친구 번호
                if(visited[next] == 1) continue; // 연락했다면 pass
                visited[next] = 1; // 연락하지 않았을 때 연락했다고 처리
                queue.add(new int[] {next, cur[1] + 1}); // queue에 다음 친구 번호 저장
            }

        }

        Collections.sort(result, Collections.reverseOrder()); // 내림 차순으로 정렬
        return result.get(0); // 현재 결과의 가장 앞에 있는 원소가 가장 큰 값이므로 해당 값 반환
    }

    public static void main(String[] args) throws IOException {
        // 입력
        System.setIn(new FileInputStream("src/SWEA/input.txt"));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st;
        StringBuilder sb = new StringBuilder();

        // 모든 테스트 케이스에 대해 순회
        for(int t=0; t<10; t++) {
            st = new StringTokenizer(br.readLine());

            int N = Integer.parseInt(st.nextToken());
            int S = Integer.parseInt(st.nextToken());

            graph = new List[101];
            for(int i=1; i<=100; i++) {
                graph[i] = new ArrayList<>();
            }

            st = new StringTokenizer(br.readLine());
            for(int i=0; i<N/2; i++) {
                int from = Integer.parseInt(st.nextToken());
                int to = Integer.parseInt(st.nextToken());
                graph[from].add(to);
            }

            // bfs 함수 실행
            int res = bfs(S);

            // 출력
            sb.append("#").append(t+1).append(" ").append(res).append("\n");
        }

        System.out.print(sb.toString());
    }
}
