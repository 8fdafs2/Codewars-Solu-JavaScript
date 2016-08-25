'use strict';

function TicTacToe() {
  this.w = 0; // computer player: 1, human player: 10
  this.s = new Array(9).fill(0);
  this.c = 0;
}

TicTacToe.prototype.move = function (field) {
  if (this.w !== 0) return [0, "Game ended"];

  let tab = [
    [this.s[0] + this.s[1] + this.s[2],
      [0, 1, 2]
    ],
    [this.s[3] + this.s[4] + this.s[5],
      [3, 4, 5]
    ],
    [this.s[6] + this.s[7] + this.s[8],
      [6, 7, 8]
    ],
    [this.s[0] + this.s[3] + this.s[6],
      [0, 3, 6]
    ],
    [this.s[1] + this.s[4] + this.s[7],
      [1, 4, 7]
    ],
    [this.s[2] + this.s[5] + this.s[8],
      [2, 5, 8]
    ],
    [this.s[0] + this.s[4] + this.s[8],
      [0, 4, 8]
    ],
    [this.s[2] + this.s[4] + this.s[6],
      [2, 4, 6]
    ],
  ];

  // human move
  if (field !== undefined) {
    let i = field - 1;
    if (this.s[i] !== 0) return [0, "Illegal move"];
    this.s[i] = 10;
    ++this.c;
    for (let j = 0; j < 8; ++j) {
      let [sum, seq] = tab[j];
      if (sum == 20 && seq.indexOf(i) > -1) {
        this.w = 10;
        return [0, "You win!"];
      }
    }
    if (this.c == 9) {
      this.w = 11;
      return [0, "Draw!"];
    }
  }

  // computer move
  for (let i = 0; i < 8; ++i) {
    let [sum, seq] = tab[i];
    if (sum == 2)
      for (let j = 0; j < 3; ++j) {
        let k = seq[j];
        if (this.s[k] === 0) {
          this.s[k] = 1;
          ++this.c;
          this.w = 1;
          return [k + 1, "I win!"];
        }
      }
  }
  for (let i = 0; i < 8; ++i) {
    let [sum, seq] = tab[i];
    if (sum == 20)
      for (let j = 0; j < 3; ++j) {
        let k = sum[j];
        if (this.s[k] === 0) {
          this.s[k] = 1;
          ++this.c;
          if (this.c == 9) {
            this.w = 11;
            return [k + 1, "Draw!"];
          }
          return [k + 1, "Your move?"];
        }
      }
  }
  let seq = [4, 0, 2, 6, 8, 1, 3, 5, 7];
  for (let j = 0; j < 9; ++j) {
    let k = seq[j];
    if (this.s[k] === 0) {
      this.s[k] = 1;
      ++this.c;
      if (this.c == 9) {
        this.w = 11;
        return [k + 1, "Draw!"];
      }
      return [k + 1, "Your move?"];
    }
  }
};

let ttt = new TicTacToe();

console.log(ttt.move());
console.log(ttt.move(1));
console.log(ttt.move(7));
console.log(ttt.move(2));
