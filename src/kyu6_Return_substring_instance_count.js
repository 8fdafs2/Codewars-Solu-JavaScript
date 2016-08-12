'use strict';
var Solution = {
    d: `
    https://www.codewars.com/kata/return-substring-instance-count

    Complete the solution so that it returns the number of 
    times the search_text is found within the full_text.

    Usage example:

    solution('aa_bb_cc_dd_bb_e', 'bb') 
    # should return 2 since bb shows up twice
    solution('aaabbbcccc', 'bbb') 
    # should return 1
    `
};
Solution.solution_01 = {
    d: `replace`,
    f: function (fullText, searchText) {
        var rest = fullText.replace(new RegExp(searchText, 'g'), '');
        return (fullText.length - rest.length) / searchText.length;
    }
};
Solution.solution_02 = {
    d: `match`,
    f: function (fullText, searchText) {
        var tmp = fullText.match(new RegExp(searchText, 'g'));
        return (tmp || []).length;
    }
};
Solution.solution_03 = {
    d: `split`,
    f: function (fullText, searchText) {
        return fullText.split(searchText).length - 1;
    }
};
Solution.solution_04 = {
    d: `exec`,
    f: function (fullText, searchText) {
        var count = 0;
        var reg = new RegExp(searchText, 'g');
        while (reg.exec(fullText)) {
            count++;
        }
        return count;
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
    for (let i = 10; i < 5000; i++) {
        var fullText = randStringBy(i, 'abcdef');
        var searchText = randStringBy(randNumber(3, 5), 'abcdef');
        var match = solution.f(fullText, searchText);
        testSets.push([
            [fullText, searchText, ],
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