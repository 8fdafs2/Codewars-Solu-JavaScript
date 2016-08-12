'use strict';

let g = function (namespace) {
    let ret = [];
    let stuff = {};
    ret.push(namespace(stuff, 'items.things'));
    namespace(stuff, 'items.things', {
        name: 'the thing'
    });
    ret.push(JSON.parse(JSON.stringify(stuff)));
    namespace(stuff, 'moreStuff.evenMoreStuff.id', 1);
    ret.push(JSON.parse(JSON.stringify(stuff)));
    return ret;
};

let Solution = {
    d: `
    https://www.codewars.com/kata/name-your-space

    Finish the namespace function so that it sets or gets 
    the value at the path specified.
    The first argument should be the root object that 
    the path belongs to.
    The 2nd argument is the path itself and 
    the 3rd optional argument is the value to set at the path.

    If a value is provided then the path will be set to that value.
    Any objects not present within the path will be created automatically in order
    for the path to be successfully set.

    stuff = {}
    namespace(stuff, 'moreStuff.name', 'the stuff')
    # results in {
        moreStuff: {
            name: 'the stuff'
        }
    }
    If no value is provided the the
    function will
    return the value at the path given.
    If the path is not valid / present then undefined will be returned.

    namespace(stuff, 'moreStuff.name') # returns 'the stuff'
    namesace(stuff, 'otherStuff.id') # returns undefined
    `
};
Solution.namespace_01 = {
    d: `intuitive`,
    f: function () {
        return g(this.f$);
    },
    f$: function (root, path, value) {
        path = path.split('.');
        let node = root;
        if (value) {
            for (let i = 0; i < path.length; i++) {
                if (i == path.length - 1) {
                    return node[path[i]] = value;
                } else {
                    node = node[path[i]] ? node[path[i]] : (node[path[i]] = {});
                }
            }
        } else {
            for (let i = 0; i < path.length; i++) {
                if ((node = node[path[i]]) === undefined)
                    return;
            }
        }
        return node;
    }
};
Solution.namespace_02 = {
    d: `compact, but cannot set two values on the same path`,
    f: function () {
        return g(this.f$);
    },
    f$: function (root, path, value) {
        return path.split('.').reduce(function (prev, key, i, arr) {
            if (i == arr.length - 1)
                return value ? (prev[key] = value) : prev[key];
            return (prev[key] = {});
        }, root);
    }
};
Solution.namespace_03 = {
    d: `compact, but cannot set two values on the same path`,
    f: function () {
        return g(this.f$);
    },
    f$: function (root, path, value) {
        let node = root;
        path.split('.').forEach(
            (key, i, arr) => node = node[key] = (i === arr.length - 1) ? value : {}
        );
        return node;
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

function genSets(namespace) {
    let testSets = [];
    for (let i = 0; i < 100; i++) {
        let match = namespace.f();
        testSets.push([
            [],
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