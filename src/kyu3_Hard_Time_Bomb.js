'use strict';

var Solution = {
    d: `
    https://www.codewars.com/kata/hard-time-bomb

    A bomb has been set to go off! 
    You have to find the wire and cut it in order to stop the timer. 
    There is a global var that holds the numeric ID to which wire to cut. 
    Find that and then you can Bomb.CutTheWire(wireKey);
    `
};
Solution.getWire_01 = {
    d: ``,
    f: function () {
        //console.log(String(global));
        for (var wire in global) {
            if (typeof global[wire] === 'number') {
                let wireCode = global[wire];
                global.bomb.CutTheWire(wireCode);
            }
        }
    }
};
Solution.getWire_02 = {
    d: ``,
    f: function () {
        //console.log(global);
        let wireCode;
        for (let i in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) {
            if (global['boom' + i])
                wireCode = global['boom' + i];
        }
        global.bomb.CutTheWire(wireCode);
    }
};
Solution.getWire_03 = {
    d: ``,
    f: function () {
        //console.log(global);
        for (let wire in global)
            if (wire.indexOf('boom') === 0) {
                let wireCode = global[wire];
                global.bomb.CutTheWire(wireCode);
            }
    }
};
Solution.getWire_04 = {
    d: ``,
    f: function () {
        //console.log(global);
        Object
            .keys(global)
            .filter(function (key) {
                return /boom\d+/.test(key);
            })
            .forEach(function (key) {
                global.bomb.CutTheWire(global[key]);
            });
    }
};
Solution.getWire_05 = {
    d: ``,
    f: function () {
        //console.log(global);
        let wireCode = global[Object.keys(global).slice(-2, -1)];
        //let wireCode = this[Object.keys(global)[Object.keys(global).length - 2]]
        global.bomb.CutTheWire(wireCode);
    }
};
Solution.getWire_06 = {
    d: ``,
    f: function () {
        let str = '';
        for (let i in global) {
            if (i !== 'global' && i !== 'process' && i != 'core') {
                str += String(global[i]);
            }
        }
        global.bomb.CutTheWire(+(str).match(/0\.[0-9]+/)[0]);
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

var bombSet = function () {
    var myWireVar = 'boom' + ~~(Math.random() * 10),
        Bomb = function () {
            this.Explode = function () {
                console.log('The wire was "cut":');
                assert(typeof global[myWireVar] === 'undefined', 'BOOM! You failed to cut the wire!');
            };
            this.CutTheWire = function (wireCode) {
                // console.log('A numeric wireCode is specified:');
                assert(typeof wireCode === 'number', 'BOOM! You have to specify the number ID of the wire to cut.');
                // console.log('Correct wireCode is specified:');
                assert(wireCode === global[myWireVar], 'BOOM! You cut the wrong wire!');
                // eval.call(global, 'var ' + myWireVar + ' = undefined;');
            };
        };
    global[myWireVar] = Math.random();
    global.bomb = new Bomb();
};

bombSet();

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