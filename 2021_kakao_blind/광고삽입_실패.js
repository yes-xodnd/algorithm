function solution(play_time, adv_time, logs_time) {
  const play = time_to_sec(play_time);
  const adv = time_to_sec(adv_time);
  const L = logs_time.length + 1;

  console.log(adv)

  const logs = logs_to_sec(logs_time);
  const max_start = get_max_start(play, adv, logs);
  const answer = sec_to_time(max_start);
  return answer;

  function get_max_start(play, adv, logs) {
    let max_time = 0;
    let max_start = 0;

    for (let i = 0; i < L; i++) {
      const adv_s = logs[i][0];
      const adv_e = adv_s + adv;
      
      if (adv_e > play) break;

      const acc = get_acc_time(i, adv_e);
      console.log(sec_to_time(adv_s), acc, max_time)
      if (acc > max_time) [max_time, max_start] = [acc, adv_s];
    }

    return max_start;
  }

  function get_acc_time(i, adv_e) {
    let acc = 0;
    for (let j = i; j < L; j++) {
      const [s, e] = logs[j];
      if (s >= adv_e) break;
      const watch_time = (adv_e < e ? adv_e : e) - s;
      acc += watch_time;
    }

    return acc;
  }


  function logs_to_sec(logs_time) {
    let logs = logs_time.map(v => (
      v.split('-').map(time => time_to_sec(time))
    )).sort((a, b) => a[0] - b[0]);

    logs.unshift([0, 0]);

    return logs;
  }

  function time_to_sec(time) {
    const [HH, MM, SS] = time.split(':');
    return HH * 3600 + MM * 60 + SS * 1;
  }
  
  function sec_to_time(sec) {
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
