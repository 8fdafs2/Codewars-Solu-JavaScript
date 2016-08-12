'use strict';

function g() {

}

let Solution = {
    d: `
    https://www.codewars.com/kata/connect-four-who-won

    Connect Four is a game in which two players take turns dropping red or 
    yellow colored discs into a vertically suspended 7 x 6 grid.
    Discs fall to the bottom of the grid, 
    occupying the next available space.

    A player wins by connecting four of their discs horizontally, 
    vertically or diagonally.

    Given a multidimensional array representing a Connect Four board, 
    your task is to create a
    function which can determine who won the game.

    Your connectFour
    function will be passed an array matrix similar to this:
        [
            ['-', '-', '-', '-', '-', '-', '-'],
            ['-', '-', '-', '-', '-', '-', '-'],
            ['-', '-', '-', 'R', 'R', 'R', 'R'],
            ['-', '-', '-', 'Y', 'Y', 'R', 'Y'],
            ['-', '-', '-', 'Y', 'R', 'Y', 'Y'],
            ['-', '-', 'Y', 'Y', 'R', 'R', 'R']
        ];

    'R' represents a red disc
    'Y' represents a yellow disc
    '-' represents an unoccupied space

    In this example the red player won by making 
    a horizontal line of 4 red discs.

    If the red player won, your connectFour
    function should
    return 'R'.If the yellow player won, it should
    return 'Y'.If the board is full and no one won it should
    return 'draw'.If the game is still in progress it should
    return 'in progress'.

    You can learn more about how Connect Four is played here: 
    http: //en.wikipedia.org/wiki/Connect_Four
    `
};
Solution.connectFour_01 = {
    d: `intuitive`,
    f: function (board) {
        let line;
        // row check
        for (let i = 0; i < 6; i++) {
            line = board[i].join('');
            if (line.indexOf('RRRR') !== -1)
                return 'R';
            if (line.indexOf('YYYY') !== -1)
                return 'Y';
        }
        // col check
        for (let i = 0; i < 7; i++) {
            line = board.map(row => row[i]).join('');
            if (line.indexOf('RRRR') !== -1)
                return 'R';
            if (line.indexOf('YYYY') !== -1)
                return 'Y';
        }
        // dia check
        for (let i = 0, j; i < 6; i++) {
            j = i - 2;
            line = board.map(row => row[j++]).join('');
            if (line.indexOf('RRRR') !== -1)
                return 'R';
            if (line.indexOf('YYYY') !== -1)
                return 'Y';
            j = i + 3;
            line = board.map(row => row[j--]).join('');
            if (line.indexOf('RRRR') !== -1)
                return 'R';
            if (line.indexOf('YYYY') !== -1)
                return 'Y';
        }
        // other
        if (board.toString().indexOf('-') != -1)
            return 'in progress';
        return 'draw';
    }
};
Solution.connectFour_02 = {
    d: `regex`,
    f: function (board) {
        board = board.map(row => row.join('')).join(' ');
        // row | dia | col | dia
        let m = board.match(/([RY])(?:\1{3}|.{6}\1.{6}\1.{6}\1|.{7}\1.{7}\1.{7}\1|.{8}\1.{8}\1.{8}\1)/);
        return m ? m[1] : board.indexOf('-') < 0 ? 'draw' : 'in progress';
    }
};
Solution.connectFour_03 = {
    d: `regex`,
    f: function (board) {
        board = board.join(' ').split(',').join('');
        // row | col | dia | dia
        let e = /(R|Y)\1{3}|(R|Y).{7}(?:\2.{7}){2}\2|(R|Y).{8}(?:\3.{8}){2}\3|(R|Y).{6}(?:\4.{6}){2}\4/.exec(board);
        return e ? e[0][0] : board.indexOf('-') == -1 ? 'draw' : 'in progress';
    }
};
Solution.connectFour_04 = {
    d: `regex`,
    f: function (board) {
        board = board.map(row => row.join('')).join(' ');
        // console.log(board);
        // row | col | dia | dia
        if (/RRRR|R.......R.......R.......R|R........R........R........R|R......R......R......R/.test(board))
            return "R";
        // row | col | dia | dia
        if (/YYYY|Y.......Y.......Y.......Y|Y........Y........Y........Y|Y......Y......Y......Y/.test(board))
            return "Y";
        if (/-/.test(board))
            return "in progress";
        return "draw";
    }
};
Solution.connectFour_05 = {
    d: `regex`,
    f: function (board) {
        board = board.join(' ').split(',').join('');
        if (/YYYY|Y.{6}Y.{6}Y.{6}Y|Y.{7}Y.{7}Y.{7}Y|Y.{8}Y.{8}Y.{8}Y/.test(board))
            return "Y";
        if (/RRRR|R.{6}R.{6}R.{6}R|R.{7}R.{7}R.{7}R|R.{8}R.{8}R.{8}R/.test(board))
            return "R";
        if (/-/.test(board))
            return "in progress";
        return "draw";
    }
};
Solution.connectFour_06 = {
    d: `regex`,
    f: function (board) {
        board = board.map(line => line.join('')).join(' ');
        let ret = ['R', 'Y'].filter(function (player) {
            return board.match(new RegExp(player + '{4}')) || [6, 7, 8].some(function (n) {
                return board.match(new RegExp(player + '.{' + n + '}' + player + '.{' + n + '}' + player + '.{' + n + '}' + player));
            });
        });
        if (!ret.length) {
            return board.indexOf('-') > -1 ? 'in progress' : 'draw';
        }
        return ret[0];
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

function genSets(connectFour) {
    let boards = [
        [ // R wins by horizontal
            ['-', '-', '-', '-', '-', '-', '-'],
            ['-', '-', '-', '-', '-', '-', '-'],
            ['-', '-', '-', 'R', 'R', 'R', 'R'],
            ['-', '-', '-', 'Y', 'Y', 'R', 'Y'],
            ['-', '-', '-', 'Y', 'R', 'Y', 'Y'],
            ['-', '-', 'Y', 'Y', 'R', 'R', 'R']
        ],
        [ // Y wins by vertical
            ['-', 'Y', '-', '-', '-', '-', '-'],
            ['-', 'Y', '-', '-', '-', '-', '-'],
            ['R', 'Y', '-', '-', '-', '-', '-'],
            ['Y', 'Y', '-', '-', '-', '-', '-'],
            ['Y', 'R', 'Y', '-', '-', '-', '-'],
            ['Y', 'Y', 'Y', 'R', 'Y', 'R', 'R']
        ],
        [ // R wins by diag l->r
            ['-', '-', '-', 'R', '-', '-', '-'],
            ['-', '-', '-', 'R', 'R', 'R', '-'],
            ['-', '-', '-', 'Y', 'Y', 'R', '-'],
            ['-', '-', 'R', 'Y', 'Y', 'Y', 'R'],
            ['-', 'Y', 'R', 'Y', 'Y', 'R', 'Y'],
            ['R', 'Y', 'Y', 'R', 'R', 'Y', 'R']
        ],
        [ // Y wins by diag r->l
            ['-', '-', '-', '-', '-', '-', '-'],
            ['-', '-', '-', '-', '-', '-', '-'],
            ['-', '-', '-', '-', 'Y', '-', '-'],
            ['-', '-', '-', 'Y', 'R', '-', '-'],
            ['-', 'R', 'Y', 'R', 'Y', '-', '-'],
            ['R', 'Y', 'R', 'Y', 'R', 'Y', 'R']
        ],
        [ // Draw
            ['Y', 'R', 'Y', 'R', 'Y', 'R', 'Y'],
            ['R', 'Y', 'R', 'R', 'Y', 'R', 'Y'],
            ['Y', 'Y', 'R', 'R', 'R', 'Y', 'R'],
            ['R', 'R', 'Y', 'Y', 'Y', 'R', 'Y'],
            ['Y', 'Y', 'Y', 'R', 'Y', 'R', 'Y'],
            ['R', 'Y', 'R', 'R', 'R', 'Y', 'R']
        ],
        [ // In progress
            ['-', '-', '-', '-', '-', '-', '-'],
            ['-', '-', '-', '-', '-', '-', '-'],
            ['-', '-', '-', '-', '-', '-', '-'],
            ['-', '-', 'R', '-', 'Y', '-', 'R'],
            ['-', 'Y', 'Y', 'R', 'Y', '-', 'R'],
            ['-', 'R', 'Y', 'R', 'Y', '-', 'R']
        ],
        [ // Y wins by diag l->r
            ['-', '-', '-', '-', '-', '-', '-'],
            ['-', '-', '-', '-', '-', '-', '-'],
            ['Y', '-', '-', '-', '-', '-', '-'],
            ['R', 'Y', '-', '-', '-', '-', '-'],
            ['R', 'R', 'Y', '-', '-', '-', '-'],
            ['R', 'Y', 'R', 'Y', '-', '-', '-']
        ],
        [ // Y wins by diag r->l
            ['-', '-', '-', '-', '-', '-', '-'],
            ['-', '-', '-', '-', '-', '-', '-'],
            ['-', '-', '-', 'Y', '-', '-', '-'],
            ['-', '-', 'Y', 'R', '-', '-', '-'],
            ['-', 'Y', 'Y', 'R', 'R', '-', '-'],
            ['Y', 'R', 'R', 'R', 'Y', '-', '-']
        ],
        [ // R wins by col and diag r->l
            ['-', '-', '-', '-', '-', '-', '-'],
            ['-', '-', '-', '-', '-', '-', 'R'],
            ['-', '-', '-', 'Y', 'R', 'R', 'R'],
            ['-', '-', 'Y', 'Y', 'R', 'Y', 'R'],
            ['-', 'Y', 'Y', 'R', 'Y', 'R', 'R'],
            ['-', 'R', 'Y', 'Y', 'Y', 'R', 'Y']
        ],
        [ // Y wins by diag r->l
            ['-', '-', '-', '-', '-', 'R', 'Y'],
            ['-', '-', '-', '-', 'R', 'Y', 'R'],
            ['-', '-', '-', '-', 'Y', 'Y', 'Y'],
            ['-', '-', '-', 'Y', 'R', 'Y', 'R'],
            ['-', '-', '-', 'Y', 'R', 'R', 'Y'],
            ['-', '-', 'R', 'R', 'Y', 'R', 'R']
        ],
        [ // R wins by horiz, vert and diag r->l
            ['-', '-', '-', '-', '-', '-', '-'],
            ['-', '-', 'R', '-', '-', '-', '-'],
            ['-', '-', 'R', 'R', 'R', 'R', '-'],
            ['-', '-', 'R', 'R', 'R', 'Y', 'Y'],
            ['-', 'Y', 'Y', 'R', 'R', 'R', 'Y'],
            ['Y', 'Y', 'Y', 'R', 'Y', 'Y', 'R']
        ],
        [ // In progress
            ['-', '-', '-', '-', '-', '-', '-'],
            ['-', '-', '-', '-', '-', '-', '-'],
            ['-', '-', '-', '-', '-', '-', '-'],
            ['-', '-', 'R', 'Y', 'R', 'R', '-'],
            ['-', '-', 'Y', 'R', 'Y', 'Y', '-'],
            ['-', '-', 'R', 'Y', 'Y', 'R', '-']
        ],
        [ // R wins by vertical
            ['-', '-', '-', '-', '-', '-', '-'],
            ['-', '-', '-', '-', '-', '-', '-'],
            ['-', '-', 'Y', '-', '-', 'R', '-'],
            ['-', '-', 'R', 'Y', 'R', 'R', '-'],
            ['-', '-', 'Y', 'R', 'Y', 'R', '-'],
            ['-', '-', 'R', 'Y', 'Y', 'R', 'Y']
        ],
        [ // Y wins by horizontal
            ['-', '-', '-', '-', '-', '-', '-'],
            ['-', '-', '-', '-', '-', '-', '-'],
            ['-', 'R', '-', '-', '-', '-', '-'],
            ['-', 'R', 'Y', '-', '-', '-', '-'],
            ['-', 'R', 'Y', 'Y', 'Y', 'Y', '-'],
            ['-', 'Y', 'R', 'R', 'Y', 'R', '-']
        ]
    ];
    let testSets = [];
    for (let i = 0; i < boards.length; i++) {
        let board = boards[i];
        let match = connectFour.f(board);
        testSets.push([
            [board, ],
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
testFixture.testSpd(1000);