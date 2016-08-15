'use strict';
let Solution = {
    d: `
    https://www.codewars.com/kata/pure-odd-digits-primes
    
    Primes that have only odd digits are pure odd digits primes, 
    obvious but necessary definition.Examples of pure odd digit primes are: 
    11, 13, 17, 19, 31...
    If a prime has only one even digit does not belong to pure odd digits prime, 
    no matter the amount of odd digits that may have.

    Create a function, only_oddDigPrimes(), 
    that receive any positive integer n, 
    and output a list like the one bellow:

        [number pure odd digit primes bellow n, 
        largest pure odd digit prime smaller than n, 
        smallest pure odd digit prime higher than n]

    Let 's see some cases:

    only_oddDigPrimes(20) -- -- > [7, 19, 31]
    ///7, beacause we have seven pure odd digit primes bellow 20 and are 3, 5, 7, 11, 13, 17, 19
    19, because is the nearest prime of this type to 20
    31, is the first pure odd digit that we encounter after 20 ///

    only_oddDigPrimes(40) -- -- > [9, 37, 53]
    In the case that n, the given value, is a pure odd prime, 
    should be counted it with the found primes and search
    for the inmediately bellow and the inmediately after.

    Happy coding!! 
    `
};
Solution.onlyOddDigPrimes_01 = {
    d: `intuitive`,
    f: function(n) {
        function isPrime(n) {
            for (let i = 3, nroot = Math.sqrt(n) + 1; i < nroot; i += 2)
                if (n % i === 0) return false;
            return true;
        }
        let r0 = 0;
        let r1 = 0;
        let i = 1;
        while (i += 2) {
            while (/[02468]/.test(i + '')) i += 2;
            if (isPrime(i)) {
                if (i < n) {
                    ++r0;
                    r1 = i;
                } else if (i > n) return [r0, r1, i];
            }
        }
    }
};
Solution.onlyOddDigPrimes_02 = {
    d: ``,
    f: function(n) {
        function isP(n) { //no even
            for (let i = 3; i * i <= n; i += 2)
                if (n % i === 0) return false;
            return true;
        }
        let rs = [3],
            last = 3;
        for (let i = 5; last <= n; i += 2) {
            while (/[24680]/.test(i + "")) i += 2;
            if (isP(i)) {
                rs.push(i);
                last = i;
            }
        }
        if (isP(n) && !(/[24680]/.test(n + "")))
            return [rs.length - 2, rs[rs.length - 3], rs[rs.length - 1]];
        return [rs.length - 1, rs[rs.length - 2], rs[rs.length - 1]];
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

function genSets(onlyOddDigPrimes) {
    let testSets = [];
    for (let n = 4; n < 100; n++) {
        let match = onlyOddDigPrimes.f(n);
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
let testFixture = TestFixture(Solution, genSets);
testFixture.prep();
testFixture.test(false);
testFixture.testSpd(100);
