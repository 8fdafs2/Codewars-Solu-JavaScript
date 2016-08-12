'use strict';
var Solution = {
    d: `
    https://www.codewars.com/kata/find-the-odd-int

    Given an array, 
    find the int that appears an odd number of times.

    There will always be only one integer that 
    appears an odd number of times.
    `
};
Solution.findOdd_01 = {
    d: `hashtab`,
    f: function (A) {
        let hashTab = {};
        for (let i in A) {
            hashTab[A[i]] = hashTab[A[i]] ?
                hashTab[A[i]] + 1 : 1;
        }
        for (let j in hashTab) {
            if (hashTab[j] % 2 !== 0)
                return +j;
        }
    }
};
Solution.findOdd_02 = {
    d: `reduce, xor`,
    f: function (A) {
        return A.reduce((a, b) => a ^ b);
    }
};
Solution.findOdd_03 = {
    d: `sort`,
    f: function (A) {
        A.sort();
        for (let i = 0; i < A.length; i += 2) {
            if (A[i] !== A[i + 1])
                return A[i];
        }
    }
};
Solution.findOdd_04 = {
    d: `filter, slow!`,
    f: function (A) {
        return A.reduce(
            (a, b) => ((A.filter(x => x === b).length % 2 === 0) ? a : b), undefined
        );
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

arrayManip();

function genSets(findOdd) {
    let testSets = [];
    for (let i = 5; i < 100; i += 2) {
        let j = i;
        let A = [];
        let num;
        let count;
        while (j > 2) {
            num = randNumber(0, 100);
            count = randNumber(2, j - 1);
            count = (count % 2 === 0) ? count : count + 1;
            j -= count;
            while (count--)
                A.push(num);
            if (randChoice([true, false, false, false, false]))
                break;
        }
        num = randNumber(0, 100);
        while (j--) {
            A.push(num);
        }
        A.shuffle();
        var match = findOdd.f(A);
        testSets.push([
            [A, ],
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