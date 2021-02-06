/*
[2021 카카오 블라인드 채용 : 순위검색]
  - 문제 출처 : https://programmers.co.kr/learn/courses/30/lessons/72411

  @ 알고리즘
  - 조합
  
  @ params
  - orders: 주문 기록 / ["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"]
  - course: 만들고자 하는 코스의 요리 개수 / [2, 3, 4]
  
  @ result
  - 추가하게 될 코스요리의 메뉴 구성
  - 각 코스별 최빈 주문 조합만, 최빈 주문 조합이 여러 개일 경우 전부 포함
  - 오름차순 정렬
*/

function pipeline( init, ...args ) {
  return args.reduce((result, fn) => fn(result), init);
}

function solution(orders, course) {
  return pipeline(orders, getTotalCombination, filterBestCombination);


  function getTotalCombination(orders) {
    let result = {};
    orders.forEach(item => {
      getCombination([ ...item ].sort())
      .forEach(c => result[c] = result[c] + 1 || 1);
    });
    return result;
  }

  function filterBestCombination(combiList) {
    let max = course.reduce((acc, n) => (
      { ...acc, [n]: { key: [], value: 0 } }), {});

    for (let key of Object.keys(combiList)) {
      const n = key.length;
      const value = combiList[key];
      if (value < 2) continue;
      
      if (value > max[n].value) {
        max[n].key = [ key ];
        max[n].value = value;

      } else if (value === max[n].value) {
        max[n].key.push(key);
      }
    }

    return Object.keys(max)
           .reduce((acc, n) => [ ...acc, ...max[n].key ], [])
           .sort();
  }

  function getCombination(arr) {
    let result = [];
    let max = course.slice(-1);
    combinate(arr);
    return result;

    function isMatchCount(d) {
      for (let n of course) {
        if (d === n) return true;
      }
    }

    function combinate(arr, acc = '', index = 0, d = 0) {
      if (isMatchCount(d)) result.push(acc);    
      if (d >= max) return;

      for (let i = index; i < arr.length; i++) {
        combinate(arr, acc + arr[i], i + 1, d + 1);
      }
    }
  }
}


const testcase = [
  [["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"], [2, 3, 4]],
  [["ABCDE", "AB", "CD", "ADE", "XYZ", "XYZ", "ACD"], [2, 3, 5]],
  [["XYZ", "XWY", "WXA"], [2, 3, 4]],
];

const answer = [
  ["AC", "ACDE", "BCFG", "CDE"],
  ["ACD", "AD", "ADE", "CD", "XYZ"],
  ["WX", "XY"]
];


new function test() {
  testcase.forEach((t, i) => {
    const result = solution(...t);
    console.log(`
      정답: ${answer[i]}
      결과: ${result}
    `)
  });
}();