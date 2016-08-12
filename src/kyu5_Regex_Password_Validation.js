'use strict';
let Solution = {
    d: `
    https://www.codewars.com/kata/regex-password-validation

    You need to write regex that will validate 
    a password to make sure it meets the follwing criteria:

    At least six characters long
    contains a lowercase letter
    contains an uppercase letter
    contains a number
    Valid passwords will only be alphanumeric characters.
    `
};
Solution.validate_01 = {
    d: ``,
    f: function (password) {
        return password.length > 5 &&
            /[a-z]/.test(password) &&
            /[A-Z]/.test(password) &&
            /\d/.test(password) &&
            !/[^a-zA-Z0-9]/.test(password);
    }
};
Solution.validate_02 = {
    d: ``,
    f: function (password) {
        return /[a-z]/.test(password) &&
            /[A-Z]/.test(password) &&
            /\d/.test(password) &&
            /^[a-zA-Z0-9]{6,}$/.test(password);
    }
};
Solution.validate_03 = {
    d: `positive lookahead`,
    f: function (password) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,}$/.test(password);
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

function genSets(subSol) {
    let testSets = [];
    for (let i = 0; i < 1000; i++) {
        let password = randStringBy(randNumber(5, 9), 'abcdABCD01234_');
        let match = subSol.f(password);
        testSets.push([
            [password, ],
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