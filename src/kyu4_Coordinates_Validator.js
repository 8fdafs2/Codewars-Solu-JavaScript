'use strict';
let Solution = {
    d: `
    You need to create a function that will validate
    if given parameters are valid geographical coordinates.

    Valid coordinates look like the following: 
    "23.32353342, -32.543534534".The
    return value should be either true or false.

    Latitude(which is first float) can be between 0 and 90, 
    positive or negative.
    Longitude(which is second float) can be between 0 and 180, 
    positive or negative.

    Coordinates can only contain digits, 
    or one of the following symbols(including space after comma) - , .

    There should be no space between the minus "-"
    sign and the digit after it.

    Here are some valid coordinates:

        -23, 25
        24.53525235, 23.45235
        04, -23.234235
        43.91343345, 143
        4, -3

    And some invalid ones:

        23.234, -23.4234
        2342.43536, 34.324236
        N23 .43345, E32 .6457
        99.234, 12.324
        6.325624, 43.34345 .345
        0, 1, 2
        0.342 q0832, 1.2324
    `
};
Solution.isValidCoordinates_01 = {
    d: ``,
    f: function (coordinates) {
        let m = coordinates.match(/^\-?(\d+(\.\d+)?), *\-?(\d+(\.\d+)?)$/);
        return !!m && m[1] <= 90 && m[3] <= 180;
    }
};
Solution.isValidCoordinates_02 = {
    d: ``,
    f: function (coordinates) {
        return /^-?((\d|[0-8]\d)(\.\d+)?|90),\s?-?((\d\d?|[01][0-7]\d)(\.\d+)?|180)$/.test(coordinates);
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

function genSets(isValidCoordinates) {
    let testSets = [];
    for (let i = 0; i < 100; i++) {
        let coordinates = [
            Math.random() * randChoice(-100, 100),
            Math.random() * randChoice(-200, 200),
        ];
        if (randBoolean()) {
            coordinates[randNumber(0, 1)] = ~~coordinates[0];
        }
        coordinates = coordinates.map(String);
        if (randBoolean()) { // invalid coordinates
            let op = randChoice(0, 1, 2, 3);
            let i, n, c;
            switch (op) {
            case 0:
                coordinates[randNumber(0, 1)] = coordinates[randNumber(0, 1)].replace('.', ',');
                break;
            case 1:
                coordinates[randNumber(0, 1)] = randString(randNumber(1, 19));
                break;
            case 2:
                i = randNumber(0, 1);
                coordinates[i] = i === 0 ? 'N' + coordinates[i] : 'E' + coordinates[i];
                break;
            case 3:
                i = randNumber(0, 1);
                n = coordinates[i].length;
                c = coordinates[i].split('');
                c[randNumber(0, n - 1)] = randChoice('$!#@asdf');
                coordinates[i] = c.join('');
            }
        }
        coordinates = coordinates.join(randChoice(', ', ','));
        let match = isValidCoordinates.f(coordinates);
        testSets.push([
            [coordinates, ],
            match
        ]);
        console.log(coordinates, match);
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