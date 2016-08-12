'use strict';
var Solution = {
    d: `
    https://www.codewars.com/kata/adding-ordinal-indicator-suffixes-to-numbers

    Finish the function numberToOrdinal, 
    which should take a number and return it as a string with 
    the correct ordinal indicator suffix (in English). That is:

    numberToOrdinal(1) ==> '1st'
    numberToOrdinal(2) ==> '2nd'
    numberToOrdinal(3) ==> '3rd'
    numberToOrdinal(4) ==> '4th'
    ... and so on
    For the purposes of this kata, you may assume that the function will 
    always be passed a non-negative integer. 
    If the function is given 0 as an argument, 
    it should return '0' (as a string).

    To help you get started, here is an excerpt from Wikipedia's page on Ordinal Indicators:

    st is used with numbers ending in 1 (e.g. 1st, pronounced first)
    nd is used with numbers ending in 2 (e.g. 92nd, pronounced ninety-second)
    rd is used with numbers ending in 3 (e.g. 33rd, pronounced thirty-third)
    As an exception to the above rules, 
    all the "teen" numbers ending with 11, 12 or 13 use -th (e.g. 11th, 
    pronounced eleventh, 112th, pronounced one hundred [and] twelfth)
    th is used for all other numbers (e.g. 9th, pronounced ninth).
    `
};
Solution.numberToOrdinal_01 = {
    d: `intuitive`,
    f: function (n) {
        n = n.toString();
        let l = n.length;
        if (n === '0') return n;
        if (l > 1 && n[l - 2] == '1') return n + 'th';
        switch (n[l - 1]) {
        case '1':
            return n + 'st';
        case '2':
            return n + 'nd';
        case '3':
            return n + 'rd';
        default:
            return n + 'th';
        }
    }
};
Solution.numberToOrdinal_02 = {
    d: `integer div/mod`,
    f: function (n) {
        if (n === 0) return '0';
        if (Math.floor(n / 10) % 10 == 1) return n + 'th';
        switch (n % 10) {
        case 1:
            return n + 'st';
        case 2:
            return n + 'nd';
        case 3:
            return n + 'rd';
        default:
            return n + 'th';
        }
    }
};
Solution.numberToOrdinal_03 = {
    d: `regex`,
    f: function (n) {
        n = n.toString();
        if (n === '0') return n;
        if (n.match(/\d*(11|12|13)$/)) return n + 'th';
        if (n.match(/\d*(1)$/)) return n + 'st';
        if (n.match(/\d*(2)$/)) return n + 'nd';
        if (n.match(/\d*(3)$/)) return n + 'rd';
        return n + 'th';
    }
};
Solution.numberToOrdinal_04 = {
    d: `integer mod`,
    f: function (n) {
        if (n === 0) return '0';
        let n$ = n % 100;
        // let hashtab = {
        //     11: null,
        //     12: null,
        //     13: null,
        // };
        // if (n$ in hashtab) return n + 'th';b
        if (9 < n$ && n$ < 20) return n + 'th';
        switch (n % 10) {
        case 1:
            return n + 'st';
        case 2:
            return n + 'nd';
        case 3:
            return n + 'rd';
        default:
            return n + 'th';
        }
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
    var testSets = [];
    for (let n = 0; n < 10000; n++) {
        var match = subSol.f(n);
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
var testFixture = TestFixture(Solution, genSets);
testFixture.prep();
testFixture.test(false);
testFixture.testSpd(100);