'use strict';

var Solution = {
    d: `
    Description
    `
};
Solution.add_01 = {
    d: `intuitive`,
    f: function(a, b) {
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
Solution.add_02 = {
    d: `Array.unshift`,
    f: function(a, b) {
        var carry = 0;
        var ret = [];
        var nA = a.length;
        var nB = b.length;
        var n = Math.max(nA, nB);
        for (let i = -1, retSub = 0; i >= -n; i--) {
            retSub = (+a[i + nA] || 0) + (+b[i + nB] || 0) + carry;
            carry = parseInt(retSub / 10);
            ret.unshift(retSub % 10);
        }
        if (carry)
            ret.unshift(1);
        return ret.join('');
    }
};
Solution.add_03 = {
    d: `Array.pop`,
    f: function(a, b) {
        var ret = '';
        var carry = 0;
        a = a.split('');
        b = b.split('');
        while (a.length || b.length || carry) {
            carry += ~~a.pop() + ~~b.pop();
            ret = carry % 10 + ret;
            carry = carry > 9;
        }
        return ret;
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

function genSets(add) {
    var testSets = [];
    for (let i = 10; i <= 100; i++) {
        var a = randString(i, false, false);
        a = a.replace(/^0+/, '');
        var b = randString(i, false, false);
        b = b.replace(/^0+/, '');
        var match = add.f(a, b);
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
