'use strict';
let Solution = {
    d: `
    https://www.codewars.com/kata/57675f3dedc6f728ee000256

    Build Tower by given number of floors (integers and always greater than 0) and the block size (width, height)

    Tower block unit is represented as '*'

    Have fun!

    # for example, a tower of 3 floors with block size = (2, 3) looks like below
    [
      ['  **  '],
      ['  **  '],
      ['  **  '],
      [' **** '],
      [' **** '],
      [' **** '],
      ['******'],
      ['******'],
      ['******']
    ]
    `
};
Solution.towerBuilderAdvanced_01 = {
    d: ``,
    f: function(nFloors, nBlockSz) {
        let [w, h] = nBlockSz;
        let floors = [];
        for (let i = 0, n = nFloors - 1; i < nFloors; ++i, --n) {
            for (let j = 0; j < h; j++)
                floors.push(Array(n * w + 1).join(" ") + Array((i * 2 + 1) * w + 1).join("*") + Array(n * w + 1).join(" "));
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
