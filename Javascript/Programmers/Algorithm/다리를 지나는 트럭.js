function solution(bridge_length, weight, truck_weights) {
    var answer = 0;
    const queue = Array.from({ length: bridge_length }, () => 0);
    let bridgeSum = 0;

    while (truck_weights.length > 0 || bridgeSum > 0) {
        answer++;

        bridgeSum -= queue.shift();

        if (truck_weights.length > 0 && bridgeSum + truck_weights[0] <= weight) {
            const truck = truck_weights.shift();
            queue.push(truck);
            bridgeSum += truck;
        } else {
            queue.push(0);
        }
    }

    return answer;
}
