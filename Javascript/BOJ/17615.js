const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input[0];
const ball = input[1].split("");

let red = 0;
let blue = 0;
let redRev = 0;
let blueRev = 0;

for (let i = 0; i < N; i++) {
    if (ball[i] === "R") {
        red++;
        redRev++;
    } else if (ball[i] === "B") {
        blue++;
        blueRev++;
    }
}

if (ball[N - 1] === "R") {
    let cnt = 0;
    let ptr = N - 1;
    while (ptr >= 0 && ball[ptr] === "R") {
        ptr--;
        cnt++;
    }

    red -= cnt;
} else {
    let cnt = 0;
    let ptr = N - 1;
    while (ptr >= 0 && ball[ptr] === "B") {
        ptr--;
        cnt++;
    }

    blue -= cnt;
}

if (ball[0] === "R") {
    let cnt = 0;
    let ptr = 0;
    while (ptr < N && ball[ptr] === "R") {
        ptr++;
        cnt++;
    }

    redRev -= cnt;
} else {
    let cnt = 0;
    let ptr = 0;
    while (ptr < N && ball[ptr] === "B") {
        ptr++;
        cnt++;
    }

    blueRev -= cnt;
}

console.log(Math.min(red, blue, redRev, blueRev));
