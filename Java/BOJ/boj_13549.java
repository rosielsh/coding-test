import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.StringTokenizer;

public class boj_13549 {

	static int N, K;
	static int time;
	
	static void bfs() {
		Deque<int[]> deque = new ArrayDeque<>();
		deque.add(new int[] {N, 0});
		
		boolean[] visited = new boolean[100001];
		
		while(deque.size() > 0) {
			int[] cur = deque.poll();
			
			int x = cur[0];
			int t = cur[1];
			
			if(x == K) {
				time = t;
				return;
			}
			
			if(visited[x]) continue;
			visited[x] = true;

			if(2*x <= 100000 && !visited[2*x]) {
				deque.addFirst(new int[] {x*2, t});
			}
			
			if(x+1 <= 100000 && !visited[x+1]) {
				deque.add(new int[] {x+1, t+1});
			}
			
			if(x-1 >= 0 && !visited[x-1]) {
				deque.add(new int[] {x-1, t+1});
			}
		}
	}
	
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());
		
		N = Integer.parseInt(st.nextToken());
		K = Integer.parseInt(st.nextToken());
		
		bfs();
		
		System.out.println(time);
	}

}