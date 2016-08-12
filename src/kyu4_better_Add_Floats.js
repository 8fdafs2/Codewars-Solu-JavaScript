'use strict';
let Solution = {
    d: `
    https://www.codewars.com/kata/better-add-floats

    Write a function that returns the sum of the passed arguments. 
    The input arguments may be Numbers and/or 
    String representations of numbers. 
    The function must return a String.

    Example

    add(123, "321") === "444";
    add("1234567890.0987654321", "8765432109.9012345678") === "9999999999.9999999999";
    add("1.2.3", 1.23); === NaN;
    add(0.1, 0.0001) === "0.1001";
    Notes

    The input numbers may be very very big and/or very very small. 
    Addition must be exact - no floating point errors. 
    The numbers are all positive and base 10. 
    Some arguments may not be numbers. 
    In these cases, return NaN. 
    Remove trailing zeros and decimal point if possible.
    `
};
Solution.add_01 = {
    d: `pure string addition`,
    f: function (...args) {

        let regNum = /^\d*\.?\d*$/;

        args = Array.from(args);

        for (let i = 0, x; i < args.length; i++) {
            x = args[i];
            if (typeof x == 'number' && !isNaN(x))
                args[i] = x.toString();
            else if (!regNum.test(x))
                return NaN;
        }

        function addTwoFloats(a, b) {

            a = a.replace(/^0+/, '').replace(/\.0+$/, '.');
            b = b.replace(/^0+/, '').replace(/\.0+$/, '.');

            let aDecimalDigits;
            let a$ = a.split('.');
            if (a$[1] === undefined) {
                aDecimalDigits = 0;
            } else {
                aDecimalDigits = a$[1].length;
                a = a.replace('.', '');
            }

            let bDecimalDigits;
            let b$ = b.split('.');
            if (b$[1] === undefined) {
                bDecimalDigits = 0;
            } else {
                bDecimalDigits = b$[1].length;
                b = b.replace('.', '');
            }

            let mDecimalDigits = Math.max(aDecimalDigits, bDecimalDigits);

            if (aDecimalDigits < mDecimalDigits)
                a += '0'.repeat(mDecimalDigits - aDecimalDigits);
            else if (bDecimalDigits < mDecimalDigits)
                b += '0'.repeat(mDecimalDigits - bDecimalDigits);

            let ret = '';
            let carry = 0;
            a = a.split('');
            b = b.split('');
            while (a.length || b.length || carry) {
                carry += ~~a.pop() + ~~b.pop();
                ret = carry % 10 + ret;
                carry = carry > 9;
            }

            ret = ret.substring(0, ret.length - mDecimalDigits) + '.' + ret.substring(ret.length - mDecimalDigits);
            return ret.replace(/^0+/, '').replace(/0+$/, '').replace(/\.$/, '').replace(/^\./, '0.');
        }

        return args.reduce((sum, x) => addTwoFloats(sum, x));
    }
};
Solution.add_02 = {
    d: `numeric *1000/1000`,
    f: function () {
        return (
            Array.prototype.slice.call(arguments, 0).map(Number).reduce(
                (sum, x) => sum + x * 1000, 0) / 1000
        ).toString();
    }
};
Solution.add_03 = {
    d: `numeric, toFixed`,
    f: function () {
        let ret = 0;
        let longest = 0;
        for (let i = 0, x, x$; i < arguments.length; i++) {
            x = arguments[i];
            if (isNaN(x)) {
                return NaN;
            }

            x$ = x.toString().split('.');
            if (x$.length == 2 && x$[1].length > longest) {
                longest = x$[1].length;
            }

            ret += parseFloat(x);
        }

        if (longest) {
            ret = ret.toFixed(longest).toString();
            /* Remove extra 0 at the end */
            while (ret.charAt(ret.length - 1) === 0) {
                ret = ret.substring(0, ret.length - 1);
            }
            return ret;
        }

        return ret.toString();
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

function genSets(add) {
    let testSets = [];
    for (let i = 2; i < 10; i++) {
        let args = [];
        for (let j = 0, x; j < i; j++) {
            x = randStringBy(randNumber(0, 8), '0123456789') +
                '.' +
                randStringBy(randNumber(0, 3), '0123456789');
            if (randBoolean) {
                x = Number(x);
            }
            args.push(x);
        }
        let match = add.f(...args);
        testSets.push([
            args,
            match
        ]);
        console.log(args, match);
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