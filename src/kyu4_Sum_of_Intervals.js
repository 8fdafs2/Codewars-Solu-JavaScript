'use strict';
let Solution = {
    d: `
    http://www.codewars.com/kata/52b7ed099cdc285c300001cd

    Write a function called sumIntervals that accepts an array of intervals, 
    and returns the sum of all the interval lengths.
    Overlapping intervals should only be counted once.

    Intervals

    Intervals are represented by a pair of integers in the form of an array.
    The first value of the interval will always be less than the second value.
    Interval example: [1, 5] is an interval from 1 to 5. 
    The length of this interval is 4.

    Overlapping Intervals

    List containing overlapping intervals:

        [
            [1, 4],
            [7, 10],
            [3, 5]
        ]
    
    The sum of the lengths of these intervals is 7. 
    Since[1, 4] and[3, 5] overlap, 
    we can treat the interval as[1, 5], which has a length of 4.

    Examples:

        sumIntervals([
            [1, 2],
            [6, 10],
            [11, 15]
        ]); //=> returns 9

        sumIntervals([
            [1, 4],
            [7, 10],
            [3, 5]
        ]); //=> returns 7

        sumIntervals([
            [1, 5],
            [10, 20],
            [1, 6],
            [16, 19],
            [5, 11]
        ]); //=> returns 19
    `
};
Solution.sumIntervals_01 = {
    d: `intuitive`,
    f: function (intervals) {
        let min = Infinity;
        let max = -Infinity;
        for (let i = 0, interval; i < intervals.length; i++) {
            interval = intervals[i];
            if (interval[0] < min)
                min = interval[0];
            if (interval[1] > max)
                max = interval[1];
        }
        let cnts = Array(max - min).fill(0);
        for (let i = 0; i < intervals.length; i++) {
            for (let j = intervals[i][0]; j < intervals[i][1]; j++) {
                cnts[j + min] = 1;
            }
        }
        return cnts.reduce((s, x) => s + x);
    }
};
Solution.sumIntervals_02 = {
    d: `array collection`,
    f: function (intervals) {
        let numbers = [];
        intervals.forEach(function (interval) {
            for (let i = interval[0]; i < interval[1]; i++) {
                if (numbers.indexOf(i) == -1)
                    numbers.push(i);
            }
        });
        return numbers.length;
    }
};
Solution.sumIntervals_03 = {
    d: `hashtab`,
    f: function (intervals) {
        let hashTab = {};
        intervals.forEach(function (interval) {
            for (let i = interval[0]; i < interval[1]; i++) {
                if (!(i in hashTab))
                    hashTab[i] = null;
            }
        });
        return Object.keys(hashTab).length;
    }
};
Solution.sumIntervals_04 = {
    d: `iterative`,
    f: function (intervals) {
        return intervals
            .sort((a, b) => a[0] - b[0])
            .reduce(function (acc, interval) {
                if (interval[1] > acc.top) {
                    acc.total += interval[1] - Math.max(interval[0], acc.top);
                    acc.top = Math.max(interval[1], acc.top);
                }
                return acc;
            }, {
                total: 0,
                top: -Infinity,
            })
            .total;
    }
};
Solution.sumIntervals_05 = {
    d: `iterative`,
    f: function (intervals) {
        let last = -Infinity;
        return intervals
            .sort((a, b) => a[0] != b[0] ? a[0] - b[0] : b[1] - a[1])
            .filter(x => x[0] > last ? true : last = x[0])
            .reduce(function (acc, interval) {
                if (interval[1] > acc.top) {
                    acc.total += interval[1] - Math.max(interval[0], acc.top);
                    acc.top = Math.max(interval[1], acc.top);
                }
                return acc;
            }, {
                total: 0,
                top: -Infinity,
            })
            .total;
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
    for (let i = 0; i < 100; i++) {
        let intervals = [];
        for (let j = 0; j < 100; j++) {
            let start = randNumber(0, 100);
            let end = randNumber(0, 100);
            if (start > end)
                intervals.push([end, start]);
            intervals.push([start, end]);
        }
        let match = subSol.f(intervals);
        testSets.push([
            [intervals, ],
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