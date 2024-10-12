function solution(genres, plays) {
    var answer = [];

    const map = new Map();
    const total = new Map();

    const N = genres.length;

    for (let i = 0; i < N; i++) {
        map.set(genres[i], [...(map.get(genres[i]) || []), [i, plays[i]]]);
        total.set(genres[i], (total.get(genres[i]) || 0) + plays[i]);
    }

    const sortedGenre = [...total.entries()].sort((a, b) => b[1] - a[1]);

    for (let [gen, cnt] of sortedGenre) {
        const sortedSong = map.get(gen).sort((a, b) => {
            if (a[1] === b[1]) return a[0] - b[0];
            return b[1] - a[1];
        });

        for (let i = 0; i < sortedSong.length; i++) {
            answer.push(sortedSong[i][0]);

            if (i === 1) break;
        }
    }

    return answer;
}
