'use strict';
let Solution = {
    d: `
    https://www.codewars.com/kata/576757b1df89ecf5bd00073b

    Build Tower by given number of floors (integers and always greater than 0).

    Tower block is represented as '*'

    Have fun!

    # for example, a tower of 3 floors looks like below
    [
      ['  *  '],
      [' *** '],
      ['*****']
    ]
    `
};
Solution.towerBuilder_01 = {
    d: ``,
    f: function(nFloors) {
        let floors = [];
        for (let i = 0, n = nFloors - 1; i < nFloors; ++i, --n) {
            floors.push(Array(n + 1).join(" ") + Array(i * 2 + 2).join("*") + Array(n + 1).join(" "));
        }
        return floors;
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
    for (let i = 0; i < 100; i++) {
        let x = randNumber(0, 100);
        let match = subSol.f(x);
        testSets.push([
            [x, ],
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
