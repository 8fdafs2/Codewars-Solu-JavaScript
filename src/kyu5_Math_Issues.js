'use strict';

function mathReset() {
    delete Math.round;
    delete Math.floor;
    delete Math.ceil;
}

// mathReset();

var g = function (num) {
    return [Math.round(num), Math.floor(num), Math.ceil(num)];
};

var Solution = {
    d: `
    https://www.codewars.com/kata/math-issues

    Oh no, our Math object was "accidently" reset. 
    Can you re-implement some of those functions? 
    We can assure, 
    that only non-negative numbers are passed as arguments. 
    So you don't have to consider things like 
    undefined, null, NaN, negative numbers, strings and so on.

    Here is a list of functions, we need:

    Math.round()
    Math.ceil()
    Math.floor()
    `
};
Solution.subSol_01 = {
    d: `int parse`,
    f: function (num) {
        Math.round = function (num) {
            let numInt = parseInt(num);
            return (num - numInt < 0.5) ? numInt : ++numInt;
        };
        Math.floor = function (num) {
            return parseInt(num);
        };
        Math.ceil = function (num) {
            return Number.isInteger(num) ? parseInt(num) : parseInt(num) + 1;
        };
        this.f = g;
        return this.f(num);
    }
};
Solution.subSol_02 = {
    d: `bitwise signed-32bit-int-limit`,
    f: function (num) {
        Math.round = function (num) { // dependence: Math.floor
            return Math.floor(num + 0.5);
        };
        Math.floor = function (num) {
            return num | 0;
            // return ~~num;
        };
        Math.ceil = function (num) {
            return (num | 0) + (num % 1 !== 0 ? 1 : 0);
            // return ~~num + !!(num % 1)
        };
        this.f = g;
        return this.f(num);
    }
};
Solution.subSol_03 = {
    d: `frac`,
    f: function (num) {
        Math.round = function (num) { // dependence: Math.floor, Math.frac
            return Math.floor(num) + (Math.frac(num) >= 0.5);
        };
        Math.floor = function (num) {
            return parseInt(num);
        };
        Math.ceil = function (num) {
            return Math.floor(num) + !!(Math.frac(num));
        };
        Math.frac = function (num) {
            return num - Math.floor(num);
        };
        this.f = g;
        return this.f(num);
    }
};
Solution.subSol_04 = {
    d: `mod`,
    f: function (num) {
        Math.round = function (num) {
            return (num + 0.5) - (num + 0.5) % 1;
        };
        Math.floor = function (num) {
            return num - num % 1;
        };
        Math.ceil = function (num) {
            // return num - num % 1 + !!(num % 1);
            return num - (num % 1 || 1) + 1;
        };
        this.f = g;
        return this.f(num);
    }
};
Solution.subSol_05 = {
    d: `string`,
    f: function (num) {
        Math.round = function (num) {
            num = num.toString().split('.');
            return num[1] >= 5 ? Number(num[0]) + 1 : Number(num[0]);
        };
        Math.floor = function (num) {
            num = num.toString().split('.');
            return Number(num[0]);
        };
        Math.ceil = function (num) {
            num = num.toString().split('.');
            return num[1] ? Number(num[0]) + 1 : Number(num[0]);
        };
        this.f = g;
        return this.f(num);
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
    const max32BitSignedInt = 2147483647;
    for (let i = 0; i < 100; i++) {
        let num = randNumber(0,
            max32BitSignedInt * 10);
        // Check solution support for x > max32BitSignedInt
        // let num = randNumber((max32BitSignedInt + 1) * 10,
        //     (max32BitSignedInt + 100000) * 10);
        num /= 10;
        let match = subSol.f(num);
        testSets.push([
            [num, ],
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