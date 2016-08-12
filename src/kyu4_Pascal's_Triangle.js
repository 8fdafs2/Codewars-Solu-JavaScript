'use strict';
let Solution = {
    d: `
    https://www.codewars.com/kata/pascals-triangle

    Wikipedia article on Pascal's Triangle: 
    http://en.wikipedia.org/wiki/Pascal's_triangle

    Write a function that, given a depth (n), 
    returns a single-dimensional array representing 
    Pascal's Triangle to the n-th level.

    For example:

    pascalsTriangle(4) == [1,1,1,1,2,1,1,3,3,1]
    `
};
Solution.pascalsTriangle_01 = {
    d: `symmetry`,
    f: function (n) {
        let ret = [1, ];
        let row = [1, ];
        for (let i = 1; i < n; i++) {
            let jHalfF, jHalfR;
            if ((i - 1) % 2 === 0) {
                jHalfF = jHalfR = (i - 1) / 2;
            } else {
                jHalfF = i / 2;
                jHalfR = jHalfF - 1;
            }
            for (let j = 0; j < jHalfF; j++) {
                row[j] += row[j + 1];
            }
            ret = ret.concat(row = [1, ...row.slice(0, jHalfF), ...row.slice(0, jHalfR).reverse(), 1]);
        }
        return ret;
    }
};
Solution.pascalsTriangle_02 = {
    d: `row by row`,
    f: function (n) {
        let ret = [];
        for (let r = 0; r < n; r++) {
            let row = [];
            for (let c = 0; c < r + 1; c++) {
                if (c === 0 || c === r) {
                    row.push(1);
                } else {
                    row.push(ret[r - 1][c - 1] + ret[r - 1][c]);
                }
            }
            ret.push(row);
        }
        return ret.reduce((x, y) => x.concat(y));
    }
};
Solution.pascalsTriangle_03 = {
    d: `row in ret, subfunc`,
    f: function (n) {
        let ret = [];

        function addRow(n) {
            ret.push(1);
            if (n == 1) {
                return;
            }
            let jStart = ret.length - n;
            let jMax = jStart + n - 2;
            for (let j = jStart; j < jMax; j++) {
                ret.push(ret[j] + ret[j + 1]);
            }
            ret.push(1);
        }
        for (let i = 1; i <= n; i++)
            addRow(i);
        return ret;
    }
};
Solution.pascalsTriangle_05 = {
    d: `row in ret, for-loop`,
    f: function (n) {
        let ret = [1, ];
        if (n === 1) return ret;
        for (let k = 1, jStart, jMax; k < n; k++) {
            jStart = ret.length - k;
            jMax = jStart + k - 1;
            ret.push(1);
            for (let j = jStart; j < jMax; j++) {
                ret.push(ret[j] + ret[j + 1]);
            }
            ret.push(1);
        }
        return ret;
    }
};
Solution.pascalsTriangle_06 = {
    d: `https://en.wikipedia.org/wiki/Pascal%27s_triangle#Calculating_a_row_or_diagonal_by_itself`,
    f: function (n) {
        let ret = [];
        for (let i = 0; i < n; i++) {
            let number = 1;
            for (let j = 0; j <= i; j++) {
                ret.push(number);
                // arithmetic expression limits the greatest n that can be passed in
                number = number * (i - j) / (j + 1);
            }
        }
        return ret;
    }
};
Solution.pascalsTriangle_07 = {
    d: `row recursion, inefficient`,
    f: function (n) {
        function row(n, k) {
            return (k === 0 || n == k) ? 1 : row(n - 1, k - 1) + row(n - 1, k);
        }
        let ret = [];
        for (let i = 0; i < n; i++)
            for (let j = 0; j <= i; j++)
                ret.push(row(i, j));
        return ret;
    }
};
Solution.pascalsTriangle_08 = {
    d: `map of map then reduce`,
    f: function (n) {
        let row;
        // initialize array elements by doing one of the follows:
        // Array.apply(null, Array(num_of_eles))
        // Array.from(Array(num_of_eles))
        return Array.from(Array(n)).map(
            (e, i) => row = Array.from(Array(i + 1)).map(
                (e, j) => row ? ((row[j] || 0) + (row[j - 1] || 0)) : 1)
        ).reduce((a, b) => a.concat(b));
    }
};
Solution.pascalsTriangle_09 = {
    d: `ret recursion`,
    f: function (n) {
        function recur(n) {
            if (n === 1) return [1, ];
            let ret = recur(n - 1);
            let l = ret.length;
            ret.push(1);
            for (let i = l - n + 1; i < l - 1; i++) {
                ret.push(ret[i] + ret[i + 1]);
            }
            ret.push(1);
            return ret;
        }
        return recur(n);
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

function genSets(pascalsTriangle) {
    let testSets = [];
    for (let n = 1; n < 21; n++) {
        let match = pascalsTriangle.f(n);
        testSets.push([
            [n, ],
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
testFixture.testSpd(10);