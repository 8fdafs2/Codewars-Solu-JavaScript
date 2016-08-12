'use strict';

var Solution = {
    d: `
    https://www.codewars.com/kata/simple-time-bomb

    A bomb has been set to go off! 
    You have to find the wire and cut it in order to stop the timer. 
    There is a global property that holds the key to which wire to cut. 
    Find that and then you can CutTheWire(wireKey);
    `
};
Solution.getWire_01 = {
    d: ``,
    f: function () {
        //console.log(CutTheWire.toString());
        //console.log(this[theWire]);
        let wire = theWire;
        CutTheWire(global[wire]);
    }
};
Solution.getWire_02 = {
    d: ``,
    f: function () {
        //console.log(global);
        for (let wire in global) {
            if (typeof global[wire] == 'number') {
                CutTheWire(global[wire]);
                return;
            }
        }
    }
};
Solution.getWire_03 = {
    d: ``,
    f: function () {
        //console.log(global);
        let wire = Object.keys(global).pop();
        CutTheWire(global[wire]);
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

var assert = require('assert');

var theWire = randString(randNumber(8, 10));

global[theWire] = randNumber(0, 1);

var CutTheWire = function (wireCode) {
    assert(typeof wireCode === 'number', 'BOOM! You have to specify which wire to cut!');
    assert(wireCode === global[theWire], 'BOOM! You cut the wrong wire!');
    //delete this[theWire];
};

function genSets(subSol) {
    var testSets = [];
    for (let i = 0; i < 100; i++) {
        var match = subSol.f();
        testSets.push([
            [],
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

// for (let key in global)
//     console.log(key);
// console.log(Object.keys(global));
// console.log(Object.getOwnPropertyNames(global));