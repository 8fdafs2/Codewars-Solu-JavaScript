'use strict';

function g(defaultArguments) {
    let ret = [];

    //
    function add(a, b) {
        return a + b;
    }
    ret.push(add(10, 11));
    let add_ = defaultArguments(add, {
        b: 9
    });
    ret.push(add_(10));
    ret.push(add_(10, 5));
    ret.push(defaultArguments(add_, {
        b: 3,
        a: 2
    })(10));
    ret.push(defaultArguments(add_, {
        b: 3,
        a: 2
    })());
    ret.push(defaultArguments(add_, {
        b: 3,
        a: 2
    })(9, 9));
    ret.push(add(5, 2));
    ret.push(isNaN(defaultArguments(add_, {})()));

    //
    function add2(x, y) {
        return x + y;
    }
    ret.push(add2(10, 11));
    let add2_ = defaultArguments(add2, {
        y: 9
    });
    ret.push(add2_(10));
    ret.push(add2_(10, 5));
    ret.push(defaultArguments(add2_, {
        y: 3,
        x: 2
    })(10));
    ret.push(defaultArguments(add2_, {
        y: 3,
        x: 2
    })());
    ret.push(defaultArguments(add2_, {
        y: 3,
        x: 2
    })(9, 9));
    ret.push(add2(5, 2));
    ret.push(isNaN(defaultArguments(add2_, {})()));

    //
    function addMore(a, b, c, d, e) {
        return a + b + c + d + e;
    }
    ret.push(defaultArguments(addMore, {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
        e: 5
    })(10));
    ret.push(defaultArguments(addMore, {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
        e: 5
    })(10, 10, 10));
    ret.push(isNaN(defaultArguments(addMore, {
        e: 4,
        d: 5
    })(10, 10)));

    //
    function f1(a, b, c) {
        return a - b * c;
    }
    ret.push(defaultArguments(f1, {
        a: 1,
        b: 2,
        c: 3
    })(10));

    //
    function f2(b, a, c) {
        return a - b * c;
    }
    ret.push(defaultArguments(f2, {
        a: 1,
        b: 2,
        c: 3
    })(10));
    ret.push(defaultArguments(f2, {
        b: 2,
        a: 10,
        c: 3
    })());

    //
    let timesFive = function () {
        let five = 5;
        return function (n) {
            return five * n;
        };
    }();
    ret.push(defaultArguments(timesFive, {
        n: 5
    })());
    ret.push(defaultArguments(timesFive, {
        n: 6
    })(5));

    //
    let closure_counter = (function accumulator() {
        let counter = 0;
        return function (x) {
            return counter += x;
        };
    })();
    ret.push(defaultArguments(closure_counter, {
        x: 5
    })());
    ret.push(defaultArguments(closure_counter, {
        x: 6
    })());
    ret.push(defaultArguments(closure_counter, {
        x: 6
    })(5));

    //
    let id = function (_id) {
        return _id;
    };
    ret.push(defaultArguments(id, {
        _id: "test"
    })());
    ret.push(defaultArguments(id, {
        _id: "test"
    })(undefined));
    ret.push(defaultArguments(id, {
        a: 1234
    })("test"));

    //
    let five = function () {
        return 5;
    };
    ret.push(defaultArguments(five, {
        id: "test"
    })(7));

    //
    function addComments(a, // comments 
        b /* more comments */ ) {
        return a + b;
    }
    let addComments_ = defaultArguments(addComments, {
        b: 9
    });
    ret.push(addComments_(10));

    return ret;
}

let Solution = {
    d: `
    Write a function defaultArguments. 
    It takes a function as an argument, 
    along with an object containing default values for 
    that function's arguments, 
    and returns another function which defaults to the right values.

    You cannot assume that the function's arguments have any particular names.

    You should be able to call defaultArguments repeatedly to change the defaults.

    function add(a,b) { return a+b;};

    var add_ = defaultArguments(add,{b:9});
    add_(10); // returns 19
    add_(10,7); // returns 17
    add_(); // returns NaN

    add_ = defaultArguments(add_,{b:3, a:2});
    add_(10); // returns 13 now
    add_(); // returns 5

    add_ = defaultArguments(add_,{c:3}); 
    // doesn't do anything, since c isn't an argument
    add_(10); // returns NaN
    add_(10,10); // returns 20
    HINT: This problem requires using Fuction.prototype.toString() 
    in order to extract a function's argument list
    `
};

