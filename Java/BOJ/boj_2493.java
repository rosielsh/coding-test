package BOJ;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.Stack;
import java.util.StringTokenizer;

class Data {
	int idx;
	int height;
	
	Data(int idx, int height) {
		this.idx = idx;
		this.height = height;
	}
}

public class boj_2493 {

    public static void main(String[] args) throws IOException {
        System.setIn(new FileInputStream("src/boj/input.txt"));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        
        int N = Integer.parseInt(st.nextToken());
        
        Stack<Data> stack = new Stack<>();
        
        st = new StringTokenizer(br.readLine());
        
        int[] receiveIdx = new int[N];
        
        for(int i=0; i<N; i++) {
            int curHeight = Integer.parseInt(st.nextToken());
            
            while(!stack.isEmpty()) {
            	// 현재 스택의 최상단에 있는 탑은 직전까지의 탑의 최대 높이를 나타냄 
            	// 스택에 있는 탑의 높이가 현재 넣으려고 하는 탑의 높이보다 낮다면, 이는 필요 없는 탑이다. 
            	if(stack.peek().height < curHeight) {
            		stack.pop();
            	}
            	// 만약에 넣으려고 하는 탑 보다 스택의 탑이 높다면 그 탑에 수신할 것이다.  
            	else {
            		// i번 인덱스의 탑이 수신하게될 탑의 인덱스를 저장한다. 
            		receiveIdx[i] = stack.peek().idx+1;
            		break;
            	}
            }
            
            stack.push(new Data(i, curHeight));
        }
        
        StringBuilder sb = new StringBuilder();
        
        for(int i=0; i<N; i++) {
        	sb.append(receiveIdx[i]).append(" ");
        }
        
        System.out.println(sb.toString().trim());
    }

}