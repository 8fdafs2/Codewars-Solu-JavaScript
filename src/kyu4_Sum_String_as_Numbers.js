'use strict';
var Solution = {
    d: `
    https://www.codewars.com/kata/sum-strings-as-numbers

    Given the string representations of two integers, 
    return the string representation of the sum of those integers.

    For example:

    sumStrings('1','2') // => '3'
    C# sumStrings("1","2") // => "3"

    A string representation of an integer will 
    contain no characters besides the ten numerals "0" to "9".
    `
};
Solution.sumString_01 = {
    d: `intuitive`,
    f: function (a, b) {
        a = a.replace(/^0+/, '');
        a = b.replace(/^0+/, '');
        var nA = a.length;
        var nB = b.length;
        var n = nA > nB ? nA : nB;
        a = a.split('').map(x => Number(x)).reverse();
        b = b.split('').map(x => Number(x)).reverse();
        var ret = [];
        var carry = 0;
        for (let i = 0, retSub = 0; i < n; i++) {
            retSub = (i < nA ? a[i] : 0) + (i < nB ? b[i] : 0) + carry;
            carry = (retSub > 9);
            ret.push(retSub % 10);
        }
        if (carry > 0)
            ret.push(1);
        return ret.reverse().join('');
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

function genSets(sumString) {
    var testSets = [];
    for (let i = 10; i <= 100; i++) {
        var a = randString(i, false, false);
        var b = randString(i, false, false);
        var match = sumString.f(a, b);
        testSets.push([
            [a, b, ],
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