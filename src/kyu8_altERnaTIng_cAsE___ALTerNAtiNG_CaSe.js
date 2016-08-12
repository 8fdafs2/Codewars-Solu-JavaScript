'use strict';

var g = function (str) {
    return str.toAlternatingCase();
};

var Solution = {
    d: `
    altERnaTIng cAsE <=> ALTerNAtiNG CaSe

    Define String.prototype.toAlternatingCase (StringUtils.toAlternatingCase(String) in Java) such that 
    each lowercase letter becomes uppercase and each uppercase letter becomes lowercase. For example:

    Note to no Java langs

    You must NOT alter the original string.
    `
};
Solution.toAlternatingCase_01 = {
    d: `intuitive`,
    f: function (str) {
        String.prototype.toAlternatingCase = function () {
            var newString = '';
            var i = 0;
            while (i < this.length) {
                var char = this.charAt(i);
                if (char == char.toUpperCase()) {
                    newString += char.toLowerCase();
                } else if (char == char.toLowerCase()) {
                    newString += char.toUpperCase();
                } else {
                    newString += char;
                }
                i++;
            }
            return newString;
        };
        this.f = g;
        return this.f(str);
    },
};
Solution.toAlternatingCase_02 = {
    d: `[...this].map`,
    f: function (str) {
        const isLowerCase = (char) => char.toLowerCase() === char;
        const swapCase = (char) => isLowerCase(char) ? char.toUpperCase() :
            char.toLowerCase();
        String.prototype.toAlternatingCase = function () {
            return [...this].map(swapCase)
                .join('');
        };
        this.f = g;
        return this.f(str);
    },
};
Solution.toAlternatingCase_03 = {
    d: `split('').map.join('')`,
    f: function (str) {
        String.prototype.toAlternatingCase = function () {
            return this.split('')
                .map(letter => {
                    var newLetter = letter.toUpperCase();
                    return letter == newLetter ? letter.toLowerCase() :
                        newLetter;
                })
                .join('');
        };
        this.f = g;
        return this.f(str);
    },
};
Solution.toAlternatingCase_04 = {
    d: `regex`,
    f: function (str) {
        String.prototype.toAlternatingCase = function () {
            var newString = "";
            for (var i = 0; i < this.length; i++) {
                var c = this.charAt(i);
                if (c.match(/[A-Z]/)) {
                    newString += c.toLowerCase();
                } else if (c.match(/[a-z]/)) {
                    newString += c.toUpperCase();
                } else {
                    newString += c;
                }
            }
            return newString;
        };
        this.f = g;
        return this.f(str);
    },
};

// --------------------------------------------------------------
import {
    randString
}
from './common';

function genSets(toAlternatingCase) {
    var testSets = [];
    for (var i = 10; i <= 1000; i++) {
        var str = randString(i);
        var match = toAlternatingCase.f(str);
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
testFixture.testSpd(10);