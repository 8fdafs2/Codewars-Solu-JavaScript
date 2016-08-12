'use strict';
let Solution = {
    d: `
    https://www.codewars.com/kata/last-digit-of-a-huge-number

    For a given list [x1, x2, x3, ..., xn] compute the 
    last (decimal) digit of x1 ^ (x2 ^ (x3 ^ (... ^ xn))).

    E. g.,

    lastDigit([3, 4, 2]) === 1
    because 3 ^ (4 ^ 2) = 3 ^ 16 = 43046721.

    Beware: powers grow incredibly fast. For example, 
    9 ^ (9 ^ 9) has more than 369 millions of digits. 
    lastDigit has to deal with such numbers efficiently.

    Corner cases: we assume that 0 ^ 0 = 1 and 
    that lastDigit of an empty list equals to 1.

    This kata generalizes Last digit of a large number; 
    you may find useful to solve it beforehand.
    `
};
Solution.lastDigit_01 = {
    d: ``,
    f: function (as) {

        function recur(as) {

            as = Array.from(as);
            let l = as.length;
            if (l === 0)
                return 1;
            if (l == 1)
                return as[0] % 10;
            if (l == 2) {
                if (as[1] === 0)
                    return 1;
                return Math.pow(as[0] % 10, as[1] % 4 + 4) % 10;
            }

            if (as[l - 1] === 0)
                return recur([...as.slice(0, l - 2), 1]);
            if (as[l - 1] === 1)
                return recur(as.slice(0, l - 1));
            if (as[l - 2] === 0)
                return recur([...as.slice(0, l - 2), 0]);
            if (as[l - 2] % 4 === 0)
                return recur([...as.slice(0, l - 2), 4]);
            return recur([...as.slice(0, l - 2), Math.pow(as[l - 2] % 20, as[l - 1] % 4 + 4)]);
        }

        return recur(as);

    }
};
Solution.lastDigit_02 = {
    d: `kata author's`,
    f: function (as) {

        function isZero(as) {
            return as.reduceRight((acc, x) => (x === 0 && !acc), false);
        }

        function squashZeros(as) {

            function recur(x, as) {
                if (as.length === 0)
                    return [x];
                let x_ = as.shift();
                if (x_ === 0)
                    return isZero(as) ? [x] : [];
                as = recur(x_, as);
                as.unshift(x);
                return as;
            }

            if (as.length === 0)
                return [];
            let x = as.shift();
            if (x === 0)
                return isZero(as) ? [] : [0];
            return recur(x, as);
        }

        // pow(a, b) % 4 == pow(a % 4, b % 2 + 2) % 4
        // pow(a, b) % 10 == pow(a % 10, b % 4 + 4) % 10
        // pow(a, pow(b, c)) % 10 
        //  == pow(a, pow(b, c) % 4 + 4) % 10
        //  == pow(a, pow(b % 4, c % 2 + 2) % 4 + 4) % 10

        as = squashZeros(Array.from(as));
        let a = as.length > 0 ? as[0] : 1;
        let b = as.length > 1 ? as[1] : 1;
        let c = as.length > 2 ? as[2] : 1;
        b = c === 1 ? b : Math.pow(b % 4, 2 + c % 2);
        // b = c === 1 ? b : Math.pow(b % 4, 1 + (c + 1) % 2);
        b = 4 + b % 4;
        // b = 1 + (b + 3) % 4;
        a = Math.pow(a % 10, b) % 10;
        return a;
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

function genSets(lastDigit) {
    let testSets = [];
    for (let i = 2; i < 1000; i++) {
        let as = [];
        for (let j = 0; j < i; j++) {
            // as.push(randNumber(0, 1000000));
            if (randBoolean())
                as.push(randNumber(0, 1000));
            else
                as.push(0);
        }
        let match = lastDigit.f(as);
        testSets.push([
            [as, ],
            match
        ]);
        // console.log(as, match);
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
testFixture.testSpd(1);