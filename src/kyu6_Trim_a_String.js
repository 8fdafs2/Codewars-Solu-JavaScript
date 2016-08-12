'use strict';

function g(str) {
    return str.trim();
}

var Solution = {
    d: `
    https://www.codewars.com/kata/trim-a-string

    Extend the String prototype by a trim function, 
    that returns the string with leading or trailing whitespaces removed.

    Examples can be found in the test fixture.
    `
};
Solution.subSol_01 = {
    d: ``,
    f: function (str) {
        return str.trim();
    }
};
Solution.subSol_02 = {
    d: ``,
    f: function (str) {
        String.prototype.trim = function () {
            return this.match(/^\s*([\s\S]*?)\s*$/)[1];
        };
        this.f = g;
        return this.f(str);
    }
};
Solution.subSol_03 = {
    d: ``,
    f: function (str) {
        String.prototype.trim = function () {
            return this.replace(/^\s*/, '').replace(/\s*$/, '');
        };
        this.f = g;
        return this.f(str);
    }
};
Solution.subSol_04 = {
    d: ``,
    f: function (str) {
        String.prototype.trim = function () {
            return this.replace(/^\s*|\s*$/g, '');
        };
        this.f = g;
        return this.f(str);
    }
};
Solution.subSol_05 = {
    d: ``,
    f: function (str) {
        String.prototype.trim = function () {
            return this.trimLeft().trimRight();
        };
        this.f = g;
        return this.f(str);
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
    for (let i = 10; i < 1000; i++) {
        var str = randStringBy(i, ' \n\t\rabcdefg');
        var match = subSol.f(str);
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