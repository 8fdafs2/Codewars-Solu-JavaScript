'use strict';

let Solution = {
    d: `
    https://www.codewars.com/kata/function-cache

    If you are calculating complex things or execute time - 
    consuming API calls, 
    you sometimes want to cache the results.
    In this case we want you to create a function wrapper, 
    which takes a function and caches its results depending on 
    the arguments, that were applied to the function.

    Usage example:

        var complexFunction = function (arg1, arg2) { /* complex calculation in here */ };
        var cachedFunction = cache(complexFunction);

        cachedFunction('foo', 'bar'); // complex function should be executed
        cachedFunction('foo', 'bar'); // complex function should not be invoked again, instead the cached result should be returned
        cachedFunction('foo', 'baz'); // should be executed, because the method wasn't invoked before with these arguments
    `
};
Solution.cache_01 = {
    d: `intuitive`,
    f: function (func) {
        let hashtab = {};
        return function (...args) {
            let argsStr = JSON.stringify(args);
            if (argsStr in hashtab)
                return [hashtab[argsStr], true];
            return [hashtab[argsStr] = func(...args), false];
        };
    }
};
Solution.cache_01.f = Solution.cache_01.f(complexFunc);

Solution.cache_02 = {
    d: `intuitive`,
    f: function (func) {
        let hashtab = {};
        return function () {
            let argsStr = JSON.stringify(arguments);
            let hit = true;
            if (!hashtab.hasOwnProperty(argsStr)) {
                hashtab[argsStr] = func.apply(null, arguments);
                hit = false;
            }
            return [hashtab[argsStr], hit];
        };
    }
};
Solution.cache_02.f = Solution.cache_02.f(complexFunc);

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

function complexFunc(n1, n2) {
    return Math.pow(n1, n2);
}

// cmpr(toMatch, testSet)
function cmpr(toMatch, testSet) {
    return (toMatch[0] === testSet[testSet.length - 1][0]) &&
        (toMatch[1] || (toMatch[1] === testSet[testSet.length - 1][1]));
}

function genSets(subSol) {
    let testSets = [];
    for (let i = 0; i < 1000; i++) {
        let n1 = randNumber(0, 49);
        let n2 = randNumber(0, 49);
        let match = subSol.f(n1, n2);
        testSets.push([
            [n1, n2, ],
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
let testFixture = TestFixture(Solution, genSets, cmpr);
testFixture.prep();
testFixture.test(false);
testFixture.testSpd(100);