/*
  [2021 카카오 블라인드 채용 : 순위검색]
  - 문제 출처 : https://programmers.co.kr/learn/courses/30/lessons/72412

  @ 알고리즘
  - 이진탐색(lowerbound), 조합
  
  @ params
  - info = [ "java backend junior pizza 150", ... ]
  - query = [ "- and backend and senior and - 150", ... ]
  
  @ result
  - 각 query에 대해, 조건을 만족하는 info의 개수를 배열로 반환 (ex : [ 1, 1, 1, 2, 4, 6 ])

  @ 조건
  - 각 query에서 점수를 제외한 항목은 '조건없음(-)' 일 수 있음
  - 다른 조건을 만족하고, query의 점수보다 높은 사람의 숫자를 반환

  @ 풀이
  - 각 info를 props / point로 분리
    - props: 개발 언어, 직군, 경력, 소울푸드
    - point: 점수
  
  - info가 포함될 수 있는 모든 props 조합을 생성하여, data[props] = [ ..., point ]로 기록
  - 2 * 2 * 2 * 2 = 16개 ( ex: javabackendjuniorpizza, -backendjuniorpizza, ... , ----)

  - query의 props를 추출
  - data에 해당 props의 점수 배열이 존재할 경우 점수 배열을 오름차순으로 sort
  - 정렬된 점수 배열에서 이진탐색으로 lowerbound index 탐색
  - lowerbound index를 이용해 query의 기준 점수보다 높은 점수를 받은 사람 수를 count

  @ 회고
  - 이진탐색의 시간복잡도가 logN이므로, 배열의 크기가 클수록 선형탐색(N)보다 효율적
  - 순수함수로만 구현하려고 하면 시간과 메모리가 추가로 소요되므로,
    문제풀이에서는 유연하게 사용하는 것이 좋겠음
*/


function solution(info, query) {

  const data = createData(info);
  return countData(data, query);


  function createData(info) {
    let data = {};

    info.forEach(item => {
      const parsed = parse(item);
      const props = parsed.slice(0, 4);
      const point = parsed[4] * 1;
      infoToData(data, props, point);
    }); 

    return data;
  }

  function countData(data, query) {
    let result = [];
    let sorted = {};

    for (let item of query) {
      const parsed = parse(item);
      const props = parsed.slice(0, 4).join('');
      const point = parsed[4] * 1;

      if (!data[props]) {
        result.push(0);
        continue;
      }

      if (!sorted[props]) {
        data[props].sort((a, b) => a - b);
        sorted[props] = true;
      }

      const index = lowerBoundIndex(data[props], point);
      const count = (~index) ? data[props].length - index : 0;

      result.push(count);
    }

    return result;
  }

  function lowerBoundIndex(arr, val) {
    let start = 0;
    let end = arr.length - 1;
          
    if (val > arr[end]) return -1;
    if (val < arr[start]) return 0;
    
    while (start < end) {
      let mid = parseInt((start + end) / 2);
      if (arr[mid] < val) {
        start = mid + 1;
      } else {
        end = mid;
      }
    }

    return start;
  }

  function infoToData(data, props, point, d = 0, temp = '') {
    if (d === 4) {
      if (!data[temp]) data[temp] = [];
      data[temp].push(point);
      return;
    }

    [props[d], '-'].forEach(p => {
      infoToData(data, props, point, d + 1, temp + p);
    }); 
  }

  function parse(item) {
    let result = [];
    item.split(' ').forEach(v => {
        if (v !== 'and') result.push(v);
    })
    return result;
  }
}


const info = ["java backend junior pizza 150","python frontend senior chicken 210","python frontend senior chicken 150","cpp backend senior pizza 260","java backend junior chicken 80","python backend senior chicken 50"];

const query = ["java and backend and junior and pizza 100","python and frontend and senior and chicken 200","cpp and - and senior and pizza 250","- and backend and senior and - 150","- and - and - and chicken 100","- and - and - and - 150"];

const answer = [1,1,1,1,2,4];

function test(answer, result) {
  for (let i = 0; i < result.length; i++) {
    if (result[i] !== answer[i]) return false;
  }
  return true;
}

console.log(
  test(answer, solution(info, query))
);