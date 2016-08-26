'use strict';

function g(TicTacToe) {
  let ret = [];
  let ttt = new TicTacToe();
  // Computer starts and wins
  ret.push(JSON.stringify(ttt.move()) == JSON.stringify([5, "Your move?"]));
  ret.push(JSON.stringify(ttt.move(1)) == JSON.stringify([3, "Your move?"]));
  ret.push(JSON.stringify(ttt.move(4)) == JSON.stringify([7, "I win!"]));
  ret.push(JSON.stringify(ttt.move(9)) == JSON.stringify([0, "Game ended"]));
  // Computer starts and wins again
  ttt = new TicTacToe();
  ret.push(JSON.stringify(ttt.move()) == JSON.stringify([5, "Your move?"]));
  ret.push(JSON.stringify(ttt.move(1)) == JSON.stringify([3, "Your move?"]));
  ret.push(JSON.stringify(ttt.move(7)) == JSON.stringify([9, "Your move?"]));
  ret.push(JSON.stringify(ttt.move(2)) == JSON.stringify([4, "Your move?"]));
  ret.push(JSON.stringify(ttt.move(8)) == JSON.stringify([6, "I win!"]));
  // Human starts and loses
  ttt = new TicTacToe();
  ret.push(JSON.stringify(ttt.move(1)) == JSON.stringify([5, "Your move?"]));
  ret.push(JSON.stringify(ttt.move(2)) == JSON.stringify([3, "Your move?"]));
  ret.push(JSON.stringify(ttt.move(5)) == JSON.stringify([0, "Illegal move"]));
  ret.push(JSON.stringify(ttt.move(9)) == JSON.stringify([7, "I win!"]));
  ret.push(JSON.stringify(ttt.move(4)) == JSON.stringify([0, "Game ended"]));
  // Game ends in a draw
  ttt = new TicTacToe();
  ret.push(JSON.stringify(ttt.move(2)) == JSON.stringify([5, "Your move?"]));
  ret.push(JSON.stringify(ttt.move(1)) == JSON.stringify([3, "Your move?"]));
  ret.push(JSON.stringify(ttt.move(7)) == JSON.stringify([9, "Your move?"]));
  ret.push(JSON.stringify(ttt.move(6)) == JSON.stringify([4, "Your move?"]));
  ret.push(JSON.stringify(ttt.move(8)) == JSON.stringify([0, "Draw!"]));
  // Computer plays against itself
  ttt = new TicTacToe();
  ret.push(JSON.stringify(ttt.move()) == JSON.stringify([5, "Your move?"]));
  ret.push(JSON.stringify(ttt.move()) == JSON.stringify([1, "Your move?"]));
  ret.push(JSON.stringify(ttt.move()) == JSON.stringify([3, "Your move?"]));
  ret.push(JSON.stringify(ttt.move()) == JSON.stringify([7, "Your move?"]));
  ret.push(JSON.stringify(ttt.move()) == JSON.stringify([9, "Your move?"]));
  ret.push(JSON.stringify(ttt.move()) == JSON.stringify([2, "Your move?"]));
  ret.push(JSON.stringify(ttt.move()) == JSON.stringify([4, "Your move?"]));
  ret.push(JSON.stringify(ttt.move()) == JSON.stringify([6, "Your move?"]));
  ret.push(JSON.stringify(ttt.move()) == JSON.stringify([8, "Draw!"]));
  // Human starts and wins
  ttt = new TicTacToe();
  ret.push(JSON.stringify(ttt.move(5)) == JSON.stringify([1, "Your move?"]));
  ret.push(JSON.stringify(ttt.move(4)) == JSON.stringify([3, "Your move?"]));
  ret.push(JSON.stringify(ttt.move(6)) == JSON.stringify([0, "You win!"]));
  ret.push(JSON.stringify(ttt.move(2)) == JSON.stringify([0, "Game ended"]));
  // Computer starts and loses
  ttt = new TicTacToe();
  ret.push(JSON.stringify(ttt.move()) == JSON.stringify([5, "Your move?"]));
  ret.push(JSON.stringify(ttt.move(1)) == JSON.stringify([3, "Your move?"]));
  ret.push(JSON.stringify(ttt.move(7)) == JSON.stringify([9, "Your move?"]));
  ret.push(JSON.stringify(ttt.move(4)) == JSON.stringify([0, "You win!"]));
  ret.push(JSON.stringify(ttt.move(2)) == JSON.stringify([0, "Game ended"]));
  // Human starts and wins again
  ttt = new TicTacToe();
  ret.push(JSON.stringify(ttt.move(3)) == JSON.stringify([5, "Your move?"]));
  ret.push(JSON.stringify(ttt.move(8)) == JSON.stringify([1, "Your move?"]));
  ret.push(JSON.stringify(ttt.move(9)) == JSON.stringify([7, "Your move?"]));
  ret.push(JSON.stringify(ttt.move(6)) == JSON.stringify([0, "You win!"]));
  ret.push(JSON.stringify(ttt.move(4)) == JSON.stringify([0, "Game ended"]));
  // Human starts and wins once more
  ttt = new TicTacToe();
  ret.push(JSON.stringify(ttt.move(5)) == JSON.stringify([1, "Your move?"]));
  ret.push(JSON.stringify(ttt.move(2)) == JSON.stringify([3, "Your move?"]));
  ret.push(JSON.stringify(ttt.move(7)) == JSON.stringify([9, "Your move?"]));
  ret.push(JSON.stringify(ttt.move(6)) == JSON.stringify([4, "Your move?"]));
  ret.push(JSON.stringify(ttt.move(8)) == JSON.stringify([0, "You win!"]));

  return ret;
}

