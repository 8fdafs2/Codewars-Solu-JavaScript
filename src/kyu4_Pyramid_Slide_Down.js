'use strict';
let Solution = {
    d: `
    https://www.codewars.com/kata/pyramid-slide-down
    
    Lyrics...

    Pyramids are amazing! Both in architectural and mathematical sense. 
    If you have a computer, 
    you can mess with pyramids even if you are not in Egypt at the time. 
    For example, let's consider the following problem. 
    Imagine that you have a plane pyramid built of numbers, 
    like this one here:

       /3/
      \7\ 4 
     2 \4\ 6 
    8 5 \9\ 3
    Here comes the task...

    Let's say that the 'slide down' is a sum of consecutive numbers from 
    the top to the bottom of the pyramid. 
    As you can see, the longest 'slide down' is 3 + 7 + 4 + 9 = 23

    Your task is to write a function longestSlideDown 
    (in ruby: longest_slide_down) that takes a pyramid 
    representation as argument and returns its' longest 'slide down'. 
    For example,

    By the way...

    My tests include some extraordinarily high pyramides so as 
    you can guess, brute-force method is a bad idea unless you 
    have a few centuries to waste. You must come up with something 
    more clever than that.

    (c) This task is a lyrical version of the Problem 18 
    and/or Problem 67 on ProjectEuler.
    `
};
Solution.longestSlideDown_01 = {
    d: ``,
    f: function (pyramid) {
        return;
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