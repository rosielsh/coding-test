const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, M, K] = input.shift().split(" ").map(Number);
const notebook = Array.from({ length: N }, () => Array(M).fill(0));

const rotate = (arr) => {
  const copy = Array.from({ length: arr[0].length }, () => Array(arr.length).fill(0));

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[0].length; j++) {
      copy[j][arr.length - i - 1] = arr[i][j];
    }
  }

  return copy;
};

for (let k = 0; k < K; k++) {
  const [a, b] = input.shift().split(" ").map(Number);
  let sticker = input.splice(0, a).map((x) => x.split(" ").map(Number));

  let isAttached = false;

  for (let d = 0; d < 4; d++) {
    let sr = sticker.length;
    let sc = sticker[0].length;

    for (let i = 0; i <= N - sr; i++) {
      for (let j = 0; j <= M - sc; j++) {
        let isPossible = true;

        for (let k = 0; k < sr; k++) {
          for (let l = 0; l < sc; l++) {
            if (sticker[k][l] === 1) {
              if (i + k < 0 || i + k >= N || j + l < 0 || j + l >= M) continue;
              if (notebook[i + k][j + l] !== 0) {
                isPossible = false;
                break;
              }
            }
          }

          if (!isPossible) break;
        }

        if (isPossible) {
          isAttached = true;

          for (let r = 0; r < sr; r++) {
            for (let c = 0; c < sc; c++) {
              if (sticker[r][c]) {
                notebook[i + r][j + c] = 1;
              }
            }
          }

          break;
        }
      }

      if (isAttached) break;
    }

    if (isAttached) break;

    sticker = rotate(sticker);
  }
}

let answer = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (notebook[i][j]) answer++;
  }
}

console.log(answer);
