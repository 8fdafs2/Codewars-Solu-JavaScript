'use strict';
var Solution = {
    d: `
    Write an algorithm that takes an array and moves 
    all of the zeros to the end, 
    preserving the order of the other elements.

    moveZeros([false,1,0,1,2,0,1,3,"a"]) // returns[false,1,1,2,1,3,"a",0,0]
    `
};
Solution.moveZeros_01 = {
    d: `intuitive`,
    f: function (arr) {
        let ret = [];
        let c = 0;
        for (let i = 0; i < arr.length; i++)
            if (arr[i] === 0)
                c++;
            else
                ret.push(arr[i]);
        while (c--) {
            ret.push(0);
        }
        return ret;
    }
};
Solution.moveZeros_02 = {
    d: `splice`,
    f: function (arr) {
        let ret = Array.from(arr);
        for (let i = 0, l = ret.length; i < l;)
            if (ret[i] === 0) {
                ret.splice(i, 1);
                ret.push(0);
                l--;
            } else {
                i++;
            }
        return ret;
    }
};
Solution.moveZeros_03 = {
    d: `filter`,
    f: function (arr) {
        return arr.filter(x => x !== 0).concat(arr.filter(x => x === 0));
    }
};
Solution.moveZeros_04 = {
    d: `reduce`,
    f: function (arr) {
        return Array.from(arr).reverse().reduce(
            (ret, v) => (v === 0 ? ret.push(v) : ret.unshift(v), ret), []
        );
    }
};
Solution.moveZeros_05 = {
    d: `filter`,
    f: function (arr) {
        let zeros = [];
        return arr.filter(x => x !== 0 ? true : !zeros.push(0)).concat(zeros);
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

function genSets(moveZeros) {
    var testSets = [];
    for (let i = 0; i < 100; i++) {
        let arr = [];
        for (let j = 0; j < i; j++) {
            arr.push(randNumber(0, 3));
        }
        let match = moveZeros.f(arr);
        testSets.push([
            [arr, ],
            match
        ]);
        // console.log(arr);
        // console.log(match);
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