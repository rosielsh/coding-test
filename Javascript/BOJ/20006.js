const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [p, m] = input.shift().split(" ").map(Number);

const rooms = []; // 방 정보를 저장하는 맵 (처음 들어간 사람의 레벨, 닉네임들)

for (let i = 0; i < p; i++) {
    const [level, nickname] = input[i].split(" ").map((ele, idx) => {
        if (idx === 0) return Number(ele);
        return ele;
    });

    if (rooms.length === 0) {
        rooms.push([level, [[level, nickname]]]);
    } else {
        // 전체 방 순회
        let isCreated = false;

        for (let r = 0; r < rooms.length; r++) {
            const [stdLevel, users] = rooms[r];
            if (users.length >= m || stdLevel - 10 > level || stdLevel + 10 < level) continue;

            rooms[r] = [stdLevel, [...users, [level, nickname]]];
            isCreated = true;
            break;
        }

        if (!isCreated) {
            rooms.push([level, [[level, nickname]]]);
        }
    }
}

// console.log(rooms);

const answer = [];
for (let room of rooms) {
    if (room[1].length >= m) {
        answer.push("Started!");
    } else {
        answer.push("Waiting!");
    }

    const users = [...room[1]];

    // 문자열은 빼기 연산이 안먹어서 <, >, ===으로 기준 판단
    users.sort((a, b) => {
        if (a[1] > b[1]) return 1; // 오름차순
        else if (a[1] < b[1]) return -1;
        return 0;
    });

    for (let [level, nickname] of users) {
        answer.push(`${level} ${nickname}`);
    }
}

console.log(answer.join("\n"));
