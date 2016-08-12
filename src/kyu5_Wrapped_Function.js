'use strict';

var g = function () {
    var speak = (name => "Hello " + name).wrap(function (original, yourName, myName) {
        var greeting = original(yourName);
        return greeting + ", my name is " + myName;
    });
    return speak("Mary", "Kate");
};

var Solution = {
    d: `
    https://www.codewars.com/kata/511ed4593ba69cba1a000002

    Create a function method that allow you to wrap an existing function. 
    The method signature would look something like this:

    Usage Example:

    function speak(name){
       return "Hello " + name;
    }

    speak = speak.wrap(function(original, yourName, myName){
       greeting = original(yourName);
       return greeting + ", my name is " + myName;
    })

    var greeting = speak("Mary", "Kate");
    `
};
Solution.subSol_01 = {
    d: `thisFunc = this`,
    f: function (...args) {
        Function.prototype.wrap = function (f) {
            var thisFunc = this;
            return function (...args) {
                return f(thisFunc, ...args);
            };
        };
        this.f = g;
        return this.f(...args);
    }
};
Solution.subSol_02 = {
    d: `bind`,
    f: function (...args) {
        Function.prototype.wrap = function (f) {
            return f.bind(this, this);
        };
        this.f = g;
        return this.f(...args);
    }
};
Solution.subSol_03 = {
    d: `=>`,
    f: function (...args) {
        Function.prototype.wrap = function (f) {
            return (...args) => f(this, ...args);
        };
        this.f = g;
        return this.f(...args);
    }
};

// --------------------------------------------------------------
import {
    ArrayManip,
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
    var testSets = [];
    for (let i = 0; i < 20000; i++) {
        var yourName = randString(randNumber(3, 8), true, false, false);
        var myName = randString(randNumber(3, 8), true, false, false);
        var match = subSol.f(yourName, myName);
        testSets.push([
            [yourName, myName, ],
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