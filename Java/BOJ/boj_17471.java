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

public class boj_17471 {
	static int N;
	static int[] people;
	static List<Integer>[] graph;
	static boolean[] isSelected;
	
	static int minSub = Integer.MAX_VALUE;
	static boolean[] visited;
	
	static void bfs(boolean[] isGroup) {
		Queue<Integer> queue = new ArrayDeque<>();
		
		int start = 0;
		for(int i=0; i<N; i++) {
			if(isGroup[i]) {
				start = i;
				break;
			}
		}
		
		queue.add(start);
		visited[start] = true;
		
		while(!queue.isEmpty()) {
			int cur = queue.poll();
			
			for(int i=0; i<graph[cur].size(); i++) {
				int next = graph[cur].get(i); 
				if(visited[next]) continue;
				if(!isGroup[next]) continue;
				visited[next] = true;
				queue.add(next);
			}
		}
	}
	
	static void powerSet(int depth, int cnt) {
		if(cnt > N/2) return; 
		
		if(depth == N) {
			if(cnt == 0) return;
            
			boolean[] aGroup = new boolean[N];
			boolean[] bGroup = new boolean[N];
			
			for(int i=0; i<N; i++) {
				if(isSelected[i]) aGroup[i] = true;
				else bGroup[i] = true;
			}
			
			visited = new boolean[N]; 
			
			bfs(aGroup);
			bfs(bGroup);
			
			boolean isPossible = true;
			for(int i=0; i<N; i++) {
				if(!visited[i]) {
					isPossible = false;
					break;
				}
			}
			
			if(isPossible) {
				int sumA = 0;
				int sumB = 0;
				
				for(int i=0; i<N; i++) {
					if(aGroup[i]) sumA += people[i];
					if(bGroup[i]) sumB += people[i];
				}
				
				minSub = Math.min(minSub, Math.abs(sumA - sumB));
			}
			return;
		}
		
		isSelected[depth] = true;
		powerSet(depth+1, cnt+1);
		isSelected[depth] = false;
		powerSet(depth+1, cnt);
		
	}
	
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());
		
		N = Integer.parseInt(st.nextToken());
		people = new int[N];
		
		st = new StringTokenizer(br.readLine());
		for(int i=0; i<N; i++) {
			people[i] = Integer.parseInt(st.nextToken());
		}
		
		graph = new List[N];
		for(int i=0; i<N; i++) {
			graph[i] = new ArrayList<>();
		}
		
		for(int i=0; i<N; i++) {
			st = new StringTokenizer(br.readLine());
			int n = Integer.parseInt(st.nextToken());
			for(int j=0; j<n; j++) {
				graph[i].add(Integer.parseInt(st.nextToken())-1);
			}
		}
		
		isSelected = new boolean[N];
		powerSet(0, 0);
		System.out.println(minSub == Integer.MAX_VALUE ? -1 : minSub);
	}
}