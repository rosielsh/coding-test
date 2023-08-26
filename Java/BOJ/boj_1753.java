import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.PriorityQueue;
import java.util.StringTokenizer;

public class boj_1753 {
	static int V, E;
	static int K;
	static List<int[]>[] graph;
	
	static int[] dist;
	static boolean[] visited;
	
	static void dijkstra() {
		PriorityQueue<int[]> pq = new PriorityQueue<>((int[] a, int[] b) -> {
			return a[1] - b[1];
		}) ;
		
		pq.add(new int[] {K, 0});
		dist[K] = 0;
		int cnt = 0;
		
		while(!pq.isEmpty()) {
			int[] cur = pq.poll();
			int curNode = cur[0];
			
			if(visited[curNode]) continue;
			visited[curNode] = true;
			
			cnt++;
			if(cnt == V) break; 
			
			for(int i=0; i<graph[curNode].size(); i++) {
				int[] next = graph[curNode].get(i);
				
				int nextNode = next[0];
				int nextWeight = next[1];
				
                if(dist[nextNode] > dist[curNode] + nextWeight) {
					dist[nextNode] = dist[curNode] + nextWeight;
					pq.add(new int[] {nextNode, dist[curNode] + nextWeight});
				}
			}
		}
		
	}
	
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());
		
		V = Integer.parseInt(st.nextToken());
		E = Integer.parseInt(st.nextToken());
		
		st = new StringTokenizer(br.readLine());
		K = Integer.parseInt(st.nextToken());
		
		graph = new List[V+1];
		
		for(int i=1; i<=V; i++) {
			graph[i] = new ArrayList<>();
		}
		
		dist = new int[V+1];
		for(int i=0; i<=V; i++) {
			dist[i] = Integer.MAX_VALUE;
		}
		
		for(int i=0; i<E; i++) {
			st = new StringTokenizer(br.readLine());
			int from = Integer.parseInt(st.nextToken());
			int to = Integer.parseInt(st.nextToken());
			int weight = Integer.parseInt(st.nextToken());
			
			graph[from].add(new int[] {to, weight});
		}
		
		visited = new boolean[V+1];
		
		dijkstra();
		
		StringBuilder sb = new StringBuilder();
		for(int i=1; i<=V; i++) {
			int d = dist[i];
			sb.append(d == Integer.MAX_VALUE ? "INF" : d).append("\n");
		}
		System.out.print(sb.toString());
	}
}