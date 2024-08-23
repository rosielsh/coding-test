const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const edges = input.map((x) => x.split(" ").map(Number));

class Edge {
    constructor(from, to, weight) {
        this.from = from;
        this.to = to;
        this.weight = weight;
    }
}

const edgeInfo = [];

for (let [f, t, w] of edges) {
    edgeInfo.push(new Edge(f, t, w));
}

const dist = Array.from({ length: N + 1 }, () => Infinity);
dist[1] = 0;

const bellman = () => {
    for (let i = 0; i < N - 1; i++) {
        for (let edge of edgeInfo) {
            if (dist[edge.from] + edge.weight < dist[edge.to]) {
                dist[edge.to] = dist[edge.from] + edge.weight;
            }
        }
    }

    for (let edge of edgeInfo) {
        if (dist[edge.from] + edge.weight < dist[edge.to]) {
            return false;
        }
    }

    return true;
};

console.log(
    bellman()
        ? dist
              .slice(2)
              .map((x) => (x === Infinity ? -1 : x))
              .join("\n")
        : -1
);
