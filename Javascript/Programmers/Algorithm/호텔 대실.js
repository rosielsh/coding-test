function solution(book_time) {
    var answer = 0;

    book_time = book_time.map(([start, end]) => {
        const st = start.split(":").map(Number);
        const ed = end.split(":").map(Number);

        return [st[0] * 60 + st[1], ed[0] * 60 + ed[1]];
    });

    book_time.sort((a, b) => a[0] - b[0]);
    const room = [book_time[0][1] + 10];

    for (let i = 1; i < book_time.length; i++) {
        const [start, end] = book_time[i];
        room.sort((a, b) => a - b); // 끝나는 시간이 빠른 순으로 정렬

        let isReserved = false;

        for (let j = 0; j < room.length; j++) {
            if (room[j] <= start) {
                room[j] = end + 10; // 그 방 예약
                isReserved = true;
                break;
            }
        }

        if (!isReserved) {
            room.push(end + 10);
        }
    }

    answer = room.length;

    return answer;
}
