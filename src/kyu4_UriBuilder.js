'use strict';

let g = function (UriBuilder) {
    let ret = [];
    // no-params-url as inital input
    let builder = new UriBuilder('http://www.codewars.com');
    ret.push(builder.params);
    ret.push(builder.build());
    // common case
    builder = new UriBuilder('http://www.codewars.com?page=1&language=javascript');
    ret.push(builder.params);
    ret.push(builder.build());
    // new builder instance to demonstrate pre-existing params.
    builder = new UriBuilder('http://www.codewars.com?page=1');
    builder.params.page = 2;
    ret.push(builder.params);
    ret.push(builder.build());
    delete builder.params.page;
    ret.push(builder.params);
    ret.push(builder.build());

    return ret;
};

let Solution = {
    d: `
    https://www.codewars.com/kata/uribuilder
    
    Create a basic UriBuilder object that will be used specifically to 
    build query params on an existing URI. 
    It should support a params property and a build method. 
    It will handle the URL having pre-existing params that 
    need to be managed. 
    The URL must be properly encoded (i.e. "a b" should be encoded as "a%20b")

    Examples of how the builder will be used:

        var builder = new UriBuilder('http://www.codewars.com')
        builder.params.page = 1
        builder.params.language = 'javascript'

        // new builder instance to demonstrate pre-existing params.
        builder = new UriBuilder('http://www.codewars.com?page=1')

        builder.params.page = 2
        // should return 'http://www.codewars.com?page=2'
        builder.build()

        // if you delete params then they will disappear from the url string
        delete builder.params.page

        // should return 'http://www.codewars.com'
        builder.build()

    Note: For extra style points you can have your solution handle 
    array values as query parameters, 
    however there are no tests that explicitly test for them.
    `
};
Solution.UriBuilder_01 = {
    d: `intuitive`,
    f: function () {
        return g(this.f$);
    },
    f$: function (url) {
        url = url.split('?');
        this.host = url[0];
        this.params = {};
        if (url[1]) {
            let params = url[1].split('&');
            for (let i = 0; i < params.length; i++) {
                let [pName, pValue] = params[i].split('=');
                this.params[decodeURIComponent(pName)] = decodeURIComponent(pValue);
            }
        }

        this.build = function () {
            let params = [];
            for (let pName in this.params) {
                params.push(encodeURIComponent(pName) + '=' + encodeURIComponent(this.params[pName]));
            }
            if (params.length > 0)
                return this.host + '?' + params.join('&');
            return this.host;
        };
    }
};
Solution.UriBuilder_02 = {
    d: `compact`,
    f: function () {
        return g(this.f$);
    },
    f$: function (url) {
        let [host, params] = url.split('?');
        this.params = !params ? {} : params.split('&').map(
            (pNameValue) => pNameValue.split('=').map(decodeURIComponent)
        ).reduce(
            (ret, [pName, pValue]) => (ret[pName] = pValue, ret), {}
        );

        this.build = function (s) {
            return (s = Object.keys(this.params).map(
                (pName) => encodeURIComponent(pName) + '=' + encodeURIComponent(this.params[pName])
            ).join('&')) ? host + '?' + s : host;
        };
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
    for (let i = 0; i < 100; i++) {
        let match = subSol.f();
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