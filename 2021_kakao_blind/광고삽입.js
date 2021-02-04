/*
  [2021 카카오 블라인드 채용 : 순위검색]
  - 문제 출처 : https://programmers.co.kr/learn/courses/30/lessons/72414

  @ 알고리즘
  - 완전탐색, 구간합
  
  @ params
  - play_time: 영상 총 길이
  - adv_time: 광고 총 길이
  - logs: 시청 기록 (시작-종료)
  
  @ result
  - 광고를 삽입했을 때 누적시청시간이 가장 큰 시점을 반환
  - 누적시청시간이 같다면 가장 빠른 시점

  @ 조건
  - 영상 총 길이는 99:59:59를 넘지 않으므로 완전탐색 가능 (play_time < 360,000s)
  - logs의 개수(N)는 최대 300,000만 개

  @ 풀이
  - 모든 시간은 초 단위로 변환하여 계산 => to_sec(time)
  - play_time 만큼 길이를 갖는 배열을 생성 => total

  - 각 log에 대해 시작 시점(s)과 종료 시점(e)를 구하고 total에 기록
    => total[s] = 1, total[e] = -1
  - total 배열을 순회하며, 동시 시청자 수 계산 => watching += total[t]
    각 시점별 동시 시청자 수를 total 배열에 기록 => total[t] = watching
  
  - 0초부터 adv_time만큼의 길이를 갖는 첫번째 구간합 계산 => first
  - 첫번째 구간합으로부터 1초씩 뒤로 밀면서 구간합 계산하며
    최대값 및 최대값 시점 기록
  
  - 마지막으로 갱신된 최대값 시점을 시간 포맷으로 출력 => to_time(sec)

  @ 회고
  - 각 log의 시작시점으로부터 시작해서 logs를 한 번씩 순회해보려고 했으나,
    N^2 = 최대 30만 * 30만으로 시간초과
  - 해설 및 다른 사람들의 풀이를 참고하여 해결하였음
  - 각 log마다 total[s] ~ total[e]까지 += 1 해도 시간초과는 나지 않는 듯하지만
    total[s], total[e]만 기록하고 한 번 순회하면서 동시 시청자 수를 계산하는 것이 효율적이었음
  - 구간합으로 계산하는 것을 이해하기 전까지는 한 번에 해결방법이 이해되지 않았음
  - 항상 문제를 충분히 읽고 풀이를 시작할 것
*/


function solution(play_time, adv_time, logs) {
  const play = to_sec(play_time);
  const adv = to_sec(adv_time);

  const total = get_total_logs(play, logs);
  const first = get_first_section(adv, total);
  const max_t = get_max_section(play, adv, total, first);

  const answer = to_time(max_t);

  return answer;

  function get_max_section(play, adv, total, first) {
    let before = first;
    let max_time = before;
    let max_t = 0;

    for (let t = 1; t <= play - adv; t++) {
      const now = before - total[t - 1] + total[t + adv - 1];
      if (now > max_time) [max_time, max_t] = [now, t];
      before = now;
    }

    return max_t;
  }

  function get_first_section(adv, total) {
    return total.slice(0, adv).reduce((acc, v) => acc + v, 0);
  }

  function get_total_logs(play, logs) {
    let total = Array(play).fill(0);
  
    logs.forEach(log => {
      const [s, e] = log.split('-').map(time => to_sec(time));
      total[s] += 1;
      total[e] -= 1;
    })

    let watching = 0;
    for (let i = 0; i <= play; i++) {
      watching += total[i];
      total[i] = watching;
    }

    return total;
  }

  function to_sec(time) {
    const [HH, MM, SS] = time.split(':');
    return HH * 3600 + MM * 60 + SS * 1;
  }
  
  function to_time(sec) {
    const HH = parseInt(sec / 3600);
    sec -= HH * 3600;
    const MM = parseInt(sec / 60);
    const SS = sec - MM * 60;
    return [HH, MM, SS].map(v => v < 10 ? '0' + v : v).join(':');
  }
}


const test_case = [
  [
    "02:03:55",
    "00:14:15",
    ["01:20:15-01:45:14", "00:40:31-01:00:00",
    "00:25:50-00:48:29", "01:30:59-01:53:29",
    "01:37:44-02:02:30"]
  ],
  [
    "99:59:59",
    "25:00:00",
    ["69:59:59-89:59:59", "01:00:00-21:00:00",
     "79:59:59-99:59:59", "11:00:00-31:00:00"]
  ]
];

const answer = [
  "01:30:59",
  "01:00:00"
];

for (let i = 0; i < test_case.length; i++) {
  console.log(answer[i] === solution( ...test_case[i] ))
}