let Solution = {
  /*
  https://www.codewars.com/kata/a-simple-tic-tac-toe-class

  In this kata we want to create a minimalist JavaScript 
  class for playing the well-known game "Tic-tac-toe".

  The game is based on a 3x3 grid where we consider 
  the fields numbered like on a telephone keypad, 
  with the number 1 on the top left corner and the 
  number 9 on the bottom right corner.

  The two players take turns occupying 
  the fields in the grids with their tiles. 
  The player who can first get a vertical, 
  horizontal or diagonal stroke of 3 tiles wins.

  Our class TicTacToe shall provide a method move(). 
  The state of the game must be kept internally in the 
  current instance of the class. 
  Calling the move() method automatically switches sides. 
  To make a move, 
  pass the number of the field as only argument to the method. 
  If this is the first move and the computer shall start, 
  or you want to change sides and let the computer make the next move, 
  call the method without arguments. 
  The method shall always return an array where 
  the first element is the move the computer makes, 
  i.e. a number between 1 and 9, or 0 if there is no possible move. 
  The second element of the returned array shall be one of these comments:

  "Game ended" if the game already ended before the move
  "You win!" if the passed move was a winning move
  "Draw!" if the passed or returned move caused a draw
  "I win!" if the returned move was a winning move
  "Your move?" if the game is still going on
  "Illegal move" if the field was already occupied
  The strategy of the computer shall be very simple, 
  in order to give the human player a chance to win. 
  The only criterion for the computer shall be 
  that it prefers the middle tile, 
  then the corners, then the edges. 
  In case of ambiguity it always chooses the tile with the lowest number.

  So a game of Tic-tac-toe against the computer will 
  look like this (we let the computer begin):

  ttt = new TicTacToe()

  ttt.move() // -> [5, "Your move?"]
  ttt.move(1) // -> [3, "Your move?"]
  ttt.move(4) // -> [7, "I win!"]
  ttt.move(9) // -> [0, "Game ended"]
  Another game (this time the human starts the game):

  ttt = new TicTacToe()

  ttt.move(1) // -> [5, "Your move?"]
  ttt.move(2) // -> [3, "Your move?"]
  ttt.move(5) // -> [0, "Illegal move"]
  ttt.move(9) // -> [7, "I win!"]
  ttt.move(4) // -> [0, "Game ended"]
  Here is a game that ends in a draw:

  ttt = new TicTacToe()

  ttt.move(2) // -> [5, "Your move?"]
  ttt.move(1) // -> [3, "Your move?"]
  ttt.move(7) // -> [9, "Your move?"]
  ttt.move(6) // -> [4, "Your move?"]
  ttt.move(8) // -> [0, "Draw!"]
  Try to find a way to win against the computer, 
  and cover it in your tests, too.

  After finishing this kata, 
  you may want to improve the algorithm to 
  make it play better and with some randomness.
  */
};
Solution.subSol_01 = {
  d: `intuitive`,
  f: function () {
    return g(this.f$());
  },
  f$: function () {
    function TicTacToe() {
      this.s = new Array(9).fill(0);
      this.c = 0;
      this.t = 0;
    }
    TicTacToe.prototype.scan = function () {
      return [
        [this.s[0] + this.s[1] + this.s[2], [0, 1, 2]],
        [this.s[3] + this.s[4] + this.s[5], [3, 4, 5]],
        [this.s[6] + this.s[7] + this.s[8], [6, 7, 8]],
        [this.s[0] + this.s[3] + this.s[6], [0, 3, 6]],
        [this.s[1] + this.s[4] + this.s[7], [1, 4, 7]],
        [this.s[2] + this.s[5] + this.s[8], [2, 5, 8]],
        [this.s[0] + this.s[4] + this.s[8], [0, 4, 8]],
        [this.s[2] + this.s[4] + this.s[6], [2, 4, 6]],
      ];
    };
    TicTacToe.prototype.move = function (field) {
      if (this.c == 9) return [0, "Game ended"];
      let tab = this.scan();
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
      tab = this.scan();
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
    return TicTacToe;
  }
};

Solution.subSol_02 = {
  d: ``,
  f: function () {
    return g(this.f$());
  },
  f$: function () {
    function TicTacToe() {
      let b = 'x         ',
        p = ['1', '2'],
        c = [5, 1, 3, 7, 9, 2, 4, 6, 8],
        g = 'Game ended';

      function win(f, m) {
        if (/x((...){0,2}(\d)\3\3|..(\d).\4.\4..|(\d)...\5...\5|.?.?(\d)..\6..\6)/.test(b)) throw [f, m];
      }

      function draw(f, m) {
        if (b.search(' ') < 0) throw [f, m || 'Draw!'];
      }

      this.move = function (f) {
        function legal() {
          if (b[f] != ' ') throw [0, 'Illegal move'];
        }

        function put(q) {
          return b = b.slice(0, f) + p[q] + b.slice(f + 1);
        }
        try {
          win(0, g);
          draw(0, g);
          f ? (legal(), put(0), win(0, 'You win!'), draw(0)) : p.reverse();
          c.some(function (c, i) {
            return b[f = c] == ' ' && put(1);
          });
          win(f, 'I win!');
          draw(f);
          throw [f, 'Your move?'];
        } catch (r) {
          return r;
        }
      };
    }
    return TicTacToe;
  }
};

Solution.subSol_03 = {
  d: ``,
  f: function () {
    return g(this.f$());
  },
  f$: function () {
    let horizontal = '123 456 789'.split(' ');
    let vertical = '147 258 369'.split(' ');
    let diagonal = '159 357'.split(' ');
    let results = horizontal.concat(vertical).concat(diagonal);
    let responses = {
      0: 'Game ended',
      1: 'You win!',
      2: 'I win!',
      3: 'Draw!',
      4: 'Your move?',
      5: 'Illegal move'
    };
    class Grid {
      constructor() {
        this.grid = '0 0 0 0 0 0 0 0 0'.split(' ').map((e) => parseInt(e, 10));
        this.last = null;
      }
      set(field, value) {
        this.last = field;
        this.grid[field - 1] = value;
      }
      get(field) {
        return this.grid[field - 1];
      }
      isAvailable(field) {
        return !this.grid[field - 1];
      }
      isFull() {
        return !this.grid.some((e, idx) => this.isAvailable(idx + 1));
      }
    }
    class TicTacToe {
      constructor() {
        this.grid = new Grid();
        this.finished = false;
        this.player = 1;
        this.computer = 2;
        this.current = this.player;
        this.computerMoves = [5, 1, 3, 7, 9, 2, 4, 6, 8];
      }

      move(field) {
        if (this.finished) return [0, responses[0]];
        let r = null;
        this.grid.last = 0;
        if (field !== undefined) {
          r = this.playerMove(field) || r;
          if (r !== null) return r;
          r = this.move() || r;
        } else {
          this.switch();
          r = this.computerMove() || r;
        }
        r = this.validateTurn() || r;
        return r;
      }

      switch () {
        this.current = this.current === this.player ? this.computer : this.player;
      }

      playerMove(field) {
        let r = null;
        r = this.validateTurn() || r;
        if (r !== null) return r;
        if (this.grid.isAvailable(field)) {
          this.grid.set(field, this.player);
          this.current = this.player;
        } else {
          return r || [0, responses[5]];
        }
      }

      computerMove() {
        let field, r = null;
        r = this.validateTurn() || r;
        if (r !== null) return r;
        do {
          field = this.computerMoves.shift();
        } while (!this.grid.isAvailable(field));
        this.grid.set(field, this.current);
        return r || [field, responses[4]];
      }

      validateTurn() {
        let grid;
        for (let i = 0; i < results.length; i++) {
          let state = results[i];
          grid = this.grid;
          if (grid.get(state[0]) !== 0 &&
            grid.get(state[0]) === grid.get(state[1]) &&
            grid.get(state[0]) === grid.get(state[2]) &&
            grid.get(state[1]) === grid.get(state[2])) {
            this.finished = true;
            return [grid.last, grid.get(state[0]) === 1 ? responses[1] : responses[2]];
          }
        }
        if (this.grid.isFull()) {
          this.finished = true;
          return [grid.last || 0, responses[3]];
        }
      }
    }
    return TicTacToe;
  }
};
// --------------------------------------------------------------
import {
  arrayManip,
  stringManip,
  randBoolean,
  randNumber,
  randChoice,
  randString,
  randStringBy,
  range,
}
from './common';

function genSets(subSol) {
  let testSets = [];
  for (let i = 0; i < 1; i++) {
    let match = subSol.f();
    testSets.push([
      [],
      match
    ]);
  }
  return testSets;
}
// --------------------------------------------------------------
import {
  TestFixture
}
from './testFixture';
let testFixture = TestFixture(Solution, genSets);
testFixture.prep();
testFixture.test(false);
testFixture.testSpd(100);
