'use strict';
var Solution = {
    d: `
    https://www.codewars.com/kata/get-the-mean-of-an-array

    It's the academic year's end, fateful moment of your school report. 
    The averages must be calculated. 
    All the students come to you and entreat you to calculate their average for them. 
    Easy ! You just need to write a script.

    Return the average of the given array rounded downward to its nearest integer.

    The array will never be empty.
    `
};
Solution.getAverage_01 = {
    d: `intuitive`,
    f: function (marks) {
        var total = 0;
        for (var i = 0; i < marks.length; i++) {
            total += marks[i];
        }
        return Math.floor(total / marks.length);
    }
};
Solution.getAverage_02 = {
    d: `reduce`,
    f: function (marks) {
        var total = marks.reduce((a, b) => a + b);
        return Math.floor(total / marks.length);
    }
};
Solution.getAverage_03 = {
    d: `forEach`,
    f: function (marks) {
        var total = 0;
        marks.forEach(function (mark) {
            total += mark;
        });
        return Math.floor(total / marks.length);
    }
};
Solution.getAverage_04 = {
    d: `reduce, onliner`,
    f: marks => Math.floor(marks.reduce((a, b) => a + b) / marks.length)
};
Solution.getAverage_05 = {
    d: `Array.prototype.sum`,
    f: function (marks) {
        Array.prototype.sum = function () {
            return this.reduce((a, b) => a + b);
        };
        return Math.floor(marks.sum() / marks.length);
    }
};

// --------------------------------------------------------------
import {
    randNumber
}
from './common';

function genSets(getAverage) {
    var testSets = [];
    for (var i = 10; i <= 200; i++) {
        var marks = [];
        for (var j = 0; j <= i; j++) {
            marks.push(randNumber(0, 100));
        }
        var match = getAverage.f(marks);
        testSets.push([
            [marks, ],
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
var testFixture = TestFixture(Solution, genSets);
testFixture.prep();
testFixture.test();