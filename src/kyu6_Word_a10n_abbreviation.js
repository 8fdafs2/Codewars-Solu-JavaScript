'use strict';
var Solution = {
    d: `
    https://www.codewars.com/kata/word-a10n-abbreviation

    The word i18n is a common abbreviation of 
    internationalization the developer community use instead of 
    typing the whole word and trying to spell it correctly. 
    Similarly, a11y is an abbreviation of accessibility.

    Write a function that takes a string and turns any and 
    all words within that string of length 4 or greater into 
    an abbreviation following the same rules.

    Notes:

    A "word" is a sequence of alphabetical characters. 
    By this definition, any other character like a space or hyphen 
    (eg. "elephant-ride") will split up a series of letters into 
    two words (eg. "elephant" and "ride").
    The abbreviated version of the word should have 
    the first letter, then the number of removed characters, 
    then the last letter (eg. "e6t-r2e").
    `
};
Solution.abbreviate_01 = {
    d: ``,
    f: function (string) {
        var isLetter = function (c) {
            return c.toLowerCase() != c.toUpperCase();
        };
        var transWord = function (word) {
            let len;
            if (word.indexOf('-') !== -1) {
                let retSub = [];
                let wordsSub = word.split('-');
                for (let j = 0; j < wordsSub.length; j++) {
                    word = wordsSub[j];
                    len = word.length;
                    if (len > 3 && isLetter(word[len - 1]))
                        word = word[0] + (len - 2) + word[len - 1];
                    else if (len > 4)
                        word = word[0] + (len - 3) + word[len - 2] + word[len - 1];
                    retSub.push(word);
                }
                word = retSub.join('-');
            } else {
                len = word.length;
                if (len > 3 && isLetter(word[len - 1]))
                    word = word[0] + (len - 2) + word[len - 1];
                else if (len > 4)
                    word = word[0] + (len - 3) + word[len - 2] + word[len - 1];
            }
            return word;
        };
        return string.split(' ').map(word => transWord(word)).join(' ');
    }
};
Solution.abbreviate_02 = {
    d: ``,
    f: function (string) {
        var transWord = function (word) {
            let len = word.length;
            if (len > 3)
                word = word[0] + (len - 2) + word[len - 1];
            return word;
        };
        return string.replace(/(\w+)/g, x => transWord(x));
    }
};
Solution.abbreviate_03 = {
    d: ``,
    f: function (string) {
        var transWord = function (word) {
            return word[0] + (word.length - 2) + word[word.length - 1];
        };
        return string.replace(/(\w{4,})/g, x => transWord(x));
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

function genSets(abbreviate) {
    var testSets = [];
    for (let i = 10; i <= 200; i++) {
        var string = '';
        for (let j = 0; j < i; j++) {
            string += ' ' + randString(randNumber(3, 8), true, true, false);
            if (randBoolean())
                string += ' ' + randString(randNumber(3, 8), true, true, false) + '-' + randString(randNumber(3, 8), true, true, false);
            if (randBoolean())
                string += randChoice('.,?!');
        }
        var match = abbreviate.f(string);
        testSets.push([
            [string, ],
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