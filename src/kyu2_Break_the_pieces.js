'use strict';

Array.prototype.mapCells = function (fn) {
  return this.map((row, i) => row.map((c, j) => fn(c, i, j)));
};

Object.defineProperty(Array.prototype, "mapCells", {
  enumerable: false
});

let Solution = {
  /*
https://www.codewars.com/kata/527fde8d24b9309d9b000c4e

You are given a ASCII diagram , comprised of minus signs -, plus signs +, vertical bars | and whitespaces . Your task is to write a function which breaks the diagram in the minimal pieces it is made of.

For example, if the input for your function is this diagram:

+------------+
|            |
|            |
|            |
+------+-----+
|      |     |
|      |     |
+------+-----+
the returned value should be the list of:

+------------+
|            |
|            |
|            |
+------------+
(note how it lost a + sign in the extraction)

as well as

+------+
|      |
|      |
+------+
and

+-----+
|     |
|     |
+-----+
The diagram is given as an ordinary Javascript multiline string. The pieces should not have trailing spaces at the end of the lines. However, it could have leading spaces if the figure is not a rectangle. For instance:

    +---+
    |   |
+---+   |
|       |
+-------+
However, it is not allowed to use more leading spaces than necessary. It is to say, the first character of some of the lines should be different than a space.

Finally, note that only the explicitly closed pieces are considered. Spaces "outside" of the shape are part of the background . Therefore the diagram above has a single piece.

Have fun!
  */
};
Solution.breakPieces_01 = {
  d: `intuitive`,
  f: function (shape) {
    shape = shape.split('\n');
    let vlst = [];
    for (let y = 0; y < shape.length; ++y) {
      for (let x = 0; x < shape[y].length; ++x) {
        if (shape[y][x] == '+' &&
          (vlst.length === 0 ||
            (shape[y + 1] && (shape[y + 1][x] == '|' || shape[y + 1][x] == '+') && (shape[y][x + 1] == '-' || shape[y][x + 1] == '+'))
          )) vlst.push([x, y]);
      }
    }

    let dir_next = {};
    dir_next[[-1, 0]] = [[0, -1], [-1, 0], [0, 1]];
    dir_next[[0, -1]] = [[1, 0], [0, -1], [-1, 0]];
    dir_next[[0, 1]] = [[-1, 0], [0, 1], [1, 0]];
    dir_next[[1, 0]] = [[0, 1], [1, 0], [0, -1]];

    let hlst = [];
    let ret = [];
    for (let i = 0; i < vlst.length; ++i) {
      let [x, y] = vlst[i];
      let s = [[x, y]];
      let dir = [[1, 0]];
      let flag = true;
      while (flag) {
        for (let j = 0; j < 3; ++j) {
          let [dx, dy] = dir[j];
          if (shape[y + dy] && (shape[y + dy][x + dx] == (dx !== 0 ? '-' : '|') || shape[y + dy][x + dx] == '+')) {
            do {
              y += dy;
              x += dx;
            } while (shape[y][x] != '+');
            if (s[0][0] == x && s[0][1] == y) {
              flag = false;
            } else {
              if (j == 1) s.pop();
              s.push([x, y]);
              dir = dir_next[[dx, dy]];
            }
            break;
          }
        }
      }

      let h = JSON.stringify(s.slice(0).sort());
      if (hlst.indexOf(h) == -1) hlst.push(h);
      else continue;

      let xmin = Math.min.apply(null, s.map(([x, y]) => x));
      let ymin = Math.min.apply(null, s.map(([x, y]) => y));
      s = s.map(([x, y]) => [x - xmin, y - ymin]);
      let rows = Math.max.apply(null, s.map(([x, y]) => x)) + 1;
      let cols = Math.max.apply(null, s.map(([x, y]) => y)) + 1;

      let s_mat = [...Array(cols)].map(_ => (new Array(rows)).fill(' '));

      for (let k = 0; k < s.length; ++k) {
        let [x, y] = s[k];
        let [x_, y_] = s[(k + 1) % s.length];
        let [dx, dy] = [x_ - x, y_ - y];
        if (dx !== 0) {
          let inc = (dx > 0) ? 1 : -1;
          if (dx < 0) dx = -dx;
          while (dx--) {
            x += inc;
            s_mat[y][x] = '-';
          }
          s_mat[y][x] = '+';
        } else {
          let inc = (dy > 0) ? 1 : -1;
          if (dy < 0) dy = -dy;
          while (dy--) {
            y += inc;
            s_mat[y][x] = '|';
          }
          s_mat[y][x] = '+';
        }
      }
      ret.push(s_mat.map(x => x.join('').trimRight()).join('\n'));
    }
    // return ret;
    return JSON.stringify(ret.sort());
  }
};

