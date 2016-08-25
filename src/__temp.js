'use strict';

function TicTacToe() {
  this.s = new Array(9).fill(0);
  this.c = 0;
  this.t = 0;
}

TicTacToe.prototype.move = function (field) {
  if (this.c == 9) return [0, "Game ended"];
  let tab = [
    [this.s[0] + this.s[1] + this.s[2], [0, 1, 2]],
    [this.s[3] + this.s[4] + this.s[5], [3, 4, 5]],
    [this.s[6] + this.s[7] + this.s[8], [6, 7, 8]],
    [this.s[0] + this.s[3] + this.s[6], [0, 3, 6]],
    [this.s[1] + this.s[4] + this.s[7], [1, 4, 7]],
    [this.s[2] + this.s[5] + this.s[8], [2, 5, 8]],
    [this.s[0] + this.s[4] + this.s[8], [0, 4, 8]],
    [this.s[2] + this.s[4] + this.s[6], [2, 4, 6]],
  ];
  let a = 1;
  let b = 2;
  if (field) { // human move
    let k = field - 1;
    if (this.s[k] !== 0) return [0, "Illegal move"];
    this.s[k] = 10;
    ++this.c;
    for (let j = 0; j < 8; ++j) {
      let [sum, seq] = tab[j];
      if (sum == 20 && seq.indexOf(k) > -1) {
        this.c = 9;
        return [0, "You win!"];
      }
    }
    if (this.c == 9) return [0, "Draw!"];
    this.t = 1;
  } else { // computer against itself
    if (this.t == 10) {
      a = 10;
      b = 20;
      this.t = 1;
    } else this.t = 10;
  }
  let seq = [4, 0, 2, 6, 8, 1, 3, 5, 7];
  for (let i = 0; i < 9; ++i) { // computer move
    let k = seq[i];
    if (this.s[k] === 0) {
      this.s[k] = a;
      ++this.c;
      for (let j = 0; j < 8; ++j) {
        let [sum, seq] = tab[j];
        if (sum == b && seq.indexOf(k) > -1) {
          this.c = 9;
          return [k + 1, "I win!"];
        }
      }
      if (this.c == 9) return [k + 1, "Draw!"];
      return [k + 1, "Your move?"];
    }
  }
};

let ttt = new TicTacToe();

console.log(ttt.move());
console.log(ttt.move(1));
console.log(ttt.move(7));
console.log(ttt.move(2));
