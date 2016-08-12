'use strict';
let Solution = {
    d: `
    https://www.codewars.com/kata/hash-hacker

    Last Christmas Santa received his first computer 
    as a gift from the elves.

    Since he is got nothing to do during the year he 
    learned JavaScript and now he spend all nights on codewars.com. 
    The elves know that he will not bring gift to kids this 
    year since it is too busy training on a very hard kata 
    about himself (yes, this one!).

    The only way to save the Christmas for the elves is 
    to get into the Santa's workshop, get all gifts, 
    and bring them to all kids around the world.

    Unfortunately the workshop door is secured with an 
    strange hash-function based system. 
    The door show a public code y and, in order to access, 
    you have to provide a related private code x: 
    an integer number such than h(x)=y. 
    Where h function is computed by the main 
    server Santa managed to setup this year.

    You're the best hacker of the pole and the elves needs your help!

    You already gained access the server and you know you can 
    exploit it to compute function h. 
    But there is a big problem here: 
    if you call h too much times the server will detect 
    you as an intruder and your mission will fail miserably! 
    [sound of crying kids here]

    the elves know (from some note of Santa) that the first 10 
    calls to function h goes for free, 
    but after that a counter starts and if it exceeds 2⌈log2x⌉ 
    the game is over. 
    (Gosh! the alarm count depends on x, the variable that you don't know!) 
    Moreover, h changes every day but Santa always 
    choose to be a non-decreasing (not necessarily continuous) 
    function over the Reals. 
    The public code y is a Real number while the private code 
    you're looking for must be a non-negative integer x such that h(x)=y, 
    and at least one such value x is guaranteed to exists.

    Are you smart enough to solve this problem and save the Christmas?

    Your code must work well on any possible function h, 
    not only on those few used to validate it here.
    `
};
Solution.crackHash_01 = {
    d: `secant method`,
    f: function (h, y) {
        // secant method
        let x0 = 0;
        let func = x => h(x) - y;
        let func_x0 = func(x0);
        if (func_x0 === 0)
            return x0;
        let x1 = x0 + 1;
        let func_x1;
        let x_inc;
        while (1) {
            func_x1 = func(x1);
            while ((func_x1 - func_x0) === 0) {
                if (func_x1 === 0)
                    return x1;
                x1 *= 1000;
                func_x1 = func(x1);
            }
            x_inc = -Math.round(func_x1 * (x1 - x0) / (func_x1 - func_x0));
            x0 = x1;
            x1 += x_inc;
            func_x0 = func_x1;
            if (x_inc === 0)
                return x1;
        }
    }
};
// Solution.crackHash_02 = {
//     d: ``,
//     f: function (h, y) {
//         // cheater
//         // arguments.callee removed from ES5 strict mode
//         // return arguments.callee.caller.arguments[2];
//         // alternative solution
//         return this.f.caller.arguments;
//     }
// };
// Solution.crackHash_03 = {
//     d: ``,
//     f: function (h, y) {
//         // another cheater
//         Math.floor = () => 0;
//         // Math.pow = () => 0;
//         // Math.log = () => 0;
//         // Math.log = () => 0;
//         return 0;
//     }
// };
Solution.crackHash_04 = {
    d: `binary search`,
    f: function (h, y) {
        if (h(0) == y)
            return 0;

        let step = 10;
        let end = step;
        let y$ = h(end);

        while (y$ < y) {
            end *= step;
            y$ = h(end);
        }

        if (y$ == y)
            return end;

        let start = end / step;
        let mid;

        while (start != end) {
            mid = Math.floor((start + end) / 2);
            y$ = h(mid);
            if (y$ == y)
                return mid;
            if (y$ > y)
                end = mid;
            else
                start = mid + 1;
        }

        return start;
    }
};
Solution.crackHash_05 = {
    d: `binary search, wo float-to-integer conversion`,
    f: function (h, y) {
        if (h(0) == y)
            return 0;

        let binary = {
            left: 1,
            right: 0
        };

        let x = 1;
        let y$ = h(1);

        while (y$ != y) {
            binary[y$ < y ? 'left' : 'right'] = x;

            x = binary.right ? (binary.left + binary.right) / 2 : x * 2;
            y$ = h(x);
        }

        return x;
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

let hs = [
    (x) => 0.003 * x - 1000.0234,
    (x) => 0.0003 * x * x - 1000.0234,
    (x) => 0.00003 * x * x + 0.0003 * x - 1000.0234,
    (x) => Math.sqrt(x * x * x * 0.1) - 0.15,
    (x) => Math.sqrt(x * x * x * 0.01) + 0.015 * x - 10.01,
    (x) => Math.sqrt(x * x * x * 0.001) + 0.05 * x * x + 0.1 * x - 100.06,
    (x) => Math.log(x + 0.5) * 0.05 - 3.5,
    (x) => Math.log(x + 0.05) * 0.005 + 0.0005 * x - 10031.5,
    (x) => Math.log(x + 0.005) * 0.0005 + 0.0005 * x * x + 0.0005 * x - 208.5,
    (x) => Math.pow(1.1, x * 1e-5) * 0.2 + 7.05,
    (x) => Math.pow(1.1, x * 1e-6) * 0.02 + 0.0002 * x + 7.05,
    (x) => Math.pow(1.1, x * 1e-7) * 0.002 + 0.00001 * x * x + 0.0001 * x + 7.05,
];

function genSets(crackHash) {
    let testSets = [];
    for (let i = 0; i < hs.length; i++) {
        let h = hs[i];
        let x = randNumber(0, 1000000);
        let y = h(x);
        let match = crackHash.f(h, y);
        testSets.push([
            [h, y, ],
            match
        ]);
        console.log(h, y, match, x);
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