Solution.defaultArguments_01 = {
    d: `Function.prototype.getParamNames`,
    f: function () {
        return g(this.f$);
    },
    f$: function (func, params) {
        Function.prototype.getParamNames = function () {
            let fnStr = this.toString().replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg, '');
            return fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(/([^\s,]+)/g) || [];
        };
        if (!params)
            return func;
        let paramNames = func.getParamNames();
        let f = function (...args) {
            return func.apply(null, args.concat(paramNames.map((p) => params[p]).slice(args.length)));
        };
        f.getParamNames = function () {
            return paramNames;
        };
        return f;
    }
};
Solution.defaultArguments_02 = {
    d: `Function.names`,
    f: function () {
        return g(this.f$);
    },
    f$: function (func, params) {
        let names = func.names || func.toString()
            .replace(/\/\/.*$|\/\*.*?\*\/|\s/gm, '')
            .match(/(?:[\w]+(?:,[\w]+)*)?(?=\))/m)[0].split(',');

        var detour = function (...args) {
            return func.apply(null, names.map((val, i) => i < args.length ? args[i] : params[names[i]]));
        };
        detour.names = names;
        return detour;
    }
};
Solution.defaultArguments_03 = {
    d: `Function.toString`,
    f: function () {
        return g(this.f$);
    },
    f$: function (func, params) {
        let varNames = func.toString()
            .match(/[^\(]+\(([^\)]*)/)[1]
            .split(',').map((val) => val.replace(/\/\*.+?\*\/|\/\/.*[\n\r]/g, '').trim());

        let defaults = varNames.map((val, i) => params[val]);
        let func$ = function () {
            let args = [];
            for (let i = 0; i < varNames.length; i++) {
                args[i] = i < arguments.length ? arguments[i] : defaults[i];
            }
            return func.apply(null, args);
        };
        // trick to make subsequent defaultArguments possible with original names
        let funcString = func.toString();
        func$.toString = function () {
            return funcString;
        };
        return func$;
    }
};
Solution.defaultArguments_04 = {
    d: `intuitive?`,
    f: function () {
        return g(this.f$);
    },
    f$: function (func, params) {
        if (!params)
            return func;

        function funcString(func) {
            let funcString = (func + '')
                .replace(/[/][/].*$/mg, '') // strip single-line comments
                .replace(/[/][*][^/*]*[*][/]/g, ''); // strip multi-line comments
            let funcHead = funcString.substring(0, funcString.indexOf('{')).trim();
            let funcArgs = funcHead
                .replace(/\s+/g, '')
                .replace(/^[^(]*[(]/, '') // extract the parameters  
                .replace(/[)][^)]*$/, '') // extract the parameters  
                .replace(/=[^,]+/g, '') // strip any ES6 defaults  
                .split(',').filter(Boolean);
            let funcBody = funcString.substring(funcString.indexOf('{') + 1, funcString.length - 1).trim();
            return [funcHead, funcArgs, funcBody];
        }

        let [head, args, body] = funcString(func);
        if (args.length === 0)
            return func;

        let argsName = args.map((arg) => arg.split('=')[0]);
        let argsVal = args.map((arg) => arg.split('=')[0] in params ? JSON.stringify(params[arg.split('=')[0]]) : undefined);
        argsName = argsName.length == 1 ? argsName[0] : argsName.join(',');
        argsVal = argsVal.length == 1 ? argsVal[0] : argsVal.join(',');

        global.parseArgs = function (argsPassed, argsDefault) {
            let l = argsPassed.length;
            let args = [];
            for (let i = 0; i < argsDefault.length; i++) {
                args.push(l < (i + 1) ? argsDefault[i] : argsPassed[i]);
            }
            return args;
        };

        // closure patch <- really ugly
        if (!global.five)
            global.five = 5;
        if (!global.counter)
            global.counter = 0;

        let patch = '[' + argsName + '] = parseArgs(arguments, [' + argsVal + ']);';
        body = body.replace(/.* \= parseArgs\(arguments, \[.*\]\);/, '');
        let eval$ = eval;
        return eval$('(' + head + ' {' + patch + ' ' + body + '})');
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
    for (let i = 0; i < 1; i++) {
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