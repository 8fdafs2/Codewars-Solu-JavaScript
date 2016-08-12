'use strict';
let Solution = {
    d: `
    https://www.codewars.com/kata/remove-zeros

    Write a function that takes an array of values and 
    moves all elements that are zero to the end of the array, 
    otherwise preserving the order of the array. 
    The zero elements must also maintain the order in which they occurred.

    For example, the following array

    [7, 2, 3, 0, 4, 6, 0, 0, 13, 0, 78, 0, 0, 19, 14]

    is transformed into

    [7, 2, 3, 4, 6, 13, 78, 19, 14, 0, 0, 0, 0, 0, 0]

    Zero elements are defined by either 0 or "0". 
    Some tests may include elements that are not number literals.

    You are NOT allowed to use any temporary arrays or objects. 
    You are also not allowed to use any Array.prototype or Object.prototype methods.
    `
};
Solution.removeZeros_01 = {
    d: `recursion string`,
    f: function (array) {
        let nonZeros = '';
        let zeros = '';

        function toStr(a) {
            switch (typeof a) {
            case 'number':
                return a;
            case 'string':
                return '\"' + a + '\"';
            case 'object':
                if (Array.isArray(a)) {
                    let ret = '[';
                    for (let i in a) {
                        ret += toStr(a[i]) + ',';
                    }
                    return ret + ']';
                } else if (a !== null) {
                    let ret = '{';
                    for (let i in a) {
                        ret += toStr(i) + ':' + toStr(a[i]) + ',';
                    }
                    return ret + '}';
                }
                // fall through deliberately: null
            default:
                return a;
            }
        }
        for (let i in array) {
            let a = array[i];
            if (a === 0 || a === '0')
                zeros += toStr(a) + ',';
            else
                nonZeros += toStr(a) + ',';
        }
        return eval('[' + nonZeros + zeros + ']');
    }
};
Solution.removeZeros_02 = {
    d: `bubble sort`,
    f: function (array) {
        function recur(array) {
            let s = false;
            for (let i = 0, c = 0; i < array.length - 1; i++) {
                ('' + array[i] == '0' && '' + array[i + 1] != '0') &&
                (c = array[i], array[i] = array[i + 1], array[i + 1] = c, i = 0, s = true);
            }
            return !s ? array : recur(array);
        }
        return recur(array);
    }
};
Solution.removeZeros_03 = {
    d: `bubble sort: front to back`,
    f: function (array) {
        function recur(array, i, iMax) {
            //console.log(i);
            let swaped = false;
            let i$;
            for (; i < iMax; i++) {
                if ('' + array[i] == '0') {
                    if (i$ === undefined) i$ = i;
                    if ('' + array[i + 1] != '0') {
                        [array[i], array[i + 1]] = [array[i + 1], array[i]];
                        if (!swaped) swaped = true;
                    }
                }
            }
            return swaped ? recur(array, i$, iMax--) : array;
        }
        return recur(array, 0, array.length - 1);
    }
};
Solution.removeZeros_04 = {
    d: `bubble sort: back to front`,
    f: function (array) {
        let i = array.length - 1;
        let pivot = i;
        for (; i >= 0; i--) {
            if (array[i] === 0 || array[i] === "0") {
                for (let j = i; j < pivot; j++) {
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                }
                pivot--;
            }
        }
        return array;
    }
};
Solution.removeZeros_05 = {
    d: `insertion sort`,
    f: function (array) {
        function arrayShiftToEnd(array, i) {
            let end = array[i];
            for (; i < array.length; i++) {
                array[i] = array[i + 1];
            }
            array[array.length - 1] = end;
        }
        for (let i = 0, iMax = array.length; i < iMax; i++) {
            if (array[i] === 0 || array[i] === "0") {
                arrayShiftToEnd(array, i);
                i--;
                iMax--;
            }
        }
        return array;
    }
};
Solution.removeZeros_06 = {
    d: `merge sort`,
    f: function (array) {
        function removeZerosMergeSort(start, end) {
            // Base cases of length 1 and 2
            if (start >= end) return;
            if (start + 1 == end) {
                if (isZero(start) && !isZero(end))
                    swap(start, end);
                return;
            }
            // Recursive case
            let middle = Math.floor((start + end) / 2);
            removeZerosMergeSort(start, middle - 1);
            removeZerosMergeSort(middle, end);
            // Merge in place by overwriting the left side of the merge
            // The overwritten items are safely stowed behind the right side until needed
            let target = start,
                left = start,
                right = middle;
            while (target < end && left < right) {
                if (isZero(left) && !isZero(right))
                    swap(right++, target++);
                else swap(left++, target++);
                // Check if the left items have been stowed behind the right items
                if (left == target - 1) left = right - 1;
                // Check when stowed items have been used up, return to the left
                if (left == right) left = target;
            }
        }

        function swap(i, j) {
            [array[i], array[j]] = [array[j], array[i]];
        }

        function isZero(i) {
            return array[i] === 0 || array[i] === '0';
        }
        removeZerosMergeSort(0, array.length - 1);
        return array;
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

function randElement() {
    let ret;
    let i = randNumber(0, 5);
    switch (randNumber(0, 4)) {
    case 0: // number
        return i;
    case 1: // String(number)
        return String(i);
    case 2: // string
        return randString(i);
    case 3:
        ret = [];
        for (let j = 0; j < i; j++) {
            ret.push(i);
        }
        return ret;
    case 4:
        ret = {};
        for (let j = 0; j < i; j++) {
            ret[randString(i)] = i;
        }
        return ret;
    default:
        return null;
    }
}

function genSets(removeZeros) {
    let testSets = [];
    for (let i = 10; i < 201; i++) {
        let array = [];
        for (let j = 0; j < i; j++) {
            array.push(randElement());
        }
        let match = removeZeros.f(array);
        testSets.push([
            [array, ],
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
testFixture.testSpd(10);