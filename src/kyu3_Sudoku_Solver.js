'use strict';
let Solution = {
  /*
https://www.codewars.com/kata/sudoku-solver

Write a function that will solve a 9x9 Sudoku puzzle. The function will take one argument consisting of the 2D puzzle array, with the value 0 representing an unknown square.

The Sudokus tested against your function will be "easy" (i.e. determinable; there will be no need to assume and test possibilities on unknowns) and can be solved with a brute-force approach.

For Sudoku rules, see the Wikipedia article.

let puzzle = [
            [5,3,0,0,7,0,0,0,0],
            [6,0,0,1,9,5,0,0,0],
            [0,9,8,0,0,0,0,6,0],
            [8,0,0,0,6,0,0,0,3],
            [4,0,0,8,0,3,0,0,1],
            [7,0,0,0,2,0,0,0,6],
            [0,6,0,0,0,0,2,8,0],
            [0,0,0,4,1,9,0,0,5],
            [0,0,0,0,8,0,0,7,9]];

sudoku(puzzle);
/* Should return
[[5,3,4,6,7,8,9,1,2],
[6,7,2,1,9,5,3,4,8],
[1,9,8,3,4,2,5,6,7],
[8,5,9,7,6,1,4,2,3],
[4,2,6,8,5,3,7,9,1],
[7,1,3,9,2,4,8,5,6],
[9,6,1,5,3,7,2,8,4],
[2,8,7,4,1,9,6,3,5],
[3,4,5,2,8,6,1,7,9]]
  */
};
Solution.sudoku_01 = {
  d: `intuitive`,
  f: function (puzzle) {

    function nextCell(i, j) {
      for (let x = i; x < 9; ++x)
        for (let y = j; y < 9; ++y)
          if (grid[x][y] === 0) return [x, y];
      for (let x = 0; x < i; ++x)
        for (let y = 0; y < 9; ++y)
          if (grid[x][y] === 0) return [x, y];
      for (let x = i; x < 9; ++x)
        for (let y = 0; y < j; ++y)
          if (grid[x][y] === 0) return [x, y];
      return [-1, -1];
    }

    function isValid(i, j, e) {
      for (let x = 0; x < 9; ++x)
        if (grid[x][j] == e && x != i) return false;
      for (let y = 0; y < 9; ++y)
        if (grid[i][y] == e && y != j) return false;
      let x_ = ~~(i / 3) * 3;
      let y_ = ~~(j / 3) * 3;
      for (let x = x_; x < x_ + 3; ++x)
        for (let y = y_; y < y_ + 3; ++y)
          if (grid[x][y] == e && (x != i || y != j)) return false;
      return true;
    }

    function solve(i = 0, j = 0) {
      [i, j] = nextCell(i, j);
      if (i == -1) return true;
      for (let e = 1; e < 10; ++e) {
        if (isValid(i, j, e)) {
          grid[i][j] = e;
          if (solve(i, j)) return true;
          grid[i][j] = 0;
        }
      }
      return false;
    }

    let grid = puzzle.map(x => x.slice(0));
    solve();
    // return grid;
    return JSON.stringify(grid);
  }
};

Solution.sudoku_02 = {
  d: ``,
  f: function (puzzle) {
    puzzle = puzzle.map(x => x.slice(0));

    function solve(r = 0, c = 0) {
      if (r === 9) return true;

      let next_r = r;
      let next_c = c + 1;
      if (next_c === 9) {
        next_r += 1;
        next_c = 0;
      }

      if (puzzle[r][c]) return solve(next_r, next_c);

      let s_r = Math.floor(r / 3) * 3;
      let s_c = Math.floor(c / 3) * 3;
      let poss = [1, 2, 3, 4, 5, 6, 7, 8, 9];

      const remove = (a, x) => a.filter(v => v != x);

      let i, j;
      for (i = 0; i < 9; i++) {
        if (i != r) poss = remove(poss, puzzle[i][c]);
        if (i != c) poss = remove(poss, puzzle[r][i]);
      }
      for (i = s_r; i < s_r + 3; i++)
        for (j = s_c; j < s_c + 3; j++)
          if (i != r || j != c) poss = remove(poss, puzzle[i][j]);
      for (i = 0; i < poss.length; i++) {
        puzzle[r][c] = poss[i];
        if (solve(next_r, next_c)) return true;
      }
      puzzle[r][c] = 0;
      return false;
    }

    solve();
    // return puzzle;
    return JSON.stringify(puzzle);
  }
};

Solution.sudoku_03 = {
  d: ``,
  f: function (puzzle) {
    const valid = (x, y) => {
      let v = [];
      for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++) {
          v.push(puzzle[x][i * 3 + j]);
          v.push(puzzle[i * 3 + j][y]);
          v.push(puzzle[3 * Math.floor(x / 3) + i][3 * Math.floor(y / 3) + j]);
        }
      return [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(e => v.indexOf(e) == -1);
    };
    const rec = (x, y) => {
      if (y == 9) return puzzle;
      if (puzzle[x][y]) return rec((x + 1) % 9, y + (x == 8 ? 1 : 0));
      const correct = valid(x, y).some(i => {
        puzzle[x][y] = i;
        return rec((x + 1) % 9, y + (x == 9 ? 1 : 0));
      });
      if (correct) return puzzle;
      puzzle[x][y] = 0;
    };
    // return rec(0, 0);
    return JSON.stringify(rec(0, 0));
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
  let sp = [
      "605720039400005100020100004090030706100809005204050080800003020002900001350067408",
      "008030540300407900410008002043502060500000008060309410100800027005603004029070800",
      "600108203020040090803005400504607009030000050700803102001700906080030020302904005",
      "019060540000000000820974036001503800000000000002701600750138092000000000083040710",
      "046000000902060008008400250000800070500702003010006000064003900300080102000000730",
      "006020050002000194000100207607082019085070030000605400090013040001009000730008900",
  ];
  const str2puz = (str) => [0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => [0, 1, 2, 3, 4, 5, 6, 7, 8].map(j => parseInt(str[(i * 9) + j])));
  let testSets = [];
  for (let i = 0; i < sp.length; ++i) {
    let puzzle = str2puz(sp[i]);
    let match = subSol.f(puzzle);
    testSets.push([
      [puzzle, ],
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
