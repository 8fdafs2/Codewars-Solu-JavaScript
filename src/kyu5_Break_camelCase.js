'use strict';
var Solution = {
    d: `
    https://www.codewars.com/kata/break-camelcase

    Complete the solution so that the
    function will break up camel casing, 
    using a space between words.

    Example

    solution('camelCasing') // => should return 'camel Casing'
    `
};
Solution.solution_01 = {
    d: `match`,
    f: function (string) {
        let ret = '';
        let i;
        while (i = string.match(/[A-Z]/)) {
            i = i.index;
            ret += string.substring(0, i) + ' ' + string[i];
            string = string.substring(i + 1);
        }
        return ret + string;
    }
};
Solution.solution_02 = {
    d: `replace`,
    f: function (string) {
        return string.replace(/[A-Z]/g, ' $&');
        // return string.replace(/([A-Z])/g, ' $1');
        // return string.replace(/[a-z][A-Z]/g, '$1 $2');
    }
};
Solution.solution_03 = {
    d: `split`,
    f: function (string) {
        return string.split(/(?=[A-Z])/).join(' ');
    }
};
Solution.solution_04 = {
    d: `reduce`,
    f: function (string) {
        return string.split('').reduce((x, y) => /[A-Z]/.test(y) ? x + ' ' + y : x + y, '');
    }
};
Solution.solution_05 = {
    d: `map`,
    f: function (string) {
        return string.split('').map(x => /[A-Z]/.test(x) ? (' ' + x) : x).join('');
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
    let testSets = [];
    for (let i = 3; i < 100; i++) {
        let string = randString(randNumber(3, 8), true, false, false);
        for (let j = 0, w; j < i; j++) {
            w = randString(randNumber(3, 8), true, false, false);
            string += w[0].toUpperCase() + w.substring(1);
        }
        let match = solution.f(string);
        testSets.push([
            [string, ],
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