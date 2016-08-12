'use strict';
var Solution = {
    d: `
    https://www.codewars.com/kata/56f8a648ba792a778a0000b9

    This is the challenge version of coding 3min series. 
    If you feel difficult, please complete the simple version

    Task:

    Find out "B"(Bug) in a lot of "A"(Apple).

    There will always be one bug in apple, not need to consider the situation that without bug or more than one bugs.

    input: string Array apple

    output: Location of "B", [x,y]
    Code length calculation

    In javascript, we can't get the user's real code,
     we can only get the system compiled code. 
     Code length calculation is based the compiled code.

    For example:

    If you typed sc=x=>x+1
    after compile, it will be:sc=function(x){return x+1;}
    `
};
Solution.sc_01 = {
    d: ``,
    f: function (a) { // code length = 70
        let j;
        for (let i in a)
            if ((j = a[i].indexOf('B')) > -1)
                return [+i, j];
    }
};
Solution.sc_02 = {
    d: ``,
    f: function (a) { // code length = 76
        let p = a.join().indexOf('B') / 2,
            l = a[0].length;
        return [~~(p / l), p % l];
    }
};
Solution.sc_03 = {
    d: ``,
    f: function (a) { // code length = 76
        let p = ('' + a).match('B').index / 2,
            l = a[0].length;
        return [p / l | 0, p % l];
    }
};
Solution.sc_04 = {
    d: ``,
    f: function (a) { // code length = 69
        for (let i = -1, j;;)
            if (~(j = a[++i].indexOf('B')))
                return [i, j];
    }
};
Solution.sc_05 = {
    d: ``,
    f: function (a) { // code length = 69
        for (let i = -1, j;;)
            if (~(j = a[++i].indexOf('B')))
                return [i, j];
    }
};
Solution.sc_06 = {
    d: ``,
    f: function (a) { // code length = 69
        for (var i = 0, j; 0 > (j = a[i].indexOf('B')); i++);
        return [i, j];
    }
};
Solution.sc_07 = {
    d: ``,
    f: function (a) { // code length = 69
        let i = -1,
            j;
        while (1)
            if (~(j = a[++i].indexOf('B')))
                return [i, j];
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

function genSets(sc) {
    var testSets = [];
    for (let h = 10; h <= 60; h++) {
        for (let w = 10; w <= 60; w++) {
            var apple = [...Array(h)].map(x => [...Array(w)].map(y => "A"));
            apple[randNumber(0, h - 1)][randNumber(0, w - 1)] = 'B';
            var match = sc.f(apple);
            testSets.push([
                [apple, ],
                match
            ]);
        }
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