Solution.breakPieces_02 = {
  d: ``,
  f: function (shape) {

    let sh = shape.split('\n').map(row => row.split('').map(c => c == ' ' ? 0 : c));
    sh.push([]);
    sh.unshift([]); // to simplify boundary checks

    // Mark pieces on shape
    let piece = 1;
    sh.mapCells((c, i, j) => {
      if (!sh[i][j] && fill(i, j)) piece++;
    });

    // Done
    let result = [];
    while (--piece > 0) result.push(extract(piece));
    // return result;
    return JSON.stringify(result.sort());

    // Fills area with number if it is inner area, '*' otherwise
    // Returns 'true' if it is inner area
    function fill(i, j) {
      if (i < 0 || j < 0 || i >= sh.length || j >= sh[i].length || sh[i][j] == '*') return false;
      if (sh[i][j]) return true;
      sh[i][j] = piece;
      [[i - 1, j], [i, j + 1], [i + 1, j], [i, j - 1]].forEach(p => {
        if (!fill(...p)) sh[i][j] = '*';
      });
      return sh[i][j] == piece;
    }

    // Extracts piece by number
    function extract(n) {
      return stringify(fixCorners(sh.mapCells((c, i, j) => ('-|+'.indexOf(c) >= 0 && around(i, j)) ? c : ' ')));

      function around(i, j) {
        let c = 0;
      [-1, 0, 1].forEach(k => [-1, 0, 1].forEach(l => c += Number(sh[k + i][l + j] == n)));
        return c > 0;
      }

      function fixCorners(sh) {
        let replace = (i, j) => {
          let v = sh[i - 1][j] == '|' || sh[i + 1][j] == '|',
            h = sh[i][j - 1] == '-' || sh[i][j + 1] == '-';
          return v && h ? '+' : v ? '|' : '-';
        };
        return sh.mapCells((c, i, j) => c == '+' ? replace(i, j) : c);
      }

      function stringify(sh) {
        let lm = Infinity;
        return sh.map(row => row.join(''))
          .filter(row => row.trim())
          .map(row => (row = row.trimRight(),
            lm = Math.min(lm, row.length - row.trim().length),
            row))
          .map(row => row.substr(lm))
          .join('\n');
      }
    }
  }
};

