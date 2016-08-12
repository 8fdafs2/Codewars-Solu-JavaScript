'use strict';
var Solution = {
    d: `
    https://www.codewars.com/kata/count-ip-addresses

    Write a function that accepts a starting and ending IPv4 address, 
    and returns the number of IP addresses from start to end, 
    excluding the end IP address. 
    All input to the ipsBetween function will be valid IPv4 addresses 
    in the form of strings. 
    The ending address will be at least one address higher than the starting address. 

    Examples: 
    ipsBetween("10.0.0.0", "10.0.0.50") => returns 50 
    ipsBetween("10.0.0.0", "10.0.1.0") => returns 256 
    ipsBetween("20.0.0.10", "20.0.1.0") => returns 246
    `
};
Solution.ipsBetween_01 = {
    d: ``,
    f: function (start, end) {
        start = start.split('.');
        end = end.split('.');
        let startNum = 0;
        let endNum = 0;
        for (let i in [1, 2, 3, 4]) {
            startNum *= 256; // startNum <<= 8, 64-bit bitwise operator required
            endNum *= 256; // endNum <<= 8, 64-bit bitwise operator required
            startNum += +start[i];
            endNum += +end[i];
        }
        return endNum - startNum;
    }
};
Solution.ipsBetween_02 = {
    d: ``,
    f: function (start, end) {
        start = start.split('.');
        return end.split('.').reduce(
            (sum, x, i) => sum * 256 + (+x) - (+start[i]), 0
        );
    }
};
Solution.ipsBetween_03 = {
    d: ``,
    f: function (start, end) {
        function toInt(ip) {
            return ip.split('.').reduce((sum, x) => sum * 256 + (+x), 0);
        }
        return toInt(end) - toInt(start);
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

function ipToInt(ip) {
    return ip.split('.').reduce((sum, x) => sum * 256 + (+x), 0);
}

function genSets(ipsBetween) {
    var testSets = [];
    for (let i = 0; i < 100; i++) {
        let start = [];
        let end = [];
        for (let j = 0; j < 4; j++) {
            start.push(randNumber(0, 254));
            end.push(randNumber(0, 254));
        }
        start = start.join('.');
        end = end.join('.');
        if (ipToInt(start) > ipToInt(end)) {
            [start, end] = [end, start];
        }
        var match = ipsBetween.f(start, end);
        testSets.push([
            [start, end],
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