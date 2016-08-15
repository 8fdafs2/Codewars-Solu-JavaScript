'use strict';
let Solution = {
    d: `
    https://www.codewars.com/kata/558878ab7591c911a4000007
    
    Pig Latin is an English language game where the goal is to hide 
    the meaning of a word from people not aware of the rules.

    The rules themselves are rather easy:

    1) The word starts with a vowel(a, e, i, o, u) - >
    return the original string plus "way".

    2) The word starts with a consonant - > move consonants from 
    the beginning of the word to the end of the word until the first vowel, then
    return it plus "ay".

    3) The result must be lowercase, regardless of the
    case of the input.If the input string has any non - alpha characters, the
    function must
    return None, null, Nothing(depending on the language).

    4) The function must also handle simple random strings and not just English words.

    5) The input string has no vowels - >
    return the original string plus "ay".

    For example, the word "spaghetti" becomes "aghettispay" because 
    the first two letters ("sp") are consonants, 
    so they are moved to the end of the string and "ay" is appended.
    `
};
Solution.pigLatin_01 = {
    d: `intuitive`,
    f: function(str) {
        if (str.split('').some(c => '0' <= c && c <= '9'))
            return null;
        str = str.toLowerCase();
        let vowels = 'aeiou';
        if (vowels.indexOf(str[0]) > -1)
            return str + 'way';
        for (let i = 1; i < str.length; i++)
            if (vowels.indexOf(str[i]) > -1)
                return str.substr(i) + str.substring(0, i) + 'ay';
        return str + 'ay';
    }
};
Solution.pigLatin_02 = {
    d: ``,
    f: function(str) {
        if (str.search(/[0-9]/) != -1) return null;
        str = str.toLowerCase();
        let pos = str.search(/[aeiou]/);
        if (pos == -1) return str + "ay";
        if (pos === 0) return str + "way";
        return str.slice(pos) + str.slice(0, pos) + "ay";
    }
};
Solution.pigLatin_03 = {
    d: `one-liner`,
    f: function(str) {
        str = str.toLowerCase();
        return /[^a-z]/.test(str) ? null : /^[aeiou]/.test(str) ? str + "way" : str.replace(/^[^aeiou]+/, "") + str.match(/^[^aeiou]+/) + "ay";
    }
};
Solution.pigLatin_04 = {
    d: ``,
    f: function(str) {
        str = str.toLowerCase();
        if (/\d/.test(str)) return null;
        if (/^[aeiou]{1}/.test(str)) return str + 'way';
        return str.replace(/^([^aeiou]*)(\w*)/, '$2$1ay');
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

function genSets(pigLatin) {
    let testSets = [];
    for (let i = 1; i < 100; i++) {
        let str = randString(i);
        let match = pigLatin.f(str);
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
let testFixture = TestFixture(Solution, genSets);
testFixture.prep();
testFixture.test(false);
testFixture.testSpd(100);