Solution.breakPieces_03 = {
  d: ``,
  f: function (shape) {
    let sp = shape.split("\n").map(x => x.split("")),
      w = sp[0].length,
      h = sp.length,
      n = 1,
      rs = [];
    // for (let i = 0; i < h; i++) console.log(sp[i].join("").replace(/ /g, "@"));
    let fillIt = (xx, yy) => { //flood fill
      let lst = [[xx, yy]],
        sp2 = shape.split("\n").map(x => x.split("")),
        l = sp[0].length,
        r = 0,
        er = 0;
      while (lst.length > 0) {
        let tmp = [];
        for (let i in lst) {
          let x0 = lst[i][0],
            y0 = lst[i][1],
            up = lst[i][0] - 1,
            down = lst[i][0] + 1,
            left = lst[i][1] - 1,
            right = lst[i][1] + 1;
          if (up < 0 || left < 0 || right >= w || down >= h) er = 1;
          l = Math.min(left, l);
          r = Math.max(right, r);
          if (sp[x0][y0] == " ") {
            sp[x0][y0] = "&";
            sp2[x0][y0] = "&";
          }
          if (up >= 0 && sp[up][y0] == " ") {
            sp[up][y0] = "&";
            sp2[up][y0] = "&";
            tmp.push([up, y0]);
          }
          if (down < h && sp[down][y0] == " ") {
            sp[down][y0] = "&";
            sp2[down][y0] = "&";
            tmp.push([down, y0]);
          }
          if (left >= 0 && sp[x0][left] == " ") {
            sp[x0][left] = "&";
            sp2[x0][left] = "&";
            tmp.push([x0, left]);
          }
          if (right < w && sp[x0][right] == " ") {
            sp[x0][right] = "&";
            sp2[x0][right] = "&";
            tmp.push([x0, right]);
          }
        }
        lst = tmp.slice(0);
      }
      if (er == 1) return "";
      sp2 = sp2.map(x => x.map(y => y == "&" ? y : "-")).filter((x, y) => (sp2[y] + sp2[y - 1] + sp2[y + 1]).indexOf("&") >= 0).map(x => x.map((_, z) => x[z] == "-" ? (x[z - 1] == "&" || x[z + 1] == "&" ? "|" : "-") : "&").slice(l, r + 1));
      sp2 = sp2.map((x, y) => x.map((_, z) => x[z] == "&" ? " " : x[z] == "-" ? (y === 0 ? (sp2[1][z] == "|" ? "+" : sp2[1][z] == "&" ? "-" : " ") : y == sp2.length - 1 ? (sp2[y - 1][z] == "|" ? "+" : sp2[y - 1][z] == "&" ? "-" : " ") : (sp2[y - 1][z] == "&" || sp2[y + 1][z] == "&" ? "-" : sp2[y - 1][z] == "|" || sp2[y + 1][z] == "|" ? "+" : " ")) : (sp2[y - 1][z] == "&" || sp2[y + 1][z] == "&" ? "+" : "|")));
      let sp3 = sp2.map(x => x.join("")).join("\n").replace(/ +\n/g, "\n").replace(/ +$/, "");
      // console.log("no." + n++, "left:" + l, "right:" + r); //for debug display
      // console.log(sp3.replace(/ /g, "@")); //for debug display
      return sp3;
    };

    for (let i = 0; i < h; i++)
      for (let j = 0; j < w; j++)
        if (sp[i][j] == " ") rs.push(fillIt(i, j));
        // return rs.filter(x => x !== "");
    return JSON.stringify(rs.filter(x => x !== "").sort());
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

  let shapes = [
   ["+------------+",
    "|            |",
    "|            |",
    "|            |",
    "+------+-----+",
    "|      |     |",
    "|      |     |",
    "+------+-----+"].join("\n"),
   ["+-------------------+--+",
    "|                   |  |",
    "|                   |  |",
    "|  +----------------+  |",
    "|  |                   |",
    "|  |                   |",
    "+--+-------------------+"].join("\n"),
  ["           +-+             ",
   "           | |             ",
   "         +-+-+-+           ",
   "         |     |           ",
   "      +--+-----+--+        ",
   "      |           |        ",
   "   +--+-----------+--+     ",
   "   |                 |     ",
   "   +-----------------+     "].join("\n"),
  ["+-----------------+",
   "|                 |",
   "|   +-------------+",
   "|   |",
   "|   |",
   "|   |",
   "|   +-------------+",
   "|                 |",
   "|                 |",
   "+-----------------+"].join("\n"),
  ["+---+---+---+---+---+---+---+---+",
   "|   |   |   |   |   |   |   |   |",
   "+---+---+---+---+---+---+---+---+"].join("\n"),
  ["+---+------------+---+",
   "|   |            |   |",
   "+---+------------+---+",
   "|   |            |   |",
   "|   |            |   |",
   "|   |            |   |",
   "|   |            |   |",
   "+---+------------+---+",
   "|   |            |   |",
   "+---+------------+---+"].join("\n"),
  ["                 ",
   "   +-----+       ",
   "   |     |       ",
   "   |     |       ",
   "   +-----+-----+ ",
   "         |     | ",
   "         |     | ",
   "         +-----+ "].join("\n"),
  ];

  let testSets = [];
  for (let i = 0; i < shapes.length; ++i) {
    let shape = shapes[i];
    let match = subSol.f(shape);
    testSets.push([
      [shape, ],
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
