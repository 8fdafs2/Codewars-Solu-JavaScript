'use strict';
var Solution = {
    d: `
    https://www.codewars.com/kata/which-are-in

    Given two arrays of strings a1 and a2 return a sorted array r in 
    lexicographical order and without duplicates of the strings of 
    a1 which are substrings of strings of a2.

    Example 1:

    a1 = ["arp", "live", "strong"]

    a2 = ["lively", "alive", "harp", "sharp", "armstrong"]

    returns ["arp", "live", "strong"]

    Example 2:

    a1 = ["tarp", "mice", "bull"]

    a2 = ["lively", "alive", "harp", "sharp", "armstrong"]

    returns []

    Notes:

    Arrays are written in "general" notation. 
    See "Your Test Cases" for examples in your language.

    Beware: r must be without duplicates.
    `
};
Solution.inArray_01 = {
    d: `intutive`,
    f: function (array1, array2) {
        let ret = [];
        for (let i in array1) {
            let str = array1[i];
            // if (str in ret)
            if (ret.includes(str))
                continue;
            let reg = new RegExp(str);
            for (let j in array2) {
                if (reg.test(array2[j])) {
                    ret.push(str);
                    break;
                }
            }
        }
        return ret.sort();
    }
};
Solution.inArray_02 = {
    d: `intutive`,
    f: function (array1, array2) {
        array1 = array1.filter((str, pos, self) => self.indexOf(str) == pos).sort();
        return array1.filter(
            needle => array2.some(
                haystack => haystack.indexOf(needle) > -1
            )
        );
    }
};
Solution.inArray_03 = {
    d: `intutive`,
    f: function (array1, array2) {
        array1 = array1.filter((str, pos, self) => self.indexOf(str) == pos).sort();
        array2 = array2.join(' ');
        return array1.filter(
            needle => array2.indexOf(needle) > -1);
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

arrayManip();

function genSets(inArray) {
    var testSets = [];
    for (let i = 3; i < 100; i++) {
        var array1 = [];
        var array2 = [];
        for (let j = 0, str; j < i; j++) {
            str = randString(randNumber(3, 5));
            array1.push(str);
            if (randChoice([true, false, false, false, false])) {
                array2.push(
                    randString(randNumber(0, 3)) +
                    str +
                    randString(randNumber(0, 3)));
            } else {
                array2.push(randString(randNumber(3, 11)));
            }
        }
        array1.shuffle();
        array2.shuffle();
        var match = inArray.f(array1, array2);
        testSets.push([
            [array1, array2, ],
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