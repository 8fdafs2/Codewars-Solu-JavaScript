'use strict';
var Solution = {
    d: `
    https://www.codewars.com/kata/521ef596c106a935c0000519

    We need prime numbers and we need them now!

    Write a method that takes a maximum bound and returns 
    all primes starting with 0 up-to and including the maximum bound.

    For example:

    prime(11);
    Should return an array that looks like this:

    [2,3,5,7,11]
    `
};
Solution.prime_01 = {
    d: ``,
    f: function (num) {
        if (num < 2)
            return [];
        if (num == 2)
            return [2, ];
        let sieve = [];
        for (let i = 3; i < num + 1; i += 2)
            sieve.push(i);
        for (let i = 0, top = sieve.length, bot, m; i < top; i++) {
            m = sieve[i];
            if (m !== 0) {
                bot = (m * m - 3) >> 1;
                if (bot >= top)
                    return [2, ].concat(sieve.filter(x => x !== 0));
                for (let j = bot; j < top; j += m)
                    sieve[j] = 0;
            }
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

function genSets(prime) {
    var testSets = [];
    for (let num = 0; num < 10000; num++) {
        var match = prime.f(num);
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
testFixture.testSpd(10);