function solution(board, r, c) {

  const D = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  const cards = get_cards_position(board);
  console.log(cards)

  // 시작
  // 가장 가까운 카드 찾기
  // 짝 찾기
  // ... 반복

  function find_closest_card(board, r, c) {
    let count = 0;
    if (board[r][c]) return [count, board[r][c], r, c];

    let Q = [ [r, c] ];
    while (Q) {
      count += 1;
      let [r, c] = Q.shift();
      D.forEach(([dr, dc]) => {
        let [nr, nc] = [r + dr, c + dc];
        // if (is_safe(nr) && is_safe(nc))
      })
    }
  }

  function is_safe(n) {
    return n >= 0 && n < 4;
  }
  
  function get_cards_position(board) {
    let cards = {};

    board.forEach((row, r) => {
      row.forEach((val, c) => {
        if (val) {
          cards[val] = cards[val] || [];
          cards[val].push([r, c]);
        }
      })
    })
    return cards;
  }
}

const input = [[[1,0,0,3],[2,0,0,0],[0,0,0,2],[3,0,1,0]], 1, 0];
const answer = 14;

solution(...input);