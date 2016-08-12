'use strict';
var Solution = {
    d: `
	https://www.codewars.com/kata/bit-counting

	Write a function that takes an (unsigned) integer as input, 
	and returns the number of bits that are equal to 
	one in the binary representation of that number.

	Example: The binary representation of 1234 is 10011010010, 
	so the function should return 5 in this case
    `
};
Solution.countBits_01 = {
    d: `replace`,
    f: function (n) {
        return n.toString(2).replace(/0/g, '').length;
    }
};
Solution.countBits_02 = {
    d: `>>=, &`,
    f: function (n) {
        var ret = 0;
        for (; n; n >>= 1)
            ret += n & 1;
        return ret;
    }
};
Solution.countBits_03 = {
    d: `match`,
    f: function (n) {
        var ret = n.toString(2).match(/1/g);
        return (ret ? ret.length : 0);
    }
};
Solution.countBits_04 = {
    d: `http://graphics.stanford.edu/~seander/bithacks.html`,
    f: function (n) {
        n = n - ((n >>> 1) & 0x55555555);
        n = (n & 0x33333333) + ((n >>> 2) & 0x33333333);
        return ((n + (n >>> 4) & 0xF0F0F0F) * 0x1010101) >>> 24;
    }
};
Solution.countBits_05 = {
    d: `eval`,
    f: function (n) {
        return eval(n.toString(2).split('').join('+'));
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

function genSets(countBits) {
    var testSets = [];
    for (let n = 0; n <= 1000; n++) {
        var match = countBits.f(n);
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