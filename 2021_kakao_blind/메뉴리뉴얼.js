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
  - 오름차순 정렬
*/



function solution(orders, course) {
  return filterBestCombination(getTotalCombination(orders));

  function getTotalCombination(orders, course) {
    let result = {};
    orders.forEach(item => {
      getCombination([ ...item].sort(), course)
      .forEach(c => result[c] = result[c] + 1 || 1);
    });
    return result;
  }

  function filterBestCombination(combiList) {
    const max = {};
    course.forEach(n => max[n] = { key: [], value: 0 });

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
    
    const result = Object.keys(max)
                  .reduce((acc, n) => [ ...acc, ...max[n].key ], [])
                  .sort();

    return result;
  }
  
  function getCombination(arr, course) {
    let result = [];
    let max = course.slice(-1);
    combinate(arr);
    return result;
  
    function combinate(arr, acc = '', index = 0, d = 0) {
      if (isMatchCount(d)) result.push(acc);    
      if (d >= max) return;

      for (let i = index; i < arr.length; i++) {
        combinate(arr, acc + arr[i], i + 1, d + 1);
      }
    }

    function isMatchCount(d) {
      course.forEach(n => {if (d === n) return true;});
      return false;
    }  
  }
}


const testcase = [
  [["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"], [2, 3, 4]],
  // [["ABCDE", "AB", "CD", "ADE", "XYZ", "XYZ", "ACD"], [2, 3, 5]],
  // [["XYZ", "XWY", "WXA"], [2, 3, 4]],
]

testcase.forEach(t => solution(...t));