'use strict';
var Solution = {
    d: `
    https://www.codewars.com/kata/the-hashtag-generator

    The marketing team are spending way too much time typing in hashtags.
    Let's help them with out own Hashtag Generator!

    Here's the deal:

    If the final result is longer than 140 chars it must return false.
    If the input is a empty string it must return false.
    It must start with a hashtag (#).
    All words must have their first letter capitalized.
    Example Input to Output:

    " Hello there thanks for trying my Kata" => 
    "#HelloThereThanksForTryingMyKata"

    " Hello World " => "#HelloWorld"
    `
};
Solution.generateHashing_01 = {
    d: `split, reduce`,
    f: function (str) {
        if (!str) return false;
        let ret = str.trim().split(' ').reduce(
            (x, y) => (x + y[0].toUpperCase() + y.slice(1)),
            '#'
        );
        return ret.length < 141 ? ret : false;
    }
};
Solution.generateHashing_02 = {
    d: `split, reduce, splice`,
    f: function (str) {
        if (!str) return false;
        let ret = str.split(' ').reduce(
            (x, y) => (x + (y ? (y = y.split(''), y.splice(0, 1, y[0].toUpperCase()), y.join('')) : '')),
            '#'
        );
        return ret.length < 141 ? ret : false;
    }
};
Solution.generateHashing_03 = {
    d: `split, map`,
    f: function (str) {
        if (!str) return false;
        let ret = '#' + str.split(' ').map(x => x ? x[0].toUpperCase() + x.slice(1) : x).join('');
        return ret.length < 141 ? ret : false;
    }
};
Solution.generateHashing_04 = {
    d: `regex`,
    f: function (str) {
        if (!str) return false;
        // let ret = '#' + str.replace(/\b\S/g, String.call.bind(''.toUpperCase)).replace(/\s/g, '');
        let ret = '#' + str.replace(/\b\S/g, String.toUpperCase).replace(/\s/g, '');
        // let ret = '#' + str.replace(/\b\S/g, x => x.toUpperCase()).replace(/\s/g, '');
        return ret.length < 141 ? ret : false;
    }
};
Solution.generateHashing_05 = {
    d: `regex`,
    f: function (str) {
        if (!str) return false;
        let ret = '#' + str.replace(/\w\w*/g, x => x[0].toUpperCase() + x.substring(1)).replace(/ /g, '');
        return ret.length < 141 ? ret : false;
    }
};
Solution.generateHashing_06 = {
    d: `regex`,
    f: function (str) {
        if (!str) return false;
        let ret = '#' + str.replace(/\s*\b(\w+)\b\s*/g, (match, p1) => p1[0].toUpperCase() + p1.substring(1));
        return ret.length < 141 ? ret : false;
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

function genSets(generateHashing) {
    let testSets = [];
    for (let i = 10; i < 100; i++) {
        let str = [];
        for (let j = 0; j < i; j++) {
            str.push(randString(randNumber(3, 8), true, false, false));
        }
        str = str.join(' ');
        let match = generateHashing.f(str);
        testSets.push([
            [str, ],
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