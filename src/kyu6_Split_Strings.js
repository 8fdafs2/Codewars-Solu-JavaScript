'use strict';
var Solution = {
    d: `
    https://www.codewars.com/kata/split-strings

    Complete the solution so that it splits the string into 
    pairs of two characters. 
    If the string contains an odd number of characters then 
    it should replace the missing second character of 
    the final pair with an underscore ('_').

    Examples:

    solution('abc') // should return ['ab', 'c_']
    solution('abcdef') // should return ['ab', 'cd', 'ef']
    `
};
Solution.solution_01 = {
    d: `intuitive`,
    f: function (str) {
        var ret = [];
        for (let i = 0; i < str.length; i += 2) {
            if (i == str.length - 1)
                ret.push(str[i] + '_');
            else
                ret.push(str[i] + str[i + 1]);
        }
        return ret;
    }
};
Solution.solution_02 = {
    d: `substring`,
    f: function (str) {
        var ret = [];
        let i = 0;
        while (i < str.length) {
            if (i == str.length - 1)
                ret.push(str[i] + '_');
            else
                ret.push(str.substring(i, i + 2));
            i += 2;
        }
        return ret;
    }
};
Solution.solution_03 = {
    d: `match`,
    f: function (str) {
        return (str + '_').match(/../g);
        // return (str + '_').match(/.{2}/g);
    }
};

// --------------------------------------------------------------
import {
    ArrayManip,
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
    for (let i = 1; i < 2000; i++) {
        var str = randString(i);
        var match = solution.f(str);
        testSets.push([
            [str, ],
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