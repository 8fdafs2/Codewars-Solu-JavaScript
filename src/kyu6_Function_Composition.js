'use strict';

var f$ = function (arg) {
    return arg * arg;
};
var g$ = function (...args) {
    return args.reduce((a, b) => a + b);
};

var Solution = {
    d: `
    https://www.codewars.com/kata/function-composition

    Function composition is a mathematical operation that 
    mainly presents itself in lambda calculus and computability. 
    It is explained well here, but this is my explanation, 
    in simple mathematical notation:

    f3 = compose( f1 f2 )
       Is equivalent to...
    f3(a) = f1( f2( a ) )
    
    Your task is to create a compose function to carry out this task, 
    which will be passed two functions or lambdas. 
    Ruby functions will be passed, and should return, 
    either a proc or a lambda. 
    Remember that the resulting composed function may be 
    passed multiple arguments!

    compose(f , g)(x)
    => f( g( x ) )
    This kata is not available in haskell; that would be too easy!
    `
};
Solution.compose_01 = {
    d: ``,
    f: function (f$, g$) {
        return function () {
            return f$(g$.apply(g$, arguments));
            // return f$(g$.apply(undefined, arguments));
            // return f$(g$.apply(null, arguments));
            // return f$(g$.apply(this, arguments));
        };
    }
};
Solution.compose_02 = {
    d: ``,
    f: function (f$, g$) {
        return function (...args) {
            return f$(g$(...args));
        };
    }
};
Solution.compose_03 = {
    d: ``,
    f: function (f$, g$) {
        return function () {
            let args = Array.from(arguments).join(',');
            // let args = Array.slice(arguments).join(',');
            return eval('f$(g$(' + args + '))');
        };
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

function genSets(compose) {
    var testSets = [];
    for (let i = 10; i <= 100; i++) {
        var args = [];
        for (let j = 0; j < i; j++)
            args.push(randNumber(0, 9));
        var match = compose.f(f$, g$)(...args);
        testSets.push([
            [f$, g$, ],
            args,
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