'use strict';
var Solution = {
    d: `
    https://www.codewars.com/kata/range-extraction

    A format for expressing an ordered list of integers is 
    to use a comma separated list of either

    individual integers
    or a range of integers denoted by the starting integer separated 
    from the end integer in the range by a dash, '-'. 
    The range includes all integers in the interval including both endpoints. 
    It is not considered a range unless it spans at least 3 numbers. 
    For example ("12, 13, 15-17")
    Complete the solution so that it takes a list of integers in 
    increasing order and returns a correctly formatted string in the range format.

    Example:

    solution([-6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20]);
    // returns "-6,-3-1,3-5,7-11,14,15,17-20"
    `
};
Solution.solution_01 = {
    d: `intuitive`,
    f: function (list) {
        let ret = [];
        for (let i = 0, c = 0; i < list.length; i++) {
            if (list[i + 1] - list[i] == 1) {
                c++;
            } else {
                if (c > 1) {
                    ret.push(list[i - c] + '-' + list[i]);
                } else if (c == 1) {
                    ret.push(list[i - 1]);
                    ret.push(list[i]);
                } else {
                    ret.push(list[i]);
                }
                c = 0;
            }
        }
        return ret.join();
    }
};
Solution.solution_02 = {
    d: `dynamic list altering`,
    f: function (list) {
        let ret = Array.from(list);
        for (let i = 0, j = 0; i < ret.length; j = ++i) {
            while (ret[j] - ret[j + 1] === -1)
                j++;
            if (j - i > 1)
                ret.splice(i, j - i + 1, ret[i] + '-' + ret[j]);
        }
        return ret.join();
    }
};
Solution.solution_03 = {
    d: `map`,
    f: function (list) {
        return list.map((n, i) =>
            (i > 0 && i < list.length - 1 &&
                list[i - 1] + 1 === n && n === list[i + 1] - 1) ?
            'p' : n
        ).join().replace(/,[,p]*,/g, '-');
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

function genSets(solution) {
    var testSets = [];
    for (let i = 0; i < 100; i++) {
        let list = [];
        for (let j = i - 10; j < i + 11; j++) {
            if (randBoolean())
                list.push(j);
        }
        var match = solution.f(list);
        testSets.push([
            [list, ],
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
testFixture.test(false);
testFixture.testSpd(